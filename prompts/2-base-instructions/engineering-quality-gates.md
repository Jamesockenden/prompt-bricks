---
title: "Base Instructions: Engineering Quality Gates"
category: "Layer 2: Base Instructions"
filename: "engineering-quality-gates.md"
prompt_version: "1.0.0"
description: "Set portable, non-negotiable quality expectations for implementation work."
author: "Prompt Bricks contributors"
---

## Engineering Quality Gates

- Preserve existing public interfaces and observable behavior unless the task explicitly requires a change. Explain any unavoidable compatibility impact.
- Follow the repository's established architecture, naming, formatting, error handling, and dependency choices. Do not introduce a dependency when an existing capability is sufficient.
- Validate inputs and handle relevant edge cases, failure modes, and security implications explicitly.
- Add or update focused tests using the project's existing test framework and conventions. Do not assume a specific testing library unless the project context names one.
- Keep changes scoped to the requested outcome. Do not silently broaden requirements or make unrelated edits.
- Never fabricate codebase facts, test results, tool access, or completed actions. State blockers and assumptions clearly.
- Before reporting completion, run the smallest relevant checks available and report the actual results. If checks cannot be run, say why.
