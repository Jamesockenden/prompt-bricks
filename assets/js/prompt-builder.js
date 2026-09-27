(() => {
  const checkboxes = Array.from(document.querySelectorAll("[data-prompt-url]"));
  const buildButton = document.getElementById("build-prompt");
  const copyButton = document.getElementById("copy-prompt");
  const output = document.getElementById("combined-prompt");
  const status = document.getElementById("builder-status");
  const tokenCount = document.getElementById("token-count");
  const categoryFilter = document.getElementById("category-filter");
  const brickSearch = document.getElementById("brick-search");
  const brickResults = document.getElementById("brick-results");
  const noBricksFound = document.getElementById("no-bricks-found");

  if (!buildButton || !copyButton || !output || !status || !tokenCount) {
    return;
  }

  function filterBricks() {
    if (!categoryFilter || !brickSearch || !brickResults || !noBricksFound) {
      return;
    }

    const category = categoryFilter.value.trim().toLowerCase();
    const searchTerms = brickSearch.value.trim().toLowerCase().split(/\s+/).filter(Boolean);
    let visibleCount = 0;

    checkboxes.forEach((checkbox) => {
      const card = checkbox.closest(".brick-card");
      if (!card) {
        return;
      }

      const matchesCategory = !category || card.dataset.promptCategory.toLowerCase() === category;
      const searchableText = card.dataset.promptSearch.toLowerCase();
      const matchesSearch = searchTerms.every((term) => searchableText.includes(term));
      card.hidden = !matchesCategory || !matchesSearch;
      visibleCount += card.hidden ? 0 : 1;
    });

    brickResults.textContent = `Showing ${visibleCount} of ${checkboxes.length} prompt bricks.`;
    noBricksFound.hidden = visibleCount !== 0;
  }

  categoryFilter?.addEventListener("change", filterBricks);
  brickSearch?.addEventListener("input", filterBricks);
  filterBricks();

  function estimateTokenCount(text) {
    return Math.ceil([...text].length / 4);
  }

  function renderMarkdown(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      return node.nodeValue;
    }
    if (node.nodeType !== Node.ELEMENT_NODE) {
      return "";
    }

    const element = node;
    const content = Array.from(element.childNodes, renderMarkdown).join("");
    const text = content.trim();

    switch (element.tagName) {
      case "H1":
      case "H2":
      case "H3":
      case "H4":
      case "H5":
      case "H6":
        return `${"#".repeat(Number(element.tagName[1]))} ${text}\n\n`;
      case "P":
        return `${text}\n\n`;
      case "UL":
      case "OL": {
        const items = Array.from(element.children)
          .filter((child) => child.tagName === "LI")
          .map((item, index) => {
            const itemContent = Array.from(item.childNodes, renderMarkdown).join("").trim();
            const prefix = element.tagName === "OL" ? `${index + 1}. ` : "- ";
            return `${prefix}${itemContent.replace(/\n/g, "\n  ")}`;
          });
        return `${items.join("\n")}\n\n`;
      }
      case "PRE": {
        const code = element.querySelector("code");
        const language = code?.className.match(/language-([\w+-]+)/)?.[1] ?? "";
        return `\`\`\`${language}\n${(code ?? element).textContent.trim()}\n\`\`\`\n\n`;
      }
      case "CODE":
        return element.parentElement?.tagName === "PRE" ? content : `\`${content}\``;
      case "STRONG":
      case "B":
        return `**${content}**`;
      case "EM":
      case "I":
        return `*${content}*`;
      case "BR":
        return "\n";
      case "HR":
        return "\n---\n\n";
      case "BLOCKQUOTE":
        return `${text.split("\n").map((line) => `> ${line}`).join("\n")}\n\n`;
      case "A": {
        const href = element.getAttribute("href");
        return href ? `[${content}](${href})` : content;
      }
      default:
        return content;
    }
  }

  buildButton.addEventListener("click", async () => {
    const selected = checkboxes.filter((checkbox) => checkbox.checked);
    status.textContent = "";

    if (selected.length === 0) {
      status.textContent = "Select at least one prompt brick.";
      return;
    }

    buildButton.disabled = true;
    copyButton.disabled = true;
    status.textContent = "Building prompt...";

    try {
      const sections = await Promise.all(selected.map(async (checkbox) => {
        const response = await fetch(checkbox.dataset.promptUrl);
        if (!response.ok) {
          throw new Error(`Could not load "${checkbox.dataset.promptTitle}" (${response.status}).`);
        }

        const document = new DOMParser().parseFromString(await response.text(), "text/html");
        const prompt = document.querySelector(".prompt-content");
        if (!prompt) {
          throw new Error(`Prompt content was missing for "${checkbox.dataset.promptTitle}".`);
        }

        const promptHeading = Array.from(prompt.querySelectorAll("h2"))
          .find((heading) => heading.textContent.trim().toLowerCase() === "prompt");
        if (promptHeading) {
          const sections = [];
          let section = promptHeading.nextElementSibling;
          while (section && !/^H[1-2]$/.test(section.tagName)) {
            sections.push(section.tagName === "PRE" ? `${section.textContent.trim()}\n\n` : renderMarkdown(section));
            section = section.nextElementSibling;
          }
          return sections.join("");
        }

        return renderMarkdown(prompt);
      }));

      output.value = sections.map((section) => section.trim()).filter(Boolean).join("\n\n---\n\n");
      tokenCount.firstChild.textContent = `Estimated token count: ${estimateTokenCount(output.value)} `;
      copyButton.disabled = false;
      status.textContent = `${selected.length} prompt brick${selected.length === 1 ? "" : "s"} combined.`;
    } catch (error) {
      status.textContent = error instanceof Error ? error.message : "Unable to build the combined prompt.";
    } finally {
      buildButton.disabled = false;
    }
  });

  copyButton.addEventListener("click", async () => {
    status.textContent = "";
    try {
      await navigator.clipboard.writeText(output.value);
      status.textContent = "Prompt copied to clipboard.";
    } catch {
      output.focus();
      output.select();
      status.textContent = "Clipboard access is unavailable; the prompt is selected for copying.";
    }
  });
})();
