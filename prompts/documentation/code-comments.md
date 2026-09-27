---
title: "Inline Documentation"
category: "documentation"
filename: "code-comments.md"
description: "Add useful comments and docstrings that explain intent without changing behavior."
author: "Prompt Bricks contributors"
---

# Brick: Inline Documentation

**Category:** documentation
**Purpose:** Add docstrings/comments to existing code without changing behaviour, focused on explaining intent rather than restating the obvious.

## Prompt

````
Add documentation to the code below in {{doc_style}} style.

Rules:
- Document every public function/class: purpose, parameters, return
  value, exceptions raised
- Add inline comments only where the "why" isn't obvious from the code
  itself (business rule, non-obvious workaround, perf tradeoff) — do not
  restate what the code already says clearly
- Do not change any logic or formatting beyond adding comments/docstrings
- If you find a function whose behaviour is unclear even to you, add a
  `# TODO: confirm intent` comment instead of guessing

Doc style: {{doc_style}} (e.g. JSDoc, Google-style Python docstrings,
Javadoc, XML doc comments)

Code:
```{{language}}
{{source_code}}
```
````

## Variables

- `{{doc_style}}`: documentation convention to follow
- `{{language}}`: programming language
- `{{source_code}}`: the code to document

## Example composition

```
[ Brick: Refactor for Readability ] + [ Brick: Inline Documentation ]
```
