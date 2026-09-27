---
title: "Confluence Page Review (Rovo)"
category: "rovo / Confluence"
filename: "page-review-against-reference.md"
description: "Compare a draft Confluence page against a reference and identify specific gaps."
author: "Prompt Bricks contributors"
---

# Brick: Page Review Against Reference (Rovo)

**Category:** rovo/confluence
**Purpose:** Have Rovo critique a draft Confluence page against a reference standard, style guide, or related page — surfacing gaps before it goes out.

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

## Rovo tips

- This maps directly to Rovo's built-in review pattern: *"Based on your knowledge of [reference page], review this page for me and tell me how to make it better."*
- Also try: *"Rate this content based on writing quality, narrative, feasibility."* or *"What big questions did I miss on this page?"*

## Example composition

```
[ Brick: Technical Spec Page (Rovo) ] + [ Brick: Page Review Against Reference (Rovo) ]
```
