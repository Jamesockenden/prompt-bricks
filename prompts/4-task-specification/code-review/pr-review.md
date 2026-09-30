---
title: "Pull Request Review"
category: "Layer 4: Task Specification"
filename: "pr-review.md"
prompt_version: "1.0.0"
description: "Review a change for correctness, design, maintainability, and actionable issues."
author: "Prompt Bricks contributors"
---

# Brick: PR Review

**Category:** code-review
**Purpose:** Perform a structured pull request review covering correctness, design, and maintainability.

## Prompt

````
Review the following pull request diff as a senior engineer would.

For each issue you find, give:
- File and line/area
- Severity (Blocking / Should fix / Nit)
- The issue, in one or two sentences
- A concrete suggestion (code snippet if it helps)

Then give:
- A one-paragraph summary of the change's overall quality
- A verdict: Approve / Approve with comments / Request changes

Review criteria: correctness, edge cases, security, performance,
readability, test coverage, and consistency with the surrounding
codebase. Do not comment on pure formatting if the project has an
auto-formatter (assume it does unless told otherwise).

PR description:
"""
{{pr_description}}
"""

Diff:
```diff
{{diff}}
```
````

## Variables

- `{{pr_description}}`: the PR title/description and any relevant ticket context
- `{{diff}}`: the code diff to review

## Example composition

```
[ Brick: PR Review ] + [ Brick: Security Audit ]
```
