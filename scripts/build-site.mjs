#!/usr/bin/env node
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { COMMON_SECTIONS, MODALITY_SECTIONS } from "./field-defs.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DOCS = join(ROOT, "docs");

const STOPWORDS = new Set(["data", "plan", "parameters", "and", "the", "of", "for"]);

function tokens(text) {
  return new Set(
    text
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, " ")
      .split(/\s+/)
      .filter((w) => w && !STOPWORDS.has(w))
  );
}

function isSubset(a, b) {
  for (const t of a) if (!b.has(t)) return false;
  return true;
}

function matchSection(configTitle, sections) {
  const want = tokens(configTitle);
  const exact = sections.find((s) => s.title.toLowerCase() === configTitle.toLowerCase());
  if (exact) return exact;
  const hits = sections.filter((s) => isSubset(want, tokens(s.title)));
  if (hits.length === 1) return hits[0];
  if (hits.length > 1) return hits.sort((x, y) => tokens(x.title).size - tokens(y.title).size)[0];
  return null;
}

function readJSON(rel) {
  return JSON.parse(readFileSync(join(ROOT, rel), "utf8"));
}

function readText(rel) {
  return readFileSync(join(ROOT, rel), "utf8");
}

function extractHeadings(markdown) {
  return markdown
    .split("\n")
    .filter((line) => /^#{2,3}\s+/.test(line))
    .map((line) => ({
      level: line.startsWith("### ") ? 3 : 2,
      text: line.replace(/^#{2,3}\s+/, "").trim(),
    }));
}

function extractTitle(markdown) {
  const line = markdown.split("\n").find((l) => /^#\s+/.test(l));
  return line ? line.replace(/^#\s+/, "").trim() : "Untitled";
}

function build() {
  const base = readJSON("configs/biopsych-config.json");
  const errors = [];
  const modalities = [];

  for (const id of base.modalities) {
    const cfgRel = `configs/${id}-config.json`;
    if (!existsSync(join(ROOT, cfgRel))) {
      errors.push(`Missing config: ${cfgRel}`);
      continue;
    }
    const cfg = readJSON(cfgRel);
    const tplRel = cfg.template_path;
    if (!tplRel || !existsSync(join(ROOT, tplRel))) {
      errors.push(`Missing template for ${id}: ${tplRel}`);
      continue;
    }
    const templateMd = readText(tplRel);
    const skillRel = cfg.skill_path;
    const skillMd = skillRel && existsSync(join(ROOT, skillRel)) ? readText(skillRel) : "";

    const modalitySections = MODALITY_SECTIONS[id];
    if (!modalitySections) {
      errors.push(`No field definitions for modality: ${id}`);
      continue;
    }

    const allSections = [...COMMON_SECTIONS, ...modalitySections];
    const mapped = [];
    for (const requiredTitle of cfg.required_sections || []) {
      const section = matchSection(requiredTitle, allSections);
      if (!section) {
        errors.push(`${id}: required section "${requiredTitle}" has no matching form section`);
        continue;
      }
      if (!mapped.includes(section.id)) mapped.push(section.id);
    }

    const orderedSections = mapped
      .map((sid) => allSections.find((s) => s.id === sid))
      .filter(Boolean);

    const seenFieldIds = new Set();
    for (const section of orderedSections) {
      const local = new Set();
      for (const field of section.fields) {
        if (local.has(field.id)) errors.push(`${id}/${section.id}: duplicate field id "${field.id}"`);
        local.add(field.id);
        seenFieldIds.add(field.id);
      }
    }

    modalities.push({
      id,
      label: {
        eeg: "EEG / ERP",
        fmri: "fMRI",
        online: "Online Behavioral",
        psychophys: "Psychophysiology",
      }[id] || id,
      description: cfg.description || "",
      template: tplRel,
      templateTitle: extractTitle(templateMd),
      skill: skillRel || null,
      requiredSections: cfg.required_sections || [],
      sections: orderedSections,
      validationPatterns: (cfg.quality_checks && cfg.quality_checks.validation_patterns) || {},
      filePatterns: (cfg.file_patterns && cfg.file_patterns.data_files) || [],
      software: Object.keys(cfg.software_detection || cfg.platform_detection || {}),
    });

    modalities[modalities.length - 1].library = {
      templateHeadings: extractHeadings(templateMd),
      templateMarkdown: templateMd,
      skillMarkdown: skillMd,
    };
  }

  if (errors.length) {
    console.error("Build failed:");
    for (const e of errors) console.error(`  - ${e}`);
    process.exit(1);
  }

  const schema = {
    version: base.version || "1.0",
    confidenceThreshold: base.confidence_threshold,
    modalities,
  };

  mkdirSync(join(DOCS, "data"), { recursive: true });
  mkdirSync(join(DOCS, "assets", "js"), { recursive: true });

  writeFileSync(join(DOCS, "data", "schema.json"), JSON.stringify(schema, null, 2) + "\n");

  const library = {
    modalities: modalities.map((m) => ({
      id: m.id,
      label: m.label,
      templateTitle: m.templateTitle,
      template: m.template,
      skill: m.skill,
      headings: m.library.templateHeadings,
      templateMarkdown: m.library.templateMarkdown,
      skillMarkdown: m.library.skillMarkdown,
    })),
  };
  writeFileSync(join(DOCS, "data", "templates.json"), JSON.stringify(library, null, 2) + "\n");

  writeFileSync(
    join(DOCS, "assets", "js", "schema.js"),
    "window.PREREG_SCHEMA = " + JSON.stringify(schema) + ";\n"
  );
  writeFileSync(
    join(DOCS, "assets", "js", "templates.js"),
    "window.PREREG_LIBRARY = " + JSON.stringify(library) + ";\n"
  );

  const fieldCount = modalities.reduce(
    (n, m) => n + m.sections.reduce((k, s) => k + s.fields.length, 0),
    0
  );
  console.log(
    `Built ${modalities.length} modalities, ${modalities.reduce((n, m) => n + m.sections.length, 0)} sections, ${fieldCount} fields.`
  );
}

build();
