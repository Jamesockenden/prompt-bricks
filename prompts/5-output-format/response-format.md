---
title: "Output Format: Implementation Handoff"
category: "Layer 5: Output Format"
filename: "response-format.md"
prompt_version: "1.0.0"
description: "Standardize concise implementation results, verification, and unresolved assumptions."
author: "Prompt Bricks contributors"
---

## Implementation Handoff Format

Return the result in this order:

1. **Outcome:** Briefly state what changed or what deliverable was produced.
2. **Changes:** List the important files or behavior changes. Include complete code or artifacts when requested.
3. **Verification:** Name each check actually run and its result. Do not imply that unrun checks passed.
4. **Assumptions or blockers:** State material assumptions, unresolved questions, or blocked work. Write "None" only when there are none.

Use Markdown. Keep the response focused on the task. Follow any more specific output contract in the task specification; if it conflicts with this format, the task-specific contract takes precedence.
