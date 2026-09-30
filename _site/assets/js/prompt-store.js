(() => {
  document.querySelectorAll("[data-copy-prompt]").forEach((button) => {
    button.addEventListener("click", async () => {
      const textarea = document.getElementById(button.dataset.copyPrompt);
      const status = button.parentElement?.querySelector('[role="status"]');
      if (!(textarea instanceof HTMLTextAreaElement) || !status) {
        return;
      }

      status.textContent = "";
      try {
        await navigator.clipboard.writeText(textarea.value);
        status.textContent = "Prompt copied to clipboard.";
      } catch {
        textarea.focus();
        textarea.select();
        status.textContent = "Clipboard access is unavailable; the prompt is selected for copying.";
      }
    });
  });
})();
