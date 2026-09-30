---
title: "Meeting Notes to Confluence Page"
category: "Layer 4: Task Specification"
filename: "meeting-notes-to-page.md"
prompt_version: "1.0.0"
description: "Transform meeting notes into a structured Confluence page with decisions and actions."
author: "Prompt Bricks contributors"
---

# Brick: Meeting Notes to Confluence Page

**Purpose:** Turn meeting notes into a structured, shareable Confluence page draft.

## Prompt

```
Draft content for a Confluence page in {{space}} from the notes below. Use only the supplied notes; ask for them if missing. If you have an explicitly available Confluence integration and the user has asked you to publish the page, use it; otherwise return the draft without claiming it was published.

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
- `{{space}}`: target Confluence space
- `{{tone}}`: e.g. "concise and professional", "casual team update"
- `{{raw_notes}}`: the raw notes, transcript, or bullet dump

## Usage notes

- Provide the source notes or an accessible link. Do not assume you can read linked pages unless the content or an integration is available.
- Keep the page draft separate from any claim that it was created or published.

## Example composition

```
[ Brick: Meeting Notes to Confluence Page ] + [ Brick: Jira Issue From Notes ]
```
