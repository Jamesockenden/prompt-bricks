---
title: "Retrospective Summary by Theme (Rovo)"
category: "rovo / Confluence"
filename: "retro-summary-by-theme.md"
description: "Group retrospective feedback into themes, insights, and owned action items."
author: "Prompt Bricks contributors"
---

# Brick: Retro Summary by Theme (Rovo)

**Category:** rovo/confluence
**Purpose:** Turn a retro board or comment thread on a Confluence page into a themed summary with clear action items — useful right after a retro before energy (and memory) fades.

## Prompt

```
Summarise the retro notes/comments on {{target}}, grouped by theme
(e.g. process, tooling, communication, scope).

For each theme give:
- A one-line summary of the sentiment/point being made
- How many separate comments raised something similar (rough count is
  fine)
- A suggested action item, if one is implied — mark clearly which
  action items are your suggestion vs. ones stated directly in the
  notes

Finish with a prioritised top-3 list of what to act on first.
```

## Variables

- `{{target}}`: "this page", a smart link to the retro page, or "the comments on {{page_link}}"

## Rovo tips

- Maps to Rovo's built-in pattern: *"Summarise the comments on this page and group them by theme."*
- Good follow-up: *"Create Jira tasks in {{project_key}} for the top 3 action items."* to turn the summary directly into tracked work.

## Example composition

```
[ Brick: Retro Summary by Theme (Rovo) ] + [ Brick: Jira Issue From Notes (Rovo) ]
```
