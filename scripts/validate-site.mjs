#!/usr/bin/env node
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DOCS = join(ROOT, "docs");
const MAX_FILE = 500 * 1024;
const MAX_TOTAL = 1024 * 1024;

const errors = [];
const warnings = [];

function fail(msg) {
  errors.push(msg);
}

function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else out.push(full);
  }
  return out;
}

if (!existsSync(join(DOCS, "data", "schema.json"))) {
  fail("docs/data/schema.json missing — run scripts/build-site.mjs first");
} else {
  const schema = JSON.parse(readFileSync(join(DOCS, "data", "schema.json"), "utf8"));
  const base = JSON.parse(readFileSync(join(ROOT, "configs", "biopsych-config.json"), "utf8"));

  const ids = schema.modalities.map((m) => m.id);
  for (const id of base.modalities) {
    if (!ids.includes(id)) fail(`modality "${id}" from biopsych-config.json missing in schema`);
  }

  for (const m of schema.modalities) {
    const cfg = JSON.parse(readFileSync(join(ROOT, `configs/${m.id}-config.json`), "utf8"));
    const titles = m.sections.map((s) => s.title.toLowerCase());
    for (const required of cfg.required_sections || []) {
      const norm = required.toLowerCase();
      const covered = titles.some((t) => t === norm || t.includes(norm.split(" ")[0]));
      if (!covered) fail(`${m.id}: required section "${required}" not represented in form`);
    }
    for (const section of m.sections) {
      const seen = new Set();
      for (const field of section.fields) {
        if (seen.has(field.id)) fail(`${m.id}/${section.id}: duplicate field "${field.id}"`);
        seen.add(field.id);
        if (!field.label) fail(`${m.id}/${section.id}/${field.id}: missing label`);
        if (field.type === "select" || field.type === "multiselect") {
          if (!Array.isArray(field.options) || field.options.length === 0) {
            fail(`${m.id}/${section.id}/${field.id}: ${field.type} without options`);
          }
        }
        if (field.min != null && field.max != null && field.min >= field.max) {
          fail(`${m.id}/${section.id}/${field.id}: min >= max`);
        }
      }
    }
  }
}

const files = existsSync(DOCS) ? walk(DOCS) : [];
let total = 0;
for (const file of files) {
  const size = statSync(file).size;
  total += size;
  if (size > MAX_FILE) fail(`${relative(ROOT, file)} is ${(size / 1024).toFixed(0)} KB (limit 500 KB)`);
}
if (total > MAX_TOTAL) fail(`docs/ total ${(total / 1024).toFixed(0)} KB exceeds 1 MB`);

for (const file of files.filter((f) => f.endsWith(".html"))) {
  const html = readFileSync(file, "utf8");
  const rel = relative(ROOT, file);

  for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const target = match[1];
    if (/^(https?:|mailto:|#|data:)/.test(target)) continue;
    const clean = target.split("#")[0].split("?")[0];
    if (!clean) continue;
    const resolved = resolve(dirname(file), clean);
    if (!existsSync(resolved)) fail(`${rel}: broken internal reference "${target}"`);
  }

  if (/http:\/\//.test(html)) fail(`${rel}: insecure http:// reference`);
  if (/\son[a-z]+\s*=/i.test(html)) fail(`${rel}: inline event handler attribute found`);
  if (/gsk_[A-Za-z0-9]{20,}/.test(html)) fail(`${rel}: hardcoded Groq API key`);
}

for (const file of files.filter((f) => f.endsWith(".js"))) {
  const js = readFileSync(file, "utf8");
  if (/gsk_[A-Za-z0-9]{20,}/.test(js)) fail(`${relative(ROOT, file)}: hardcoded Groq API key`);
}

if (!existsSync(join(DOCS, ".nojekyll"))) warnings.push("docs/.nojekyll missing");

if (warnings.length) {
  console.warn("Warnings:");
  for (const w of warnings) console.warn(`  - ${w}`);
}

if (errors.length) {
  console.error(`Validation failed with ${errors.length} error(s):`);
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}

console.log(`Validation passed: ${files.length} files, ${(total / 1024).toFixed(0)} KB total.`);
