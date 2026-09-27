---
title: "Edge Case Finder"
category: "testing"
filename: "edge-case-finder.md"
description: "Find missing edge cases and failure scenarios in a specification or implementation."
author: "AI Generated"
---

# Brick: Edge Case Finder

**Category:** testing
**Purpose:** Identify edge cases and failure scenarios a spec or implementation might be missing, before they become bugs.

## Prompt

```
Analyse the following feature/function for edge cases that are easy to
miss. Think about:

- Boundary values (empty, zero, negative, max size, off-by-one)
- Unexpected input types or malformed data
- Concurrency / ordering issues (if applicable)
- Partial failure (network drop mid-operation, timeout, retry)
- State/permission edge cases (first-time user, deleted resource,
  race between two actions)
- Locale/timezone/encoding quirks (if relevant)

For each edge case, state: the scenario, why it's risky, and what the
expected/desired behaviour should be. Do not write test code — this is
an analysis pass, to feed into test writing separately.

Feature / function description or code:
"""
{{target}}
"""
```

## Variables

- `{{target}}`: the spec, function, or feature description to analyse

## Example composition

```
[ Brick: Edge Case Finder ] + [ Brick: Unit Test Generator ]
```
