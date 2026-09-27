---
title: "Meeting Notes to Confluence Page (Rovo)"
category: "rovo / Confluence"
filename: "meeting-notes-to-page.md"
description: "Transform meeting notes into a structured Confluence page with decisions and actions."
author: "Prompt Bricks contributors"
---

# Brick: Meeting Notes to Confluence Page (Rovo)

**Category:** rovo/confluence
**Purpose:** Turn raw, messy meeting notes into a structured, shareable Confluence page.

## Prompt

```
Turn the notes below into a Confluence page for {{audience}}.

Structure:
- Title: short and specific (not just "Meeting Notes")
- TL;DR (2-3 sentences)
- Attendees / stakeholders (if mentioned)
- Key discussion points, grouped by theme (not chronological transcript)
- Decisions made
- Action items — as a table with Owner and Due date columns; leave
  blank cells where the notes don't specify one rather than guessing
- Open questions

Keep the tone {{tone}}. Don't editorialize or add opinions that weren't
expressed in the notes.

Notes:
"""
{{raw_notes}}
"""
```

## Variables

- `{{audience}}`: who this page is for (team, leadership, cross-functional partners)
- `{{tone}}`: e.g. "concise and professional", "casual team update"
- `{{raw_notes}}`: the raw notes, transcript, or bullet dump

## Rovo tips

- If the notes are already on a Confluence page, skip pasting them: *"Using the notes on this page, create a clean summary page in {{space}}."*
- Good follow-up: *"Now create this as a new page in the {{space}} space, under {{parent_page}}."*

## Example composition

```
[ Brick: Meeting Notes to Confluence Page (Rovo) ] + [ Brick: Jira Issue From Notes (Rovo) ]
```
