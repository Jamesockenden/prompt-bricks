---
title: "Root Cause Analysis"
category: "debugging"
filename: "root-cause-analysis.md"
description: "Diagnose a defect from symptoms and evidence before proposing a targeted fix."
author: "Prompt Bricks contributors"
---

# Brick: Root Cause Analysis

**Category:** debugging
**Purpose:** Systematically diagnose a bug from symptoms, logs, and code, rather than jumping to the first plausible fix.

## Prompt

````
Diagnose the root cause of the bug described below. Work through it
systematically:

1. Restate the observed symptom vs. expected behaviour
2. List the plausible causes, ranked by likelihood, with the reasoning
   for each
3. For the most likely cause(s), point to the specific line(s) of code
   or log evidence that support it
4. Propose a fix for the root cause (not just a patch for the symptom)
5. Note any other latent bugs you noticed while investigating, even if
   unrelated to this issue

Do not propose a fix before completing steps 1-3 — if the evidence is
insufficient to be confident, say what additional log/data you'd need
instead of guessing.

Bug report / symptom:
"""
{{bug_report}}
"""

Relevant logs:
"""
{{logs}}
"""

Relevant code:
```{{language}}
{{code}}
```
````

## Variables

- `{{bug_report}}`: description of the observed vs expected behaviour
- `{{logs}}`: relevant log output, stack traces, error messages
- `{{language}}`: programming language
- `{{code}}`: the code suspected to be involved

## Example composition

```
[ Brick: Root Cause Analysis ] + [ Brick: Refactor for Readability ] + [ Brick: Unit Test Generator ]
```
