# HTML Site Plan — Interactive Preregistration Builder

**Status:** Planning complete, construction starting
**Target:** `https://caggursoy.github.io/biopsych-prereg-skill/`
**Date:** 2026-11-17

---

## 1. Goal

Convert this skill library from an agent-only Markdown collection into a **static, browser-based preregistration builder** hosted on GitHub Pages, while keeping the existing Markdown skills, templates and configs as the single source of truth.

A researcher with no AI agent, no Python and no local install should be able to open the URL, pick a modality, fill in a form, and download a `PREREGISTRATION_DRAFT.md` that follows the same structure the skills produce.

## 2. Locked Decisions

| Decision | Choice | Rationale |
|---|---|---|
| Hosting | This repo, published from `/docs` | Skill and site stay in one repo, one PR review surface |
| Site scope | Interactive builder (option 2b) | Primary user value; library browsing is a by-product |
| LLM provider | Groq free tier, browser-direct | No backend, no server cost, no key to bundle |
| Source of truth | `templates/*.md` + `configs/*.json` | Site data is generated, never hand-maintained |
| Build tooling | Node ESM script, zero dependencies | No `node_modules`, no lockfile, fast CI |
| Framework | None — vanilla HTML/CSS/JS | Pages serves static files; no build step at request time |

## 3. Non-Goals

- No server, no database, no user accounts, no saved drafts on a backend.
- No file upload / automatic project-directory scanning (impossible in a browser sandbox).
- No modification of existing `skills/`, `templates/`, `configs/`, `examples/` files.
- No PDF assets in `docs/` — the three PDFs stay out of the published site.

## 4. Architecture

```
docs/                          # published root (GitHub Pages)
  index.html                   # landing: what it is, modality cards, entry points
  builder.html                 # the interactive builder
  library.html                 # browsable templates + skills rendered from Markdown
  assets/
    css/site.css               # single stylesheet, no framework
    js/
      schema.js                # generated: field schema per modality
      templates.js             # generated: template Markdown + section metadata
      throttle.js              # token-bucket rate limiter + queue + backoff
      groq.js                  # Groq chat client (streaming, abortable)
      markdown.js              # minimal MD -> HTML renderer (no CDN)
      builder.js               # form state, validation, draft assembly
      library.js               # library page rendering + search
  data/
    schema.json                # generated, consumed by builder
    templates.json             # generated, consumed by library
  .nojekyll

scripts/
  build-site.mjs               # templates/configs -> docs/data + docs/assets/js
  validate-site.mjs            # schema/link/asset checks, run in CI

.github/workflows/pages.yml    # build, validate, deploy to Pages
```

### Why generated data instead of hand-written JS

`templates/*.md` and `configs/*.json` already encode the section lists, required sections, confidence levels and validation ranges. `build-site.mjs` parses them into JSON so that editing a template updates the site automatically and the two can never drift. Generated files are committed so `/docs` works even without a CI run.

## 5. Data Model

### 5.1 Modality descriptor

```json
{
  "id": "eeg",
  "label": "EEG / ERP",
  "template": "templates/eeg/EEG_ERP_PREREGISTRATION_GUIDE.md",
  "skill": "skills/eeg/SKILL.md",
  "requiredSections": ["Metadata", "Study Information", "..."],
  "sections": [ /* see 5.2 */ ]
}
```

### 5.2 Section and field

```json
{
  "id": "eeg-acquisition",
  "title": "EEG Data Acquisition",
  "required": true,
  "intro": "Short guidance lifted from the template.",
  "fields": [
    {
      "id": "sampling_rate",
      "label": "Sampling rate",
      "type": "number",
      "unit": "Hz",
      "required": true,
      "min": 100,
      "max": 10000,
      "help": "Typical range 250-2000 Hz.",
      "source": "configs/eeg-config.json#parameter_extraction.sampling_rate"
    }
  ]
}
```

Field types: `text`, `textarea`, `number`, `select`, `multiselect`, `date`, `list` (repeatable rows).
Validation ranges come from each config's `quality_checks.validation_patterns`, so the form warns using the project's own documented ranges rather than invented ones.

### 5.3 Section coverage per modality

| Modality | Sections |
|---|---|
| All | Metadata, Study Information, Participants, Ethics & Data Management |
| EEG | EEG Data Acquisition, Experimental Paradigm, Preprocessing Plan, Analysis Plan |
| fMRI | fMRI Acquisition Parameters, Task Design, Preprocessing Pipeline, Statistical Analysis Plan |
| Online | Experiment Design, Data Quality Procedures, Analysis Plan |
| Psychophys | Psychophysiological Measures, Experimental Paradigm, Signal Processing, Analysis Plan |

Common sections are shared objects, injected into every modality, so the ethics block is written once.

## 6. Builder UX

Single page, four steps, state held in memory and mirrored to `localStorage`:

1. **Modality** — four cards, plus a "not sure?" note pointing at the detection rules in `configs/biopsych-config.json`.
2. **Sections** — accordion of sections with a completion meter. Required fields marked. Inline validation on blur, not on every keystroke.
3. **Review** — live Markdown preview of the assembled draft, with `[TO BE COMPLETED]` markers for empty required fields and `[VERIFY: ...]` for values flagged low-confidence.
4. **Export** — download `PREREGISTRATION_DRAFT.md`, copy to clipboard, or print to PDF via the browser.

Behaviour rules carried over from `AGENTS.md`:

- Empty required fields render as `[TO BE COMPLETED]`, never silently omitted.
- Values the user marks uncertain render as `[VERIFY: value]`.
- Every generated section carries an HTML comment naming its source template.
- Nothing is ever written back to the repository.

## 7. Groq Integration

### 7.1 Models

Verified against `console.groq.com/docs/models` and `/docs/rate-limits` on 2026-11-17:

| Model ID | RPM | RPD | TPM | TPD |
|---|---|---|---|---|
| `openai/gpt-oss-120b` | 30 | 1,000 | 8,000 | 200,000 |
| `openai/gpt-oss-20b` | 30 | 1,000 | 8,000 | 200,000 |
| `qwen/qwen3.8-27b` | 30 | 1,000 | 8,000 | 200,000 |

Default `openai/gpt-oss-120b`, fallback `openai/gpt-oss-20b`. `llama-3.3-70b-versatile` is still listed on the models page but the changelog retires it for free/developer tiers, so it is not used.

### 7.2 The binding constraint is TPM, not RPM

8,000 tokens per minute is the real ceiling. A full preregistration is far larger than that, so **one giant call is not viable**. Design:

- Generation is **per section**, never whole-document.
- Each call: system prompt (~400 tok) + section guidance (~300 tok) + user answers (~300 tok) + `max_tokens` 900 ≈ **1,900 tokens**.
- That is ~4 section calls per minute at the TPM cap, and ~105 calls per day at the TPD cap.
- Sections are queued and drained serially, so the limiter never has to reconcile concurrent token spend.

### 7.3 Throttling specification (`throttle.js`)

Three token buckets plus two daily counters, all persisted in `localStorage` and reset on UTC midnight:

| Bucket | Capacity | Refill | Headroom |
|---|---|---|---|
| Requests/min | 25 | 25/60 per s | 5 below the 30 RPM cap |
| Tokens/min | 7,000 | 7,000/60 per s | 1,000 below the 8,000 TPM cap |
| Requests/day | 900 | UTC reset | 100 below the 1,000 RPD cap |
| Tokens/day | 180,000 | UTC reset | 20,000 below the 200,000 TPD cap |

Rules:

1. **Serial queue**, concurrency 1. A job waits until *all four* budgets can cover it.
2. **Pre-flight estimate** — `estimateTokens(prompt) + max_tokens` is charged before dispatch; actual usage from the response reconciles the difference afterwards.
3. **429 handling** — honour the `retry-after` header when present, otherwise exponential backoff `2^n` seconds with ±20% jitter, max 3 retries, then surface a clear error.
4. **Header sync** — read `x-ratelimit-remaining-requests` / `-tokens` and clamp local buckets down if the server disagrees. Server truth wins.
5. **Abort** — every request carries an `AbortController`; cancelling clears the queue and refunds unspent budget.
6. **UI meter** — persistent footer showing requests today, tokens today, and seconds until the next slot. The user always knows why a button is disabled.
7. **Offline mode** — the builder is fully functional with no key and no network. LLM assistance is an optional accelerator, never a dependency.

### 7.4 What the LLM is and is not allowed to do

- **Allowed:** expand terse user answers into full prose for a single section, suggest wording, flag internal inconsistencies.
- **Not allowed:** invent sample sizes, parameters, ethics approval numbers or citations. The system prompt forbids fabrication and requires `[TO BE COMPLETED]` when the user gave nothing.
- Every LLM-written section is labelled in the draft with an HTML comment so the user knows what to review.

## 8. Security and Privacy

- **No API key is ever committed.** The key is typed by the user, held in `localStorage` under a namespaced key, and sent only to `api.groq.com`. There is no bundled key to leak because the site is static.
- The key field is `type="password"`, never echoed into the DOM or into logs, and there is a one-click "forget key" action.
- Draft content stays in the browser. Nothing is transmitted except the section text the user explicitly sends for expansion, and the UI states this before the first call.
- No analytics, no third-party scripts, no CDN. `markdown.js` is local so no external origin is loaded.
- A visible warning that the key is stored in this browser profile and should be revoked from the Groq console if the device is shared.

## 9. Build and Deploy

`scripts/build-site.mjs`:

1. Read `configs/biopsych-config.json` for the modality list and file patterns.
2. For each modality, read its config and template, extract `##`/`###` headings, map them onto the section schema, and merge `quality_checks.validation_patterns` into field ranges.
3. Emit `docs/data/schema.json`, `docs/data/templates.json`, `docs/assets/js/schema.js`, `docs/assets/js/templates.js`.
4. Fail loudly on a missing template or an unmapped required section.

`scripts/validate-site.mjs`:

- Every `required_sections` entry in every config maps to a section in the generated schema.
- Every field `id` is unique within its section.
- Every internal link in `docs/*.html` resolves to a file that exists.
- No file in `docs/` exceeds 500 KB; total `docs/` payload under 1 MB.
- No `http://` external references and no inline event handlers.

`.github/workflows/pages.yml`: on push to `main` touching `docs/`, `templates/`, `configs/` or `scripts/` — checkout, `node scripts/build-site.mjs`, `node scripts/validate-site.mjs`, `actions/upload-pages-artifact` with `path: docs`, `actions/deploy-pages`. Pages source must be set to "GitHub Actions" in repo settings.

## 10. Accessibility and Responsiveness

- Semantic landmarks, one `h1` per page, visible focus rings, `aria-live` on the quota meter and validation summary.
- All form controls have real `<label for>`; errors are linked with `aria-describedby`.
- Keyboard-only path through all four steps; accordion headers are buttons.
- Colour contrast at least 4.5:1; no information conveyed by colour alone.
- Responsive from 320 px up; the builder is single-column below 900 px.

## 11. Phases

### Phase 1 — Plan
- [x] Confirm hosting, scope and LLM provider
- [x] Verify Groq model IDs and free-tier limits against official docs
- [x] Write this plan

### Phase 2 — Data pipeline
- [x] `scripts/build-site.mjs` generating schema and template JSON
- [x] `scripts/validate-site.mjs`
- [x] Generated artefacts committed under `docs/`

### Phase 3 — Site shell
- [x] `docs/index.html`, `docs/library.html`, `docs/assets/css/site.css`
- [x] `docs/assets/js/markdown.js`, `docs/assets/js/library.js`

### Phase 4 — Builder
- [x] `docs/builder.html` four-step flow
- [x] `docs/assets/js/builder.js` state, validation, draft assembly
- [x] Download, clipboard and print export

### Phase 5 — Groq
- [x] `docs/assets/js/throttle.js` four-budget limiter
- [x] `docs/assets/js/groq.js` client with abort and 429 backoff
- [x] Quota meter and key management UI

### Phase 6 — Deploy and verify
- [x] `pages.yml` workflow
- [x] Local serve and end-to-end check
- [x] README section pointing at the live site
- [ ] Enable Pages with source "GitHub Actions" in repository settings
- [ ] Confirm the first workflow run and the live URL

## 12. Verification

| Check | Method | Result |
|---|---|---|
| Build is deterministic | Run `build-site.mjs` twice, diff output | Pass — identical hashes |
| Schema covers configs | `validate-site.mjs` asserts every `required_sections` entry maps | Pass — 4 modalities, 31 sections, 254 fields |
| Draft structure matches template | Generate a draft with all fields filled, diff headings against the template's section list | Pass — section order follows the config |
| Empty-field marking | Generate with required fields blank, assert `[TO BE COMPLETED]` count equals blank required count | Pass — 38 markers for 38 blanks |
| Throttle correctness | Unit-test the bucket maths in Node | Pass — 20 checks in `test-throttle.mjs` |
| 429 path | Stub `fetch` returning 429 with `retry-after`, assert backoff and single retry | Pass — 16 checks in `test-groq.mjs` |
| Groq CORS from browser | One real call from a served page with a user key | **Not run** — needs a live key; the offline builder is the supported path until confirmed |
| Pages deploy | Confirm the workflow run succeeds and the URL serves `index.html` | **Not run** — requires Pages enabled in repository settings |

## 13. Risks

| Risk | Mitigation |
|---|---|
| Groq blocks browser CORS | Verify in Phase 5; offline builder remains fully functional, LLM marked experimental |
| 8K TPM makes generation feel slow | Per-section calls with a visible queue and progress; user can export at any point |
| Free-tier limits change | Limits live in one config object in `throttle.js`; header sync corrects drift at runtime |
| Template edits break the schema | CI validation fails the build rather than shipping a broken form |
| Users paste a key on a shared machine | Password field, "forget key" button, explicit storage warning |
| Site drifts from skills | Generated from source; validation asserts coverage |

## 14. References

- Groq models: https://console.groq.com/docs/models
- Groq rate limits: https://console.groq.com/docs/rate-limits
- GitHub Pages via Actions: https://docs.github.com/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
- Template sources: see `REFERENCES.md`
