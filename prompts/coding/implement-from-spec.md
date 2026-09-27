---
title: "Implement from Spec"
category: "coding"
filename: "implement-from-spec.md"
description: "Implement a requirement while matching the conventions and boundaries of the existing codebase."
author: "Prompt Bricks contributors"
---

# Brick: Implement From Spec

**Category:** coding
**Purpose:** Implement a function/module/endpoint from a spec or acceptance criteria, matching existing code conventions.

## Prompt

````
Implement the following requirement in {{language}}, matching the
conventions of the existing codebase context provided below.

Requirement / acceptance criteria:
"""
{{spec}}
"""

Existing code / conventions to match (style, error handling, libraries
already in use):
```{{language}}
{{codebase_context}}
```

Rules:
- Match existing naming, formatting, and error-handling patterns
- Do not introduce a new library or pattern if an equivalent already
  exists in the codebase context
- Include input validation where the spec implies it
- After the code, list any assumptions you made
````

## Variables

- `{{language}}`: programming language / framework
- `{{spec}}`: requirement, ticket, or acceptance criteria to implement
- `{{codebase_context}}`: representative existing code to match conventions against

## Example composition

```
[ Brick: Acceptance Criteria (Gherkin) ] + [ Brick: Implement From Spec ] + [ Brick: Unit Test Generator ]
```
