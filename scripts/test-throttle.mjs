#!/usr/bin/env node
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const T = require(join(ROOT, "docs/assets/js/throttle.js"));

let failures = 0;
function check(name, condition, detail) {
  if (condition) {
    console.log(`  ok   ${name}`);
  } else {
    failures++;
    console.error(`  FAIL ${name}${detail ? " — " + detail : ""}`);
  }
}

function fakeClock(start = 1700000000000) {
  let t = start;
  return {
    now: () => t,
    sleep: (ms) => {
      t += ms;
      return Promise.resolve();
    },
    advance: (ms) => {
      t += ms;
    },
  };
}

console.log("estimateTokens");
check("empty is zero", T.estimateTokens("") === 0);
check("scales with length", T.estimateTokens("a".repeat(360)) === 108, String(T.estimateTokens("a".repeat(360))));
check("never negative", T.estimateTokens(null) === 0);

console.log("burst of 40 small requests is capped by RPM");
{
  const clock = fakeClock();
  const limiter = T.createLimiter({ now: clock.now, sleep: clock.sleep });
  const resolvedAt = [];
  const jobs = [];
  for (let i = 0; i < 40; i++) {
    jobs.push(
      limiter.schedule(() => {
        resolvedAt.push(clock.now());
        return i;
      }, 100)
    );
  }
  await Promise.all(jobs);
  const start = 1700000000000;
  const immediate = resolvedAt.filter((t) => t === start).length;
  check("25 run immediately", immediate === 25, `got ${immediate}`);
  check("all 40 complete", resolvedAt.length === 40, `got ${resolvedAt.length}`);
  check("remaining 15 wait", resolvedAt.filter((t) => t > start).length === 15);
  const snap = limiter.snapshot();
  check("daily request counter is 40", snap.requestsToday === 40, String(snap.requestsToday));
}

console.log("large requests are capped by TPM");
{
  const clock = fakeClock();
  const limiter = T.createLimiter({ now: clock.now, sleep: clock.sleep });
  const start = 1700000000000;
  const resolvedAt = [];
  const jobs = [];
  for (let i = 0; i < 10; i++) {
    jobs.push(limiter.schedule(() => { resolvedAt.push(clock.now()); }, 1000));
  }
  await Promise.all(jobs);
  const immediate = resolvedAt.filter((t) => t === start).length;
  check("7 run immediately at 7000 TPM", immediate === 7, `got ${immediate}`);
  check("all 10 complete", resolvedAt.length === 10);
}

console.log("daily request ceiling");
{
  const clock = fakeClock();
  const store = {
    data: {},
    getItem(k) { return this.data[k] || null; },
    setItem(k, v) { this.data[k] = v; },
  };
  store.setItem("prereg.throttle.v1", JSON.stringify({ day: T.utcDay(clock.now()), dayRequests: 900, dayTokens: 0 }));
  const limiter = T.createLimiter({ now: clock.now, sleep: clock.sleep, storage: store });
  let rejected = false;
  try {
    await limiter.schedule(() => 1, 100);
  } catch (err) {
    rejected = /quota exhausted/i.test(err.message);
  }
  check("rejects past the daily cap", rejected);
}

console.log("daily token ceiling");
{
  const clock = fakeClock();
  const store = {
    data: {},
    getItem(k) { return this.data[k] || null; },
    setItem(k, v) { this.data[k] = v; },
  };
  store.setItem("prereg.throttle.v1", JSON.stringify({ day: T.utcDay(clock.now()), dayRequests: 0, dayTokens: 180000 }));
  const limiter = T.createLimiter({ now: clock.now, sleep: clock.sleep, storage: store });
  let rejected = false;
  try {
    await limiter.schedule(() => 1, 500);
  } catch (err) {
    rejected = /quota exhausted/i.test(err.message);
  }
  check("rejects past the daily token cap", rejected);
}

console.log("reconcile adjusts spend to actual usage");
{
  const clock = fakeClock();
  const limiter = T.createLimiter({ now: clock.now, sleep: clock.sleep });
  await limiter.schedule(() => 1, 1000);
  const before = limiter.snapshot().tokensToday;
  limiter.reconcile(1000, 400);
  const after = limiter.snapshot().tokensToday;
  check("over-estimate is refunded", after === before - 600, `${before} -> ${after}`);
}

console.log("cancelAll rejects queued jobs");
{
  const clock = fakeClock();
  const limiter = T.createLimiter({ now: clock.now, sleep: clock.sleep });
  const jobs = [];
  for (let i = 0; i < 30; i++) jobs.push(limiter.schedule(() => i, 100).catch((e) => e.message));
  const cancelled = limiter.cancelAll("stopped");
  const results = await Promise.all(jobs);
  check("queued jobs cancelled", cancelled === 29, `cancelled ${cancelled}`);
  check("cancellation surfaces as error", results.filter((r) => r === "stopped").length === 29);
  check("in-flight job still completes", results.filter((r) => typeof r === "number").length === 1);
}

console.log("header sync clamps local buckets");
{
  const clock = fakeClock();
  const limiter = T.createLimiter({ now: clock.now, sleep: clock.sleep });
  const headers = new Map([
    ["x-ratelimit-remaining-requests", "2"],
    ["x-ratelimit-remaining-tokens", "500"],
  ]);
  limiter.syncFromHeaders({ get: (k) => headers.get(k) });
  const snap = limiter.snapshot();
  check("requests clamped", snap.requestsThisMinute === 23, String(snap.requestsThisMinute));
  check("tokens clamped", snap.tokensThisMinute === 6500, String(snap.tokensThisMinute));
}

console.log("request token cap is enforced");
{
  const clock = fakeClock();
  const limiter = T.createLimiter({ now: clock.now, sleep: clock.sleep });
  await limiter.schedule(() => 1, 999999);
  const snap = limiter.snapshot();
  check("clamped to maxTokensPerRequest", snap.tokensToday === T.LIMITS.maxTokensPerRequest, String(snap.tokensToday));
}

if (failures) {
  console.error(`\n${failures} check(s) failed.`);
  process.exit(1);
}
console.log("\nAll throttle checks passed.");
