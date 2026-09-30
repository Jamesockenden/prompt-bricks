---
title: "Page Summary and Action Items"
category: "Layer 4: Task Specification"
filename: "page-summary-action-items.md"
prompt_version: "1.0.0"
description: "Summarize Confluence content into key points, decisions, and open action items."
author: "Prompt Bricks contributors"
---

# Brick: Page Summary & Action Items

**Purpose:** Summarize Confluence content into key points, decisions, and open items.

## Prompt

```
Summarize the supplied or accessible content at {{target}}.

Give me:
- The key takeaways (3-5 bullets, most important first)
- Any decisions that were made
- Any open questions or unresolved items
- Action items, with owner if stated

If revision history is supplied and available, mention what changed and when. Otherwise, do not guess about recent updates.
```

If the content is not included and cannot be accessed through an available integration, ask for it instead of fabricating a summary.

## Variables

- `{{target}}`: "this page" (if viewing it in Chat), a pasted smart link, or a description like "the pages in {{space}} tagged {{label}}"

## Usage notes

- Supply the page text or a link accessible to the assistant. State the scope when summarizing multiple pages.

## Example composition

```
[ Brick: Page Summary & Action Items ] + [ Brick: Sprint Status Summary ]
```
