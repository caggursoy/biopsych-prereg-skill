(function (root, factory) {
  var api = factory();
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  root.PreregThrottle = api;
})(typeof window !== "undefined" ? window : globalThis, function () {
  "use strict";

  var LIMITS = {
    requestsPerMinute: { capacity: 25, windowMs: 60000 },
    tokensPerMinute: { capacity: 7000, windowMs: 60000 },
    requestsPerDay: { capacity: 900, windowMs: 86400000 },
    tokensPerDay: { capacity: 180000, windowMs: 86400000 },
    maxTokensPerRequest: 6500,
    maxRetries: 3
  };

  function utcDay(now) {
    return new Date(now).toISOString().slice(0, 10);
  }

  function estimateTokens(text) {
    if (!text) return 0;
    return Math.ceil(String(text).length / 3.6) + 8;
  }

  function Bucket(capacity, windowMs, tokens, last) {
    this.capacity = capacity;
    this.ratePerMs = capacity / windowMs;
    this.tokens = tokens == null ? capacity : tokens;
    this.last = last == null ? 0 : last;
  }

  Bucket.prototype.refill = function (now) {
    if (this.last === 0) {
      this.last = now;
      return;
    }
    var elapsed = Math.max(0, now - this.last);
    if (elapsed > 0) {
      this.tokens = Math.min(this.capacity, this.tokens + elapsed * this.ratePerMs);
      this.last = now;
    }
  };

  Bucket.prototype.waitFor = function (need, now) {
    this.refill(now);
    if (this.tokens >= need) return 0;
    if (need > this.capacity) return Infinity;
    return Math.ceil((need - this.tokens) / this.ratePerMs);
  };

  Bucket.prototype.take = function (need, now) {
    this.refill(now);
    this.tokens = Math.max(0, this.tokens - need);
  };

  function createLimiter(options) {
    options = options || {};
    var now = options.now || function () { return Date.now(); };
    var sleep = options.sleep || function (ms) {
      return new Promise(function (resolve) { setTimeout(resolve, ms); });
    };
    var storage = options.storage || null;
    var storageKey = options.storageKey || "prereg.throttle.v1";
    var onChange = options.onChange || function () {};

    var state = {
      rpm: new Bucket(LIMITS.requestsPerMinute.capacity, LIMITS.requestsPerMinute.windowMs),
      tpm: new Bucket(LIMITS.tokensPerMinute.capacity, LIMITS.tokensPerMinute.windowMs),
      day: utcDay(now()),
      dayRequests: 0,
      dayTokens: 0
    };

    if (storage) {
      try {
        var raw = storage.getItem(storageKey);
        if (raw) {
          var saved = JSON.parse(raw);
          if (saved && saved.day === state.day) {
            state.dayRequests = Number(saved.dayRequests) || 0;
            state.dayTokens = Number(saved.dayTokens) || 0;
          }
        }
      } catch (err) {
        /* corrupt storage is not fatal */
      }
    }

    function persist() {
      if (!storage) return;
      try {
        storage.setItem(
          storageKey,
          JSON.stringify({
            day: state.day,
            dayRequests: state.dayRequests,
            dayTokens: state.dayTokens
          })
        );
      } catch (err) {
        /* quota errors are not fatal */
      }
    }

    function rollDay() {
      var today = utcDay(now());
      if (today !== state.day) {
        state.day = today;
        state.dayRequests = 0;
        state.dayTokens = 0;
        persist();
      }
    }

    function snapshot() {
      rollDay();
      var t = now();
      state.rpm.refill(t);
      state.tpm.refill(t);
      return {
        day: state.day,
        requestsToday: state.dayRequests,
        requestsTodayLimit: LIMITS.requestsPerDay.capacity,
        tokensToday: Math.round(state.dayTokens),
        tokensTodayLimit: LIMITS.tokensPerDay.capacity,
        requestsThisMinute: Math.round(state.rpm.capacity - state.rpm.tokens),
        requestsPerMinuteLimit: LIMITS.requestsPerMinute.capacity,
        tokensThisMinute: Math.round(state.tpm.capacity - state.tpm.tokens),
        tokensPerMinuteLimit: LIMITS.tokensPerMinute.capacity
      };
    }

    function waitTime(needTokens) {
      rollDay();
      var t = now();
      if (state.dayRequests + 1 > LIMITS.requestsPerDay.capacity) return Infinity;
      if (state.dayTokens + needTokens > LIMITS.tokensPerDay.capacity) return Infinity;
      return Math.max(
        state.rpm.waitFor(1, t),
        state.tpm.waitFor(needTokens, t)
      );
    }

    function charge(needTokens) {
      rollDay();
      var t = now();
      state.rpm.take(1, t);
      state.tpm.take(needTokens, t);
      state.dayRequests += 1;
      state.dayTokens += needTokens;
      persist();
      onChange(snapshot());
    }

    function refund(needTokens) {
      state.dayRequests = Math.max(0, state.dayRequests - 1);
      state.dayTokens = Math.max(0, state.dayTokens - needTokens);
      persist();
      onChange(snapshot());
    }

    function reconcile(estimated, actual) {
      var delta = actual - estimated;
      if (delta === 0) return;
      state.dayTokens = Math.max(0, state.dayTokens + delta);
      state.tpm.tokens = Math.max(0, Math.min(state.tpm.capacity, state.tpm.tokens - delta));
      persist();
      onChange(snapshot());
    }

    function syncFromHeaders(headers) {
      if (!headers || typeof headers.get !== "function") return;
      var remainingReq = Number(headers.get("x-ratelimit-remaining-requests"));
      var remainingTok = Number(headers.get("x-ratelimit-remaining-tokens"));
      if (isFinite(remainingReq) && remainingReq >= 0) {
        state.rpm.tokens = Math.min(state.rpm.tokens, remainingReq);
      }
      if (isFinite(remainingTok) && remainingTok >= 0) {
        state.tpm.tokens = Math.min(state.tpm.tokens, remainingTok);
      }
      onChange(snapshot());
    }

    var queue = [];
    var draining = false;
    var cancelled = false;

    function drain() {
      if (draining) return;
      draining = true;

      function next() {
        if (cancelled || queue.length === 0) {
          draining = false;
          return;
        }
        var job = queue[0];
        var wait = waitTime(job.tokens);

        if (wait === Infinity) {
          queue.shift();
          job.reject(new Error("Daily Groq quota exhausted. Try again after 00:00 UTC."));
          onChange(snapshot());
          next();
          return;
        }

        if (wait > 0) {
          job.notify(wait);
          sleep(wait).then(function () {
            next();
          });
          return;
        }

        queue.shift();
        charge(job.tokens);
        Promise.resolve()
          .then(job.run)
          .then(
            function (value) {
              job.resolve(value);
              next();
            },
            function (err) {
              if (err && err.refundable) refund(job.tokens);
              job.reject(err);
              next();
            }
          );
      }

      next();
    }

    function schedule(run, tokens, notify) {
      var need = Math.min(Math.max(1, Math.ceil(tokens)), LIMITS.maxTokensPerRequest);
      return new Promise(function (resolve, reject) {
        queue.push({
          run: run,
          tokens: need,
          resolve: resolve,
          reject: reject,
          notify: notify || function () {}
        });
        onChange(snapshot());
        drain();
      });
    }

    function cancelAll(reason) {
      cancelled = true;
      var pending = queue.splice(0, queue.length);
      pending.forEach(function (job) {
        job.reject(new Error(reason || "Cancelled"));
      });
      draining = false;
      onChange(snapshot());
      return pending.length;
    }

    function resume() {
      cancelled = false;
      drain();
    }

    return {
      schedule: schedule,
      snapshot: snapshot,
      waitTime: waitTime,
      reconcile: reconcile,
      syncFromHeaders: syncFromHeaders,
      cancelAll: cancelAll,
      resume: resume,
      limits: LIMITS
    };
  }

  return {
    LIMITS: LIMITS,
    createLimiter: createLimiter,
    estimateTokens: estimateTokens,
    Bucket: Bucket,
    utcDay: utcDay
  };
});
