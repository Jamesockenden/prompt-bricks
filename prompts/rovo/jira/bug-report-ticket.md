---
title: "Bug Report Ticket (Rovo)"
category: "rovo / Jira"
filename: "bug-report-ticket.md"
description: "Turn a rough defect report into a clear, actionable Jira bug ticket."
author: "Prompt Bricks contributors"
---

# Brick: Bug Report Ticket (Rovo)

**Category:** rovo/jira
**Purpose:** Convert a rough bug description (from a user, support ticket, or your own observation) into a properly structured Jira bug report.

## Prompt

```
Draft a bug report for the {{project_key}} project from the description
below.

Structure it as:
- Summary: one line, symptom-focused (not a guess at the cause)
- Environment: {{environment}}
- Steps to reproduce (numbered)
- Expected result
- Actual result
- Severity ({{severity_scale}}) with one-line justification
- Attachments/evidence referenced (logs, screenshots, links) — note
  where each should be attached if not already included

If the description doesn't give enough detail for clear repro steps,
list what's missing under "Needs clarification" rather than inventing
steps.

Bug description:
"""
{{bug_description}}
"""
```

## Variables

- `{{project_key}}`: Jira project key
- `{{environment}}`: OS/browser/app version/environment where it occurred, if known
- `{{severity_scale}}`: e.g. "Blocker/Critical/Major/Minor/Trivial"
- `{{bug_description}}`: the raw report, support ticket text, or your own notes

## Rovo tips

- If you have a related Confluence troubleshooting page or an existing similar bug, link it: *"...check for duplicates like [smart link] first."*
- Ask Rovo to search first: *"Search {{project_key}} for existing bugs like this before drafting a new one."*

## Example composition

```
[ Brick: Bug Report Ticket (Rovo) ] + [ Brick: Root Cause Analysis ]
```
