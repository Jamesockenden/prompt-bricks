---
title: "Page Summary and Action Items (Rovo)"
category: "rovo / Confluence"
filename: "page-summary-action-items.md"
description: "Summarize Confluence content into key points, decisions, and open action items."
author: "Prompt Bricks contributors"
---

# Brick: Page Summary & Action Items (Rovo)

**Category:** rovo/confluence
**Purpose:** Get a fast, accurate summary of an existing Confluence page (or set of pages) — key points, decisions, and open items — without reading the whole thing.

## Prompt

```
Summarise {{target}} for me.

Give me:
- The key takeaways (3-5 bullets, most important first)
- Any decisions that were made
- Any open questions or unresolved items
- Action items, with owner if stated

If the page has been updated recently, mention what changed and when.
```

## Variables

- `{{target}}`: "this page" (if viewing it in Chat), a pasted smart link, or a description like "the pages in {{space}} tagged {{label}}"

## Rovo tips

- Works directly on the page you have open — no need to copy/paste content, just say "this page."
- Good follow-ups: *"Summarise the comments on this page and group them by theme."* or *"What changed on this page in the last {{time_period}}?"*
- For a cross-page rollup: *"Summarise the key decisions across all pages in {{space}} labelled {{label}}."*

## Example composition

```
[ Brick: Page Summary & Action Items (Rovo) ] + [ Brick: Sprint Status Summary (Rovo) ]
```
