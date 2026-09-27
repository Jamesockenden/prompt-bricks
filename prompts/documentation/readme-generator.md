---
title: "README Generator"
category: "documentation"
filename: "readme-generator.md"
description: "Create a complete, accurate README from project context and intended audience."
author: "Prompt Bricks contributors"
---

# Brick: README Generator

**Category:** documentation
**Purpose:** Generate a clear, complete README for a project or module from its code and a short description.

## Prompt

```
Write a README.md for this project using the following structure:

1. One-line description
2. What it does (2-4 sentences)
3. Installation
4. Usage (with a minimal working example)
5. Configuration (env vars / options, if any are present in the code)
6. Project structure (only if non-trivial)
7. Contributing (one short paragraph, only if requested)
8. License (only if given)

Only document what is actually present in the code/context below — do
not invent features, flags, or setup steps that aren't shown.

Project description: {{description}}

Relevant code / file listing:
"""
{{code_context}}
"""

Include a "Contributing" section: {{include_contributing}}
License: {{license}}
```

## Variables

- `{{description}}`: short description of the project's purpose
- `{{code_context}}`: source files, entry points, or config relevant to usage
- `{{include_contributing}}`: yes/no
- `{{license}}`: license name, or "none"

## Example composition

```
[ Brick: README Generator ] + [ Brick: Release Notes ]
```
