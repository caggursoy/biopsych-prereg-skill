(function () {
  "use strict";

  function escapeHtml(text) {
    return String(text)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function inline(text) {
    var slots = [];
    var out = escapeHtml(text);

    out = out.replace(/`([^`]+)`/g, function (_, code) {
      slots.push("<code>" + code + "</code>");
      return "\u0000" + (slots.length - 1) + "\u0000";
    });

    out = out.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, function (_, label, href) {
      var safe = /^(https?:|mailto:|#|\/|\.)/i.test(href) ? href : "#";
      var external = /^https?:/i.test(safe);
      return (
        '<a href="' +
        safe +
        '"' +
        (external ? ' rel="noopener noreferrer" target="_blank"' : "") +
        ">" +
        label +
        "</a>"
      );
    });

    out = out.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
    out = out.replace(/(^|[^*])\*([^*\n]+)\*/g, "$1<em>$2</em>");
    out = out.replace(/\u0000(\d+)\u0000/g, function (_, i) {
      return slots[Number(i)];
    });

    return out;
  }

  function slug(text) {
    return String(text)
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");
  }

  function render(markdown, options) {
    options = options || {};
    var lines = String(markdown).replace(/\r\n/g, "\n").split("\n");
    var html = [];
    var i = 0;
    var usedSlugs = Object.create(null);

    function uniqueSlug(text) {
      var base = slug(text) || "section";
      var id = base;
      var n = 2;
      while (usedSlugs[id]) {
        id = base + "-" + n++;
      }
      usedSlugs[id] = true;
      return id;
    }

    while (i < lines.length) {
      var line = lines[i];

      if (/^\s*$/.test(line)) {
        i++;
        continue;
      }

      var fence = line.match(/^```(\w*)\s*$/);
      if (fence) {
        var lang = fence[1];
        var buf = [];
        i++;
        while (i < lines.length && !/^```\s*$/.test(lines[i])) {
          buf.push(lines[i]);
          i++;
        }
        i++;
        html.push(
          "<pre><code" +
            (lang ? ' class="language-' + escapeHtml(lang) + '"' : "") +
            ">" +
            escapeHtml(buf.join("\n")) +
            "</code></pre>"
        );
        continue;
      }

      var heading = line.match(/^(#{1,4})\s+(.*)$/);
      if (heading) {
        var level = heading[1].length;
        if (options.demoteH1 && level === 1) level = 2;
        var text = heading[2].trim();
        var id = uniqueSlug(text);
        html.push(
          "<h" +
            level +
            ' id="' +
            id +
            '">' +
            inline(text) +
            "</h" +
            level +
            ">"
        );
        i++;
        continue;
      }

      if (/^\s*(---|\*\*\*|___)\s*$/.test(line)) {
        html.push("<hr>");
        i++;
        continue;
      }

      if (/^\s*>\s?/.test(line)) {
        var quote = [];
        while (i < lines.length && /^\s*>\s?/.test(lines[i])) {
          quote.push(lines[i].replace(/^\s*>\s?/, ""));
          i++;
        }
        html.push("<blockquote>" + inline(quote.join(" ")) + "</blockquote>");
        continue;
      }

      if (/^\s*\|.*\|\s*$/.test(line) && i + 1 < lines.length && /^\s*\|[\s:|-]+\|\s*$/.test(lines[i + 1])) {
        var header = splitRow(line);
        i += 2;
        var rows = [];
        while (i < lines.length && /^\s*\|.*\|\s*$/.test(lines[i])) {
          rows.push(splitRow(lines[i]));
          i++;
        }
        var table = ["<table><thead><tr>"];
        header.forEach(function (cell) {
          table.push("<th>" + inline(cell) + "</th>");
        });
        table.push("</tr></thead><tbody>");
        rows.forEach(function (row) {
          table.push("<tr>");
          row.forEach(function (cell) {
            table.push("<td>" + inline(cell) + "</td>");
          });
          table.push("</tr>");
        });
        table.push("</tbody></table>");
        html.push(table.join(""));
        continue;
      }

      if (/^\s*[-*+]\s+/.test(line)) {
        var items = [];
        while (i < lines.length && /^\s*[-*+]\s+/.test(lines[i])) {
          items.push(lines[i].replace(/^\s*[-*+]\s+/, ""));
          i++;
        }
        html.push(
          "<ul>" +
            items
              .map(function (item) {
                return "<li>" + inline(item) + "</li>";
              })
              .join("") +
            "</ul>"
        );
        continue;
      }

      if (/^\s*\d+[.)]\s+/.test(line)) {
        var oitems = [];
        while (i < lines.length && /^\s*\d+[.)]\s+/.test(lines[i])) {
          oitems.push(lines[i].replace(/^\s*\d+[.)]\s+/, ""));
          i++;
        }
        html.push(
          "<ol>" +
            oitems
              .map(function (item) {
                return "<li>" + inline(item) + "</li>";
              })
              .join("") +
            "</ol>"
        );
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
        !/^\s*>\s?/.test(lines[i]) &&
        !/^\s*\|.*\|\s*$/.test(lines[i])
      ) {
        para.push(lines[i]);
        i++;
      }
      if (para.length) html.push("<p>" + inline(para.join(" ")) + "</p>");
    }

    return html.join("\n");
  }

  function splitRow(line) {
    return line
      .trim()
      .replace(/^\|/, "")
      .replace(/\|$/, "")
      .split("|")
      .map(function (cell) {
        return cell.trim();
      });
  }

  window.MiniMarkdown = { render: render, escapeHtml: escapeHtml, slug: slug };
})();
