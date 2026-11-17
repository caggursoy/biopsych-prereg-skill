(function (root) {
  "use strict";

  var ENDPOINT = "https://api.groq.com/openai/v1/chat/completions";
  var DEFAULT_MODEL = "openai/gpt-oss-120b";
  var FALLBACK_MODEL = "openai/gpt-oss-20b";
  var MAX_TOKENS = 900;

  var SYSTEM_PROMPT = [
    "You are assisting a researcher in writing one section of a preregistration for a biopsychology study.",
    "Rules you must follow:",
    "1. Use only the information the researcher supplied. Never invent sample sizes, acquisition parameters, ethics approval numbers, funding details, software versions or citations.",
    "2. If the researcher supplied nothing for a required point, write [TO BE COMPLETED] for that point instead of guessing.",
    "3. If a value looks internally inconsistent with the rest of the answers, keep the researcher's value and add [VERIFY: value] immediately after it.",
    "4. Write in plain academic English, past or future tense as appropriate for a plan, no marketing language, no bullet-point padding.",
    "5. Return Markdown body text only. Do not repeat the section heading, do not add a preamble, do not wrap the answer in a code fence.",
    "6. Keep the answer under 220 words."
  ].join("\n");

  function buildMessages(payload) {
    var lines = [];
    lines.push("Section: " + payload.sectionTitle);
    if (payload.sectionIntro) lines.push("Guidance: " + payload.sectionIntro);
    lines.push("Modality: " + payload.modalityLabel);
    lines.push("");
    lines.push("Researcher answers for this section:");
    var answered = 0;
    (payload.fields || []).forEach(function (field) {
      var value = payload.answers ? payload.answers[field.id] : "";
      if (value == null || String(value).trim() === "") return;
      answered++;
      lines.push("- " + field.label + ": " + String(value).trim());
    });
    if (answered === 0) {
      lines.push("- (none supplied)");
    }
    lines.push("");
    lines.push(
      "Write the body of this section as Markdown. Where the researcher gave nothing, use [TO BE COMPLETED]."
    );
    return [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: lines.join("\n") }
    ];
  }

  function estimateFor(payload) {
    var messages = buildMessages(payload);
    var promptText = messages
      .map(function (m) {
        return m.content;
      })
      .join("\n");
    return root.PreregThrottle.estimateTokens(promptText) + MAX_TOKENS;
  }

  function createClient(options) {
    options = options || {};
    var getKey = options.getKey || function () { return ""; };
    var limiter = options.limiter;
    var fetchImpl = options.fetch || (typeof fetch !== "undefined" ? fetch.bind(root) : null);
    var sleep = options.sleep || function (ms) {
      return new Promise(function (resolve) { setTimeout(resolve, ms); });
    };
    var model = options.model || DEFAULT_MODEL;

    function backoffMs(attempt, retryAfterSeconds) {
      if (isFinite(retryAfterSeconds) && retryAfterSeconds > 0) {
        return Math.min(retryAfterSeconds * 1000, 60000);
      }
      var base = Math.pow(2, attempt) * 1000;
      var jitter = base * 0.2 * (Math.random() * 2 - 1);
      return Math.max(500, Math.round(base + jitter));
    }

    async function callOnce(body, signal) {
      var key = getKey();
      if (!key) {
        var missing = new Error("No Groq API key set.");
        missing.code = "no_key";
        throw missing;
      }

      var controller = new AbortController();
      var timedOut = false;
      var timer = setTimeout(function () {
        timedOut = true;
        controller.abort();
      }, options.timeoutMs || 60000);

      function forwardAbort() {
        controller.abort();
      }
      if (signal) {
        if (signal.aborted) forwardAbort();
        else signal.addEventListener("abort", forwardAbort);
      }

      function cleanup() {
        clearTimeout(timer);
        if (signal) signal.removeEventListener("abort", forwardAbort);
      }

      var res;
      try {
        res = await fetchImpl(ENDPOINT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + key
          },
          body: JSON.stringify(body),
          signal: controller.signal
        });
      } catch (err) {
        cleanup();
        if (timedOut) {
          var timeoutErr = new Error("Groq did not respond within 60s. Try again.");
          timeoutErr.code = "timeout";
          timeoutErr.refundable = true;
          throw timeoutErr;
        }
        if (err && err.name === "AbortError") {
          var aborted = new Error("Request cancelled.");
          aborted.code = "aborted";
          aborted.refundable = true;
          throw aborted;
        }
        var netErr = new Error("Network error reaching Groq. Check your connection.");
        netErr.code = "network";
        netErr.refundable = true;
        throw netErr;
      }
      cleanup();

      if (limiter && limiter.syncFromHeaders) limiter.syncFromHeaders(res.headers);

      if (res.status === 429) {
        var retryAfter = Number(res.headers.get("retry-after"));
        var limited = new Error("Groq rate limit reached.");
        limited.code = "rate_limited";
        limited.retryAfter = isFinite(retryAfter) ? retryAfter : null;
        limited.refundable = true;
        throw limited;
      }

      if (res.status === 401 || res.status === 403) {
        var authErr = new Error("Groq rejected the API key. Check it and try again.");
        authErr.code = "auth";
        authErr.refundable = true;
        throw authErr;
      }

      if (!res.ok) {
        var detail = "";
        try {
          detail = (await res.text()).slice(0, 300);
        } catch (e) {
          /* ignore */
        }
        var httpErr = new Error("Groq returned " + res.status + (detail ? ": " + detail : ""));
        httpErr.code = "http_" + res.status;
        httpErr.refundable = res.status >= 500;
        throw httpErr;
      }

      var json = await res.json();
      var choice = json.choices && json.choices[0];
      var content = choice && choice.message && choice.message.content;
      if (!content) {
        var empty = new Error("Groq returned an empty response.");
        empty.code = "empty";
        empty.refundable = true;
        throw empty;
      }
      return {
        text: content.trim(),
        usage: json.usage || null,
        model: json.model || body.model
      };
    }

    async function expandSection(payload, opts) {
      opts = opts || {};
      var signal = opts.signal;
      var notify = opts.onWait || function () {};
      var messages = buildMessages(payload);
      var maxTokens = MAX_TOKENS;
      var estimate = estimateFor(payload);

      var body = {
        model: model,
        messages: messages,
        temperature: 0.2,
        max_tokens: maxTokens,
        top_p: 0.9
      };

      var lastError = null;
      for (var attempt = 0; attempt <= 3; attempt++) {
        if (signal && signal.aborted) {
          var cancelled = new Error("Request cancelled.");
          cancelled.code = "aborted";
          throw cancelled;
        }
        try {
          var result = await limiter.schedule(function () {
            return callOnce(body, signal);
          }, estimate, notify);

          if (result.usage && result.usage.total_tokens) {
            limiter.reconcile(estimate, result.usage.total_tokens);
          }
          return result;
        } catch (err) {
          lastError = err;
          var retryable = err.code === "rate_limited" || err.code === "network" || /^http_5/.test(err.code || "");
          if (!retryable || attempt === 3) throw err;
          await sleep(backoffMs(attempt, err.retryAfter));
        }
      }
      throw lastError;
    }

    return {
      expandSection: expandSection,
      estimateFor: estimateFor,
      model: model,
      fallbackModel: FALLBACK_MODEL,
      buildMessages: buildMessages
    };
  }

  root.PreregGroq = {
    createClient: createClient,
    buildMessages: buildMessages,
    estimateFor: estimateFor,
    SYSTEM_PROMPT: SYSTEM_PROMPT,
    DEFAULT_MODEL: DEFAULT_MODEL,
    FALLBACK_MODEL: FALLBACK_MODEL,
    MAX_TOKENS: MAX_TOKENS,
    ENDPOINT: ENDPOINT
  };
})(typeof window !== "undefined" ? window : globalThis);
