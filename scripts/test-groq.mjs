#!/usr/bin/env node
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

require(join(ROOT, "docs/assets/js/throttle.js"));
require(join(ROOT, "docs/assets/js/groq.js"));

const T = globalThis.PreregThrottle;
const G = globalThis.PreregGroq;

let failures = 0;
function check(name, condition, detail) {
  if (condition) console.log(`  ok   ${name}`);
  else {
    failures++;
    console.error(`  FAIL ${name}${detail ? " — " + detail : ""}`);
  }
}

function clock() {
  let t = 1700000000000;
  return {
    now: () => t,
    sleep: (ms) => {
      t += ms;
      return Promise.resolve();
    },
  };
}

function jsonResponse(body, status = 200, headers = {}) {
  const map = new Map(Object.entries(headers));
  return {
    ok: status >= 200 && status < 300,
    status,
    headers: { get: (k) => (map.has(k) ? map.get(k) : null) },
    json: async () => body,
    text: async () => JSON.stringify(body),
  };
}

function makeClient(fetchImpl, c) {
  const limiter = T.createLimiter({ now: c.now, sleep: c.sleep });
  const client = G.createClient({
    getKey: () => "gsk_test_key_value_1234567890",
    limiter,
    fetch: fetchImpl,
    sleep: c.sleep,
  });
  return { client, limiter };
}

const payload = {
  sectionTitle: "EEG Data Acquisition",
  sectionIntro: "Hardware and recording parameters.",
  modalityLabel: "EEG / ERP",
  fields: [
    { id: "system", label: "EEG system and manufacturer" },
    { id: "sampling_rate", label: "Sampling rate" },
  ],
  answers: { system: "BrainVision ActiChamp", sampling_rate: "1000" },
};

console.log("prompt construction");
{
  const messages = G.buildMessages(payload);
  check("two messages", messages.length === 2);
  check("system forbids invention", /Never invent/i.test(messages[0].content));
  check("system requires marker", /\[TO BE COMPLETED\]/.test(messages[0].content));
  check("user carries answers", /BrainVision ActiChamp/.test(messages[1].content));
  check("empty answers noted", /none supplied/.test(G.buildMessages({ ...payload, answers: {} })[1].content));
}

console.log("429 then success retries once");
{
  const c = clock();
  let calls = 0;
  const fetchImpl = async () => {
    calls++;
    if (calls === 1) return jsonResponse({ error: "rate" }, 429, { "retry-after": "0" });
    return jsonResponse({
      model: "openai/gpt-oss-120b",
      choices: [{ message: { content: "Recorded with a 64-channel cap." } }],
      usage: { total_tokens: 420 },
    });
  };
  const { client, limiter } = makeClient(fetchImpl, c);
  const result = await client.expandSection(payload);
  check("two fetch calls", calls === 2, String(calls));
  check("returns text", /64-channel cap/.test(result.text));
  check("usage reconciled", limiter.snapshot().tokensToday === 420, String(limiter.snapshot().tokensToday));
}

console.log("401 is not retried");
{
  const c = clock();
  let calls = 0;
  const fetchImpl = async () => {
    calls++;
    return jsonResponse({ error: "bad key" }, 401);
  };
  const { client } = makeClient(fetchImpl, c);
  let code = null;
  try {
    await client.expandSection(payload);
  } catch (err) {
    code = err.code;
  }
  check("single call", calls === 1, String(calls));
  check("auth error surfaced", code === "auth", String(code));
}

console.log("persistent 429 gives up after retries");
{
  const c = clock();
  let calls = 0;
  const fetchImpl = async () => {
    calls++;
    return jsonResponse({ error: "rate" }, 429, { "retry-after": "1" });
  };
  const { client } = makeClient(fetchImpl, c);
  let code = null;
  try {
    await client.expandSection(payload);
  } catch (err) {
    code = err.code;
  }
  check("four attempts", calls === 4, String(calls));
  check("rate limit surfaced", code === "rate_limited", String(code));
}

console.log("abort is honoured");
{
  const c = clock();
  const controller = new AbortController();
  controller.abort();
  const fetchImpl = async () => jsonResponse({}, 200);
  const { client } = makeClient(fetchImpl, c);
  let code = null;
  try {
    await client.expandSection(payload, { signal: controller.signal });
  } catch (err) {
    code = err.code;
  }
  check("aborted before dispatch", code === "aborted", String(code));
}

console.log("missing key is rejected");
{
  const c = clock();
  const limiter = T.createLimiter({ now: c.now, sleep: c.sleep });
  const client = G.createClient({ getKey: () => "", limiter, fetch: async () => jsonResponse({}), sleep: c.sleep });
  let code = null;
  try {
    await client.expandSection(payload);
  } catch (err) {
    code = err.code;
  }
  check("no_key surfaced", code === "no_key", String(code));
}

console.log("empty completion is rejected");
{
  const c = clock();
  const fetchImpl = async () => jsonResponse({ choices: [{ message: { content: "" } }] }, 200);
  const { client } = makeClient(fetchImpl, c);
  let code = null;
  try {
    await client.expandSection(payload);
  } catch (err) {
    code = err.code;
  }
  check("empty surfaced", code === "empty", String(code));
}

if (failures) {
  console.error(`\n${failures} check(s) failed.`);
  process.exit(1);
}
console.log("\nAll Groq client checks passed.");
