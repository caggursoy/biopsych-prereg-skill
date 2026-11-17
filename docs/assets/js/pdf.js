(function (root) {
  "use strict";

  var PAGE_W = 595.28;
  var PAGE_H = 841.89;
  var MARGIN = 56;
  var BOTTOM = 60;
  var CONTENT_W = PAGE_W - MARGIN * 2;

  var WIDTH_FACTOR = { F1: 0.5, F2: 0.53, F3: 0.5, F4: 0.6 };

  var WINANSI = {
    "\u2014": "\\227",
    "\u2013": "\\226",
    "\u2022": "\\225",
    "\u2018": "\\222",
    "\u2019": "\\222",
    "\u201C": "\\223",
    "\u201D": "\\224",
    "\u2026": "\\205"
  };

  function esc(text) {
    return String(text)
      .replace(/\\/g, "\\\\")
      .replace(/\(/g, "\\(")
      .replace(/\)/g, "\\)")
      .replace(/[\u2014\u2013\u2022\u2018\u2019\u201C\u201D\u2026]/g, function (ch) {
        return WINANSI[ch];
      })
      .replace(/[^\x20-\x7E]/g, "?");
  }

  function textWidth(text, font, size) {
    return text.length * size * (WIDTH_FACTOR[font] || 0.5);
  }

  function wrap(text, font, size, maxWidth) {
    var words = String(text).split(/\s+/).filter(Boolean);
    if (!words.length) return [""];
    var lines = [];
    var current = "";
    for (var i = 0; i < words.length; i++) {
      var candidate = current ? current + " " + words[i] : words[i];
      if (textWidth(candidate, font, size) > maxWidth && current) {
        lines.push(current);
        current = words[i];
      } else {
        current = candidate;
      }
    }
    if (current) lines.push(current);
    return lines;
  }

  function parseBlocks(markdown) {
    var lines = String(markdown).replace(/\r\n/g, "\n").split("\n");
    var blocks = [];
    var i = 0;

    while (i < lines.length) {
      var line = lines[i];

      if (/^\s*$/.test(line)) {
        i++;
        continue;
      }

      if (/^```/.test(line)) {
        var code = [];
        i++;
        while (i < lines.length && !/^```\s*$/.test(lines[i])) {
          code.push(lines[i]);
          i++;
        }
        i++;
        blocks.push({ type: "code", text: code.join("\n") });
        continue;
      }

      var heading = line.match(/^(#{1,4})\s+(.*)$/);
      if (heading) {
        blocks.push({ type: "heading", level: heading[1].length, text: heading[2].trim() });
        i++;
        continue;
      }

      if (/^\s*(---|\*\*\*|___)\s*$/.test(line)) {
        blocks.push({ type: "rule" });
        i++;
        continue;
      }

      if (/^\s*>\s?/.test(line)) {
        var quote = [];
        while (i < lines.length && /^\s*>\s?/.test(lines[i])) {
          quote.push(lines[i].replace(/^\s*>\s?/, ""));
          i++;
        }
        blocks.push({ type: "quote", text: quote.join(" ") });
        continue;
      }

      if (/^\s*[-*+]\s+/.test(line)) {
        var items = [];
        while (i < lines.length && /^\s*[-*+]\s+/.test(lines[i])) {
          items.push(lines[i].replace(/^\s*[-*+]\s+/, ""));
          i++;
        }
        blocks.push({ type: "list", ordered: false, items: items });
        continue;
      }

      if (/^\s*\d+[.)]\s+/.test(line)) {
        var oitems = [];
        while (i < lines.length && /^\s*\d+[.)]\s+/.test(lines[i])) {
          oitems.push(lines[i].replace(/^\s*\d+[.)]\s+/, ""));
          i++;
        }
        blocks.push({ type: "list", ordered: true, items: oitems });
        continue;
      }

      var para = [];
      while (
        i < lines.length &&
        !/^\s*$/.test(lines[i]) &&
        !/^(#{1,4})\s+/.test(lines[i]) &&
        !/^```/.test(lines[i]) &&
        !/^\s*[-*+]\s+/.test(lines[i]) &&
        !/^\s*\d+[.)]\s+/.test(lines[i]) &&
        !/^\s*>\s?/.test(lines[i])
      ) {
        para.push(lines[i]);
        i++;
      }
      if (para.length) blocks.push({ type: "para", text: para.join(" ") });
    }

    return blocks;
  }

  function stripInline(text) {
    return String(text)
      .replace(/`([^`]+)`/g, "$1")
      .replace(/\*\*([^*]+)\*\*/g, "$1")
      .replace(/(^|[^*])\*([^*\n]+)\*/g, "$1$2")
      .replace(/_([^_\n]+)_/g, "$1")
      .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, "$1 ($2)")
      .replace(/<!--[\s\S]*?-->/g, "")
      .trim();
  }

  function layout(blocks, options) {
    var pages = [];
    var ops = [];
    var y = PAGE_H - MARGIN;

    function newPage() {
      if (ops.length) pages.push(ops);
      ops = [];
      y = PAGE_H - MARGIN;
    }

    function ensure(space) {
      if (y - space < BOTTOM) newPage();
    }

    function draw(text, font, size, x, indent) {
      ops.push(
        "BT /" + font + " " + size + " Tf 1 0 0 1 " + (x + (indent || 0)).toFixed(2) + " " + y.toFixed(2) + " Tm (" + esc(text) + ") Tj ET"
      );
    }

    blocks.forEach(function (block) {
      if (block.type === "heading") {
        var size = block.level === 1 ? 17 : block.level === 2 ? 13.5 : 11.5;
        var lead = size * 1.35;
        ensure(lead * 2.2);
        y -= lead * 0.55;
        var hlines = wrap(stripInline(block.text), "F2", size, CONTENT_W);
        hlines.forEach(function (line) {
          ensure(lead);
          draw(line, "F2", size, MARGIN, 0);
          y -= lead;
        });
        y -= lead * 0.25;
        return;
      }

      if (block.type === "rule") {
        ensure(14);
        y -= 6;
        ops.push(
          "0.75 w 0.6 0.6 0.6 RG " + MARGIN + " " + y.toFixed(2) + " m " + (PAGE_W - MARGIN) + " " + y.toFixed(2) + " l S"
        );
        y -= 8;
        return;
      }

      if (block.type === "code") {
        var codeLines = block.text.split("\n");
        codeLines.forEach(function (line) {
          ensure(12);
          draw(line.slice(0, 110), "F4", 8.5, MARGIN, 6);
          y -= 11;
        });
        y -= 4;
        return;
      }

      if (block.type === "list") {
        block.items.forEach(function (item, index) {
          var marker = block.ordered ? index + 1 + ". " : "\u2022 ";
          var lines = wrap(stripInline(item), "F1", 10.5, CONTENT_W - 16);
          lines.forEach(function (line, li) {
            ensure(14);
            if (li === 0) draw(marker, "F1", 10.5, MARGIN, 0);
            draw(line, "F1", 10.5, MARGIN, 16);
            y -= 14;
          });
        });
        y -= 4;
        return;
      }

      if (block.type === "quote") {
        var qlines = wrap(stripInline(block.text), "F3", 10.5, CONTENT_W - 14);
        qlines.forEach(function (line) {
          ensure(14);
          draw(line, "F3", 10.5, MARGIN, 14);
          y -= 14;
        });
        y -= 4;
        return;
      }

      var plines = wrap(stripInline(block.text), "F1", 10.5, CONTENT_W);
      plines.forEach(function (line) {
        ensure(14);
        draw(line, "F1", 10.5, MARGIN, 0);
        y -= 14;
      });
      y -= 5;
    });

    if (ops.length) pages.push(ops);
    if (!pages.length) pages.push([]);
    return pages;
  }

  function buildPdf(pages, title) {
    var objects = [];
    function add(body) {
      objects.push(body);
      return objects.length;
    }

    var catalogId = add(null);
    var pagesId = add(null);
    var fontRegular = add("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>");
    var fontBold = add("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>");
    var fontItalic = add("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Oblique /Encoding /WinAnsiEncoding >>");
    var fontMono = add("<< /Type /Font /Subtype /Type1 /BaseFont /Courier /Encoding /WinAnsiEncoding >>");

    var pageIds = [];
    pages.forEach(function (ops, index) {
      var footer =
        "BT /F1 8 Tf 1 0 0 1 " +
        MARGIN +
        " 34 Tm (" +
        esc(title || "Preregistration Draft") +
        ") Tj ET\n" +
        "BT /F1 8 Tf 1 0 0 1 " +
        (PAGE_W - MARGIN - 40) +
        " 34 Tm (Page " +
        (index + 1) +
        " of " +
        pages.length +
        ") Tj ET";
      var stream = ops.join("\n") + "\n" + footer;
      var contentId = add("<< /Length " + stream.length + " >>\nstream\n" + stream + "\nendstream");
      var pageId = add(
        "<< /Type /Page /Parent " +
          pagesId +
          " 0 R /MediaBox [0 0 " +
          PAGE_W +
          " " +
          PAGE_H +
          "] /Resources << /Font << /F1 " +
          fontRegular +
          " 0 R /F2 " +
          fontBold +
          " 0 R /F3 " +
          fontItalic +
          " 0 R /F4 " +
          fontMono +
          " 0 R >> >> /Contents " +
          contentId +
          " 0 R >>"
      );
      pageIds.push(pageId);
    });

    objects[catalogId - 1] = "<< /Type /Catalog /Pages " + pagesId + " 0 R >>";
    objects[pagesId - 1] =
      "<< /Type /Pages /Count " + pageIds.length + " /Kids [" + pageIds.map(function (id) { return id + " 0 R"; }).join(" ") + "] >>";

    var out = "%PDF-1.4\n";
    var offsets = [];
    objects.forEach(function (body, index) {
      offsets.push(out.length);
      out += index + 1 + " 0 obj\n" + body + "\nendobj\n";
    });

    var xrefStart = out.length;
    out += "xref\n0 " + (objects.length + 1) + "\n";
    out += "0000000000 65535 f \n";
    offsets.forEach(function (offset) {
      out += String(offset).padStart(10, "0") + " 00000 n \n";
    });
    out += "trailer\n<< /Size " + (objects.length + 1) + " /Root " + catalogId + " 0 R >>\n";
    out += "startxref\n" + xrefStart + "\n%%EOF\n";

    return out;
  }

  function fromMarkdown(markdown, options) {
    options = options || {};
    var blocks = parseBlocks(markdown);
    var pages = layout(blocks, options);
    return buildPdf(pages, options.title);
  }

  root.PreregPdf = { fromMarkdown: fromMarkdown, parseBlocks: parseBlocks };
})(typeof window !== "undefined" ? window : globalThis);
