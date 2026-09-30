---
title: "Confluence Page Review"
category: "Layer 4: Task Specification"
filename: "page-review-against-reference.md"
prompt_version: "1.0.0"
description: "Compare a draft Confluence page against a reference and identify specific gaps."
author: "Prompt Bricks contributors"
---

# Brick: Page Review Against Reference

**Purpose:** Review a draft Confluence page against a reference standard, style guide, or related page and identify actionable gaps.

## Prompt

```
Review this page and tell me how to make it better.

Use {{reference}} as the standard to compare against.

Give me:
- What's missing compared to the reference (structure, level of detail,
  sections)
- Anything unclear or ambiguous to a first-time reader
- Anything that seems inconsistent with the reference (terminology,
  claims, numbers)
- A rewritten version of the weakest section, as an example

Be specific — point to the part of the page you mean, not just general
feedback.
```

## Variables

- `{{reference}}`: a smart link to a reference page/template, or a description like "our standard RFC template" / "writing quality, narrative, and feasibility"

## Usage notes

- Include the draft and the reference text, or provide a link the assistant can actually access.
- Do not infer that an inaccessible page has been reviewed.

## Example composition

```
[ Brick: Technical Spec Page ] + [ Brick: Page Review Against Reference ]
```
