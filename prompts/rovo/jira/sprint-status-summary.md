---
title: "Sprint Status Summary (Rovo)"
category: "rovo / Jira"
filename: "sprint-status-summary.md"
description: "Summarize live sprint progress, risks, blockers, and next steps for stakeholders."
author: "Prompt Bricks contributors"
---

# Brick: Sprint Status Summary (Rovo)

**Category:** rovo/jira
**Purpose:** Get a stakeholder-ready summary of sprint or project progress directly from live Jira data, via Rovo Chat.

## Prompt

```
Summarise the current status of {{scope}} for {{audience}}.

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

## Rovo tips

- This works best asked directly in Rovo Chat with live Jira access — no need to paste data, Rovo pulls it from the project/sprint you reference.
- Good follow-ups: *"Now turn that into a Confluence status page."* or *"Draft a Slack message version of that, shorter."*

## Example composition

```
[ Brick: Sprint Status Summary (Rovo) ] + [ Brick: Meeting Notes to Confluence Page (Rovo) ]
```
