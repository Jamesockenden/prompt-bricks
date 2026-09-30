---
title: "Sprint Status Summary"
category: "Layer 4: Task Specification"
filename: "sprint-status-summary.md"
prompt_version: "1.0.0"
description: "Summarize live sprint progress, risks, blockers, and next steps for stakeholders."
author: "Prompt Bricks contributors"
---

# Brick: Sprint Status Summary

**Purpose:** Produce a stakeholder-ready summary of sprint or project progress from verified work-item data.

## Prompt

```
Summarize the current status of {{scope}} for {{audience}} using supplied data or data retrieved through an explicitly available Jira integration. If the data is unavailable, ask for it rather than guessing, and do not imply access to live project data that was not provided or retrieved.

Include:
- Overall status in one line (on track / at risk / blocked), with why
- What was completed since {{since}}
- What's in progress, with any items at risk of missing the sprint/
  deadline and why
- Blockers, with who/what is needed to unblock each one
- What's planned next

Keep it to something that fits on one screen — this is a status update,
not a full report. Use plain language if the audience isn't engineers.
```

## Variables

- `{{scope}}`: e.g. "the current sprint in {{project_key}}", "epic {{epic_key}}", "work items assigned to {{team}}"
- `{{audience}}`: e.g. "engineering leadership", "the product team", "a customer-facing exec summary"
- `{{since}}`: e.g. "last standup", "Monday", "the last sprint review"

## Usage notes

- State the data scope and retrieval time when known. Do not imply access to live project data when none was provided.

## Example composition

```
[ Brick: Sprint Status Summary ] + [ Brick: Meeting Notes to Confluence Page ]
```
