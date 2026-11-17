(function () {
  "use strict";

  var schema = window.PREREG_SCHEMA;
  if (!schema) return;

  var STORE_KEY = "prereg.builder.v1";
  var KEY_STORE = "prereg.groq.key";
  var MODEL_STORE = "prereg.groq.model";

  var state = { modality: null, answers: {}, uncertain: {}, step: "modality" };

  var el = {
    steps: document.querySelectorAll(".step-btn"),
    panels: {
      modality: document.getElementById("panel-modality"),
      sections: document.getElementById("panel-sections"),
      review: document.getElementById("panel-review"),
      export: document.getElementById("panel-export")
    },
    modalityGrid: document.getElementById("modalityGrid"),
    modalityNote: document.getElementById("modalityNote"),
    accordion: document.getElementById("sectionAccordion"),
    sectionSummary: document.getElementById("sectionSummary"),
    validationSummary: document.getElementById("validationSummary"),
    previewOut: document.getElementById("previewOut"),
    reviewStats: document.getElementById("reviewStats"),
    progressText: document.getElementById("progressText"),
    progressBar: document.getElementById("progressBar"),
    progressDetail: document.getElementById("progressDetail"),
    btnReset: document.getElementById("btnReset"),
    btnDownload: document.getElementById("btnDownload"),
    btnCopy: document.getElementById("btnCopy"),
    btnPrint: document.getElementById("btnPrint"),
    exportStatus: document.getElementById("exportStatus"),
    keyInput: document.getElementById("keyInput"),
    modelSelect: document.getElementById("modelSelect"),
    btnSaveKey: document.getElementById("btnSaveKey"),
    btnForgetKey: document.getElementById("btnForgetKey"),
    keyStatus: document.getElementById("keyStatus"),
    keyState: document.getElementById("keyState"),
    quotaMeter: document.getElementById("quotaMeter")
  };

  function key(sectionId, fieldId) {
    return sectionId + "." + fieldId;
  }

  function getAnswer(sectionId, fieldId) {
    var v = state.answers[key(sectionId, fieldId)];
    return v == null ? "" : v;
  }

  function setAnswer(sectionId, fieldId, value) {
    var k = key(sectionId, fieldId);
    if (value === "" || value == null || (Array.isArray(value) && value.length === 0)) {
      delete state.answers[k];
    } else {
      state.answers[k] = value;
    }
    save();
  }

  function save() {
    try {
      localStorage.setItem(
        STORE_KEY,
        JSON.stringify({ modality: state.modality, answers: state.answers, uncertain: state.uncertain })
      );
    } catch (err) {
      /* storage full or blocked */
    }
  }

  function load() {
    try {
      var raw = localStorage.getItem(STORE_KEY);
      if (!raw) return;
      var saved = JSON.parse(raw);
      if (!saved) return;
      state.modality = saved.modality || null;
      state.answers = saved.answers || {};
      state.uncertain = saved.uncertain || {};
    } catch (err) {
      /* ignore corrupt state */
    }
  }

  function currentModality() {
    if (!state.modality) return null;
    return schema.modalities.filter(function (m) { return m.id === state.modality; })[0] || null;
  }

  /* ---------- steps ---------- */

  function setStep(name) {
    state.step = name;
    Array.prototype.forEach.call(el.steps, function (btn) {
      var active = btn.getAttribute("data-step") === name;
      if (active) btn.setAttribute("aria-current", "step");
      else btn.removeAttribute("aria-current");
    });
    Object.keys(el.panels).forEach(function (k) {
      el.panels[k].hidden = k !== name;
    });
    if (name === "review") renderPreview();
    if (name === "export") renderPreview();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  Array.prototype.forEach.call(el.steps, function (btn) {
    btn.addEventListener("click", function () {
      var target = btn.getAttribute("data-step");
      if ((target === "sections" || target === "review" || target === "export") && !currentModality()) {
        setStep("modality");
        return;
      }
      setStep(target);
    });
  });

  /* ---------- modality ---------- */

  function renderModalities() {
    el.modalityGrid.innerHTML = "";
    schema.modalities.forEach(function (m) {
      var label = document.createElement("label");
      label.className = "modality-option";

      var input = document.createElement("input");
      input.type = "radio";
      input.name = "modality";
      input.value = m.id;
      input.checked = state.modality === m.id;
      input.addEventListener("change", function () {
        state.modality = m.id;
        save();
        renderSections();
        updateProgress();
        setStep("sections");
      });

      var strong = document.createElement("strong");
      strong.textContent = m.label;

      var span = document.createElement("span");
      var fields = m.sections.reduce(function (n, s) { return n + s.fields.length; }, 0);
      span.textContent = m.sections.length + " sections \u00b7 " + fields + " fields";

      label.appendChild(input);
      label.appendChild(strong);
      label.appendChild(span);
      el.modalityGrid.appendChild(label);
    });
  }

  /* ---------- fields ---------- */

  function fieldTop(field, sectionId, inputId) {
    var top = document.createElement("div");
    top.className = "field-top";

    var label = document.createElement("label");
    label.setAttribute("for", inputId);
    label.textContent = field.label;
    if (field.unit) {
      var unit = document.createElement("span");
      unit.className = "unit";
      unit.textContent = "(" + field.unit + ")";
      label.appendChild(unit);
    }
    if (field.required) {
      var req = document.createElement("span");
      req.className = "req";
      req.textContent = "*";
      req.setAttribute("aria-label", "required");
      label.appendChild(req);
    }
    top.appendChild(label);

    if (field.type !== "select" && field.type !== "multiselect") {
      var verify = document.createElement("label");
      verify.className = "verify";
      var cb = document.createElement("input");
      cb.type = "checkbox";
      cb.checked = Boolean(state.uncertain[key(sectionId, field.id)]);
      cb.setAttribute("aria-label", "Flag " + field.label + " for verification");
      cb.addEventListener("change", function () {
        var k = key(sectionId, field.id);
        if (cb.checked) state.uncertain[k] = true;
        else delete state.uncertain[k];
        save();
        renderPreviewIfVisible();
      });
      verify.appendChild(cb);
      verify.appendChild(document.createTextNode("verify"));
      top.appendChild(verify);
    }

    return top;
  }

  function renderField(field, sectionId) {
    var inputId = "f-" + sectionId + "-" + field.id;
    var wrap = document.createElement("div");
    wrap.className = "field";
    wrap.appendChild(fieldTop(field, sectionId, inputId));

    var value = getAnswer(sectionId, field.id);
    var control;

    if (field.type === "select") {
      control = document.createElement("select");
      var blank = document.createElement("option");
      blank.value = "";
      blank.textContent = "Select\u2026";
      control.appendChild(blank);
      (field.options || []).forEach(function (opt) {
        var o = document.createElement("option");
        o.value = opt;
        o.textContent = opt;
        control.appendChild(o);
      });
      control.value = value;
      control.addEventListener("change", function () {
        setAnswer(sectionId, field.id, control.value);
        clearError(wrap);
        updateProgress();
        renderPreviewIfVisible();
      });
    } else if (field.type === "multiselect") {
      control = document.createElement("div");
      control.className = "checks";
      control.id = inputId;
      control.setAttribute("role", "group");
      control.setAttribute("aria-label", field.label);
      var selected = Array.isArray(value) ? value.slice() : [];
      (field.options || []).forEach(function (opt) {
        var lab = document.createElement("label");
        var cb = document.createElement("input");
        cb.type = "checkbox";
        cb.value = opt;
        cb.checked = selected.indexOf(opt) !== -1;
        cb.addEventListener("change", function () {
          var idx = selected.indexOf(opt);
          if (cb.checked && idx === -1) selected.push(opt);
          if (!cb.checked && idx !== -1) selected.splice(idx, 1);
          setAnswer(sectionId, field.id, selected.slice());
          clearError(wrap);
          updateProgress();
          renderPreviewIfVisible();
        });
        lab.appendChild(cb);
        lab.appendChild(document.createTextNode(opt));
        control.appendChild(lab);
      });
    } else if (field.type === "textarea" || field.type === "list") {
      control = document.createElement("textarea");
      control.value = value;
      if (field.type === "list") {
        control.rows = 3;
        control.placeholder = "One per line";
      }
      control.addEventListener("input", function () {
        setAnswer(sectionId, field.id, control.value);
        clearError(wrap);
        updateProgress();
        renderPreviewIfVisible();
      });
    } else {
      control = document.createElement("input");
      control.type = field.type === "number" ? "number" : field.type === "date" ? "date" : "text";
      if (field.type === "number") {
        if (field.min != null) control.min = field.min;
        if (field.max != null) control.max = field.max;
        control.step = "any";
      }
      if (field.placeholder) control.placeholder = field.placeholder;
      control.value = value;
      control.addEventListener("input", function () {
        setAnswer(sectionId, field.id, control.value);
        clearError(wrap);
        updateProgress();
        renderPreviewIfVisible();
      });
      control.addEventListener("blur", function () {
        validateField(field, control, wrap);
      });
    }

    control.id = control.id || inputId;
    if (field.required) control.setAttribute("aria-required", "true");
    wrap.appendChild(control);

    if (field.help) {
      var help = document.createElement("p");
      help.className = "help";
      help.id = inputId + "-help";
      help.textContent = field.help;
      wrap.appendChild(help);
      control.setAttribute("aria-describedby", help.id);
    }

    var err = document.createElement("p");
    err.className = "error";
    err.hidden = true;
    err.id = inputId + "-error";
    wrap.appendChild(err);

    return wrap;
  }

  function clearError(wrap) {
    var err = wrap.querySelector(".error");
    if (err) {
      err.hidden = true;
      err.textContent = "";
    }
    var control = wrap.querySelector("input, textarea, select");
    if (control) control.removeAttribute("aria-invalid");
  }

  function validateField(field, control, wrap) {
    var err = wrap.querySelector(".error");
    var value = control.value;
    var message = "";

    if (field.required && String(value).trim() === "") {
      message = "This field is required.";
    } else if (field.type === "number" && String(value).trim() !== "") {
      var num = Number(value);
      if (!isFinite(num)) message = "Enter a number.";
      else if (field.min != null && num < field.min) message = "Must be at least " + field.min + ".";
      else if (field.max != null && num > field.max) message = "Must be at most " + field.max + ".";
    }

    if (message) {
      err.textContent = message;
      err.hidden = false;
      control.setAttribute("aria-invalid", "true");
      control.setAttribute("aria-describedby", err.id);
      return false;
    }
    clearError(wrap);
    return true;
  }

  /* ---------- sections ---------- */

  function renderSections() {
    var modality = currentModality();
    el.accordion.innerHTML = "";
    if (!modality) {
      el.sectionSummary.textContent = "";
      return;
    }

    modality.sections.forEach(function (section, index) {
      var item = document.createElement("div");
      item.className = "acc-item";

      var head = document.createElement("button");
      head.type = "button";
      head.className = "acc-head";
      head.setAttribute("aria-expanded", index === 0 ? "true" : "false");
      head.setAttribute("aria-controls", "acc-" + section.id);

      var title = document.createElement("span");
      title.textContent = section.title;
      if (section.required) {
        var req = document.createElement("span");
        req.className = "req";
        req.textContent = "*";
        req.setAttribute("aria-label", "required section");
        title.appendChild(req);
      }

      var progress = document.createElement("span");
      progress.className = "progress";
      progress.setAttribute("data-progress", section.id);
      var bar = document.createElement("span");
      bar.className = "bar";
      var fill = document.createElement("i");
      bar.appendChild(fill);
      var count = document.createElement("span");
      count.textContent = "0/0";
      progress.appendChild(bar);
      progress.appendChild(count);

      var chev = document.createElement("span");
      chev.className = "chev";
      chev.textContent = "\u25B6";
      chev.setAttribute("aria-hidden", "true");

      head.appendChild(title);
      head.appendChild(progress);
      head.appendChild(chev);

      var body = document.createElement("div");
      body.className = "acc-body";
      body.id = "acc-" + section.id;
      body.hidden = index !== 0;

      head.addEventListener("click", function () {
        var open = head.getAttribute("aria-expanded") === "true";
        head.setAttribute("aria-expanded", String(!open));
        body.hidden = open;
      });

      if (section.intro) {
        var intro = document.createElement("p");
        intro.className = "small muted";
        intro.textContent = section.intro;
        body.appendChild(intro);
      }

      section.fields.forEach(function (field) {
        body.appendChild(renderField(field, section.id));
      });

      var narrativeWrap = document.createElement("div");
      narrativeWrap.className = "field";
      var nId = "f-" + section.id + "-narrative";
      var nLabel = document.createElement("label");
      nLabel.setAttribute("for", nId);
      nLabel.textContent = "Section narrative (optional)";
      var nArea = document.createElement("textarea");
      nArea.id = nId;
      nArea.rows = 4;
      nArea.placeholder = "Free-text prose for this section. The AI assistant writes here.";
      nArea.value = getAnswer(section.id, "narrative");
      nArea.addEventListener("input", function () {
        setAnswer(section.id, "narrative", nArea.value);
        renderPreviewIfVisible();
      });
      narrativeWrap.appendChild(nLabel);
      narrativeWrap.appendChild(nArea);
      body.appendChild(narrativeWrap);

      var aiRow = document.createElement("div");
      aiRow.className = "row row-end mt-1";
      var aiStatus = document.createElement("span");
      aiStatus.className = "small muted";
      aiStatus.setAttribute("role", "status");
      aiStatus.setAttribute("aria-live", "polite");
      var aiBtn = document.createElement("button");
      aiBtn.type = "button";
      aiBtn.className = "btn btn-sm";
      aiBtn.textContent = "Expand with AI";
      aiBtn.addEventListener("click", function () {
        expandSection(section, nArea, aiBtn, aiStatus);
      });
      aiRow.appendChild(aiStatus);
      aiRow.appendChild(aiBtn);
      body.appendChild(aiRow);

      item.appendChild(head);
      item.appendChild(body);
      el.accordion.appendChild(item);
    });

    updateSectionProgress();
  }

  function updateSectionProgress() {
    var modality = currentModality();
    if (!modality) return;
    modality.sections.forEach(function (section) {
      var holder = el.accordion.querySelector('[data-progress="' + section.id + '"]');
      if (!holder) return;
      var required = section.fields.filter(function (f) { return f.required; });
      var filled = required.filter(function (f) {
        return String(getAnswer(section.id, f.id)).trim() !== "";
      }).length;
      var pct = required.length ? Math.round((filled / required.length) * 100) : 100;
      holder.querySelector("i").style.width = pct + "%";
      holder.querySelector("span:last-child").textContent = filled + "/" + required.length;
    });
  }

  /* ---------- progress ---------- */

  function updateProgress() {
    var modality = currentModality();
    updateSectionProgress();
    if (!modality) {
      el.progressText.textContent = "0%";
      el.progressBar.style.width = "0%";
      el.progressDetail.textContent = "No modality selected.";
      return;
    }
    var required = [];
    modality.sections.forEach(function (s) {
      s.fields.forEach(function (f) {
        if (f.required) required.push({ section: s, field: f });
      });
    });
    var filled = required.filter(function (r) {
      return String(getAnswer(r.section.id, r.field.id)).trim() !== "";
    }).length;
    var pct = required.length ? Math.round((filled / required.length) * 100) : 100;
    el.progressText.textContent = pct + "%";
    el.progressBar.style.width = pct + "%";
    el.progressDetail.textContent =
      filled + " of " + required.length + " required fields complete for " + modality.label + ".";
    el.sectionSummary.textContent = modality.sections.length + " sections";
    updateValidationSummary();
  }

  function missingRequired() {
    var modality = currentModality();
    var out = [];
    if (!modality) return out;
    modality.sections.forEach(function (s) {
      s.fields.forEach(function (f) {
        if (f.required && String(getAnswer(s.id, f.id)).trim() === "") {
          out.push({ section: s, field: f });
        }
      });
    });
    return out;
  }

  function updateValidationSummary() {
    var missing = missingRequired();
    if (!missing.length) {
      el.validationSummary.hidden = true;
      el.validationSummary.textContent = "";
      return;
    }
    var names = missing.slice(0, 4).map(function (m) { return m.field.label; });
    el.validationSummary.hidden = false;
    el.validationSummary.textContent =
      missing.length +
      " required field" +
      (missing.length === 1 ? "" : "s") +
      " still empty (" +
      names.join(", ") +
      (missing.length > 4 ? ", \u2026" : "") +
      "). They will be exported as [TO BE COMPLETED].";
  }

  /* ---------- draft ---------- */

  function formatValue(field, raw) {
    if (raw == null) return "";
    if (Array.isArray(raw)) return raw.join(", ");
    return String(raw).trim();
  }

  function assembleDraft() {
    var modality = currentModality();
    if (!modality) return "";

    var lines = [];
    lines.push("# Preregistration Draft");
    lines.push("");
    lines.push("<!-- Generated by Biopsych Prereg Builder on " + new Date().toISOString() + " -->");
    lines.push("<!-- Modality: " + modality.label + " -->");
    lines.push("<!-- Template: " + modality.template + " -->");
    lines.push("<!-- Review every [TO BE COMPLETED] and [VERIFY: ...] marker before registering. -->");
    lines.push("");

    modality.sections.forEach(function (section) {
      lines.push("## " + section.title);
      lines.push("");
      lines.push("<!-- source: " + modality.template + " -->");
      lines.push("");

      section.fields.forEach(function (field) {
        var raw = getAnswer(section.id, field.id);
        var value = formatValue(field, raw);
        var isUncertain = Boolean(state.uncertain[key(section.id, field.id)]);

        if (value === "") {
          if (!field.required) return;
          value = "[TO BE COMPLETED]";
        } else if (isUncertain) {
          value = "[VERIFY: " + value + "]";
        }

        if (field.type === "list") {
          var items = value.split("\n").map(function (s) { return s.trim(); }).filter(Boolean);
          if (!items.length) {
            lines.push("**" + field.label + ":** [TO BE COMPLETED]");
          } else {
            lines.push("**" + field.label + ":**");
            items.forEach(function (item) { lines.push("- " + item); });
          }
        } else {
          lines.push("**" + field.label + ":** " + value);
        }
        lines.push("");
      });

      var narrative = getAnswer(section.id, "narrative");
      if (String(narrative).trim() !== "") {
        lines.push("<!-- narrative: review before use -->");
        lines.push("");
        lines.push(String(narrative).trim());
        lines.push("");
      }
    });

    lines.push("---");
    lines.push("");
    lines.push("_Generated locally in the browser. No data left this device._");
    lines.push("");
    return lines.join("\n");
  }

  function renderPreview() {
    var draft = assembleDraft();
    el.previewOut.textContent = draft || "Select a modality to generate a draft.";
    var missing = missingRequired().length;
    el.reviewStats.textContent = missing ? missing + " to complete" : "all required fields filled";
  }

  var previewTimer = null;
  function renderPreviewIfVisible() {
    if (state.step !== "review" && state.step !== "export") return;
    clearTimeout(previewTimer);
    previewTimer = setTimeout(renderPreview, 200);
  }

  /* ---------- export ---------- */

  function download() {
    var draft = assembleDraft();
    if (!draft) {
      el.exportStatus.textContent = "Select a modality first.";
      return;
    }
    var blob = new Blob([draft], { type: "text/markdown;charset=utf-8" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = "PREREGISTRATION_DRAFT.md";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
    el.exportStatus.textContent = "Downloaded PREREGISTRATION_DRAFT.md (" + draft.length + " characters).";
  }

  function copy() {
    var draft = assembleDraft();
    if (!draft) {
      el.exportStatus.textContent = "Select a modality first.";
      return;
    }
    function done() {
      el.exportStatus.textContent = "Copied " + draft.length + " characters to the clipboard.";
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(draft).then(done, function () {
        el.exportStatus.textContent = "Clipboard blocked by the browser. Use Download instead.";
      });
    } else {
      el.exportStatus.textContent = "Clipboard unavailable. Use Download instead.";
    }
  }

  el.btnDownload.addEventListener("click", download);
  el.btnCopy.addEventListener("click", copy);
  el.btnPrint.addEventListener("click", function () {
    renderPreview();
    window.print();
  });

  el.btnReset.addEventListener("click", function () {
    if (!window.confirm("Clear all answers for this browser? This cannot be undone.")) return;
    state.answers = {};
    state.uncertain = {};
    save();
    renderSections();
    updateProgress();
    renderPreview();
    el.exportStatus.textContent = "Answers cleared.";
  });

  /* ---------- groq ---------- */

  var limiter = window.PreregThrottle.createLimiter({
    storage: window.localStorage,
    onChange: renderMeter
  });

  var client = window.PreregGroq.createClient({
    getKey: function () { return getStoredKey(); },
    limiter: limiter,
    model: getStoredModel()
  });

  function getStoredKey() {
    try {
      return localStorage.getItem(KEY_STORE) || "";
    } catch (err) {
      return "";
    }
  }

  function getStoredModel() {
    try {
      return localStorage.getItem(MODEL_STORE) || window.PreregGroq.DEFAULT_MODEL;
    } catch (err) {
      return window.PreregGroq.DEFAULT_MODEL;
    }
  }

  function refreshKeyState() {
    var has = Boolean(getStoredKey());
    el.keyState.textContent = has ? "ready" : "off";
    el.keyState.className = "tag" + (has ? " tag-accent" : "");
    el.keyInput.value = "";
    el.keyInput.placeholder = has ? "key saved \u2014 enter a new one to replace" : "gsk_...";
  }

  el.btnSaveKey.addEventListener("click", function () {
    var value = el.keyInput.value.trim();
    if (!value) {
      el.keyStatus.textContent = "Enter a key first.";
      return;
    }
    if (!/^gsk_[A-Za-z0-9]{20,}$/.test(value)) {
      el.keyStatus.textContent = "That does not look like a Groq key (expected gsk_...).";
      return;
    }
    try {
      localStorage.setItem(KEY_STORE, value);
      el.keyStatus.textContent = "Key saved in this browser.";
    } catch (err) {
      el.keyStatus.textContent = "Could not save the key: storage is blocked.";
    }
    el.keyInput.value = "";
    refreshKeyState();
  });

  el.btnForgetKey.addEventListener("click", function () {
    try {
      localStorage.removeItem(KEY_STORE);
    } catch (err) {
      /* ignore */
    }
    el.keyStatus.textContent = "Key removed from this browser.";
    refreshKeyState();
  });

  el.modelSelect.addEventListener("change", function () {
    try {
      localStorage.setItem(MODEL_STORE, el.modelSelect.value);
    } catch (err) {
      /* ignore */
    }
    client = window.PreregGroq.createClient({
      getKey: function () { return getStoredKey(); },
      limiter: limiter,
      model: el.modelSelect.value
    });
  });

  function meterRow(label, value, limit) {
    var row = document.createElement("div");
    row.className = "meter-row";
    var l = document.createElement("span");
    l.className = "label";
    l.textContent = label;
    var v = document.createElement("span");
    v.className = "value";
    v.textContent = value.toLocaleString() + " / " + limit.toLocaleString();
    var bar = document.createElement("span");
    bar.className = "bar";
    var fill = document.createElement("i");
    var pct = limit ? Math.min(100, (value / limit) * 100) : 0;
    fill.style.width = pct + "%";
    if (pct >= 95) fill.className = "danger";
    else if (pct >= 75) fill.className = "warn";
    bar.appendChild(fill);
    row.appendChild(l);
    row.appendChild(v);
    row.appendChild(bar);
    return row;
  }

  function renderMeter(snap) {
    if (!el.quotaMeter) return;
    snap = snap || limiter.snapshot();
    el.quotaMeter.innerHTML = "";
    el.quotaMeter.appendChild(meterRow("Requests today", snap.requestsToday, snap.requestsTodayLimit));
    el.quotaMeter.appendChild(meterRow("Tokens today", snap.tokensToday, snap.tokensTodayLimit));
    el.quotaMeter.appendChild(meterRow("Requests this minute", snap.requestsThisMinute, snap.requestsPerMinuteLimit));
    el.quotaMeter.appendChild(meterRow("Tokens this minute", snap.tokensThisMinute, snap.tokensPerMinuteLimit));
  }

  function expandSection(section, target, button, status) {
    if (!getStoredKey()) {
      status.textContent = "Add a Groq key first.";
      return;
    }
    var modality = currentModality();
    var answers = {};
    section.fields.forEach(function (f) {
      answers[f.id] = getAnswer(section.id, f.id);
    });

    button.disabled = true;
    status.textContent = "Queued\u2026";

    client
      .expandSection(
        {
          sectionTitle: section.title,
          sectionIntro: section.intro,
          modalityLabel: modality.label,
          fields: section.fields,
          answers: answers
        },
        {
          onWait: function (ms) {
            status.textContent = "Waiting " + Math.ceil(ms / 1000) + "s for the rate limit\u2026";
          }
        }
      )
      .then(function (result) {
        var existing = target.value.trim();
        target.value = existing ? existing + "\n\n" + result.text : result.text;
        setAnswer(section.id, "narrative", target.value);
        status.textContent = "Drafted with " + result.model + ". Review before use.";
        renderPreviewIfVisible();
      })
      .catch(function (err) {
        status.textContent = err && err.message ? err.message : "Request failed.";
      })
      .then(function () {
        button.disabled = false;
        renderMeter();
      });
  }

  /* ---------- init ---------- */

  load();
  renderModalities();
  renderSections();
  updateProgress();
  refreshKeyState();
  el.modelSelect.value = getStoredModel();
  renderMeter();

  var params = new URLSearchParams(window.location.search);
  var requested = params.get("modality");
  if (requested && schema.modalities.some(function (m) { return m.id === requested; })) {
    state.modality = requested;
    save();
    renderModalities();
    renderSections();
    updateProgress();
    setStep("sections");
  } else if (state.modality && currentModality()) {
    setStep("sections");
  } else {
    setStep("modality");
  }
})();
