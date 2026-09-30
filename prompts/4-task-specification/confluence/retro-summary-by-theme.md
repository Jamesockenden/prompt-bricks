---
title: "Retrospective Summary by Theme"
category: "Layer 4: Task Specification"
filename: "retro-summary-by-theme.md"
prompt_version: "1.0.0"
description: "Group retrospective feedback into themes, insights, and owned action items."
author: "Prompt Bricks contributors"
---

# Brick: Retro Summary by Theme

**Purpose:** Turn retrospective feedback into a themed summary with clear action items.

## Prompt

```
Summarize the supplied retrospective notes or comments from {{target}}, grouped by theme
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

If the notes or comments are unavailable and cannot be retrieved through an explicitly available integration, ask for them rather than inventing themes or counts.

## Usage notes

- Label recommendations as suggestions. Create tracked work only when requested and an authorized Jira integration is available; confirm only actions that completed successfully.

## Example composition

```
[ Brick: Retro Summary by Theme ] + [ Brick: Jira Issue From Notes ]
```
