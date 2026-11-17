(function () {
  "use strict";

  var library = window.PREREG_LIBRARY;
  var md = window.MiniMarkdown;
  if (!library || !md) return;

  var docBody = document.getElementById("docBody");
  var docTitle = document.getElementById("docTitle");
  var docSource = document.getElementById("docSource");
  var modalityList = document.getElementById("modalityList");
  var headingList = document.getElementById("headingList");
  var btnTemplate = document.getElementById("viewTemplate");
  var btnSkill = document.getElementById("viewSkill");

  var params = new URLSearchParams(window.location.search);
  var currentId = params.get("doc") || library.modalities[0].id;
  var currentView = params.get("view") === "skill" ? "skill" : "template";

  function findModality(id) {
    return library.modalities.filter(function (m) { return m.id === id; })[0] || library.modalities[0];
  }

  function renderModalityList() {
    modalityList.innerHTML = "";
    library.modalities.forEach(function (m) {
      var li = document.createElement("li");
      var a = document.createElement("a");
      a.href = "?doc=" + encodeURIComponent(m.id) + "&view=" + currentView;
      a.textContent = m.label;
      if (m.id === currentId) {
        a.className = "is-active";
        a.setAttribute("aria-current", "true");
      }
      li.appendChild(a);
      modalityList.appendChild(li);
    });
  }

  function renderHeadings() {
    headingList.innerHTML = "";
    var headings = docBody.querySelectorAll("h2, h3");
    if (!headings.length) {
      var li = document.createElement("li");
      li.innerHTML = '<span class="small muted" style="padding:0 0.45rem">No headings</span>';
      headingList.appendChild(li);
      return;
    }
    Array.prototype.forEach.call(headings, function (h) {
      var li = document.createElement("li");
      var a = document.createElement("a");
      a.href = "#" + h.id;
      a.textContent = h.textContent;
      if (h.tagName === "H3") a.className = "lvl3";
      li.appendChild(a);
      headingList.appendChild(li);
    });
  }

  function render() {
    var modality = findModality(currentId);
    var hasSkill = Boolean(modality.skillMarkdown);
    var source = currentView === "skill" && hasSkill ? modality.skillMarkdown : modality.templateMarkdown;

    docTitle.textContent = currentView === "skill" && hasSkill ? modality.label + " skill" : modality.templateTitle;
    docSource.textContent =
      (currentView === "skill" && hasSkill ? modality.skill : modality.template) +
      " \u00b7 rendered from Markdown";

    docBody.innerHTML = md.render(source.replace(/^\s*#\s+[^\n]*\n/, ""), { demoteH1: true });

    btnTemplate.setAttribute("aria-pressed", String(currentView === "template"));
    btnSkill.setAttribute("aria-pressed", String(currentView === "skill"));
    btnSkill.disabled = !hasSkill;

    renderModalityList();
    renderHeadings();

    document.title = docTitle.textContent + " \u00b7 Biopsych Prereg Builder";
  }

  function setView(view) {
    currentView = view;
    var url = new URL(window.location.href);
    url.searchParams.set("doc", currentId);
    url.searchParams.set("view", view);
    window.history.replaceState({}, "", url);
    render();
  }

  btnTemplate.addEventListener("click", function () { setView("template"); });
  btnSkill.addEventListener("click", function () { setView("skill"); });

  render();
})();
