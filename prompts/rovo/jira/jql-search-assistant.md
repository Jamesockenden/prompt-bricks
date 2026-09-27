---
title: "JQL Search Assistant (Rovo)"
category: "rovo / Jira"
filename: "jql-search-assistant.md"
description: "Translate a plain-language question into a precise Jira search and JQL query."
author: "Prompt Bricks contributors"
---

# Brick: JQL Search Assistant (Rovo)

**Category:** rovo/jira
**Purpose:** Get Rovo to find and/or construct a precise Jira search (JQL) from a plain-language description of what you're looking for.

## Prompt

```
I'm looking for Jira work items matching this description:
"""
{{search_description}}
"""

Scope: {{scope}}

Find these for me, and also show me the JQL query you used so I can
reuse or adjust it. If the description is ambiguous (e.g. "recent" or
"my team"), tell me what assumption you made.
```

## Variables

- `{{search_description}}`: what you're looking for, in plain language (status, assignee, dates, labels, etc.)
- `{{scope}}`: project(s), board, or "across everything I have access to"

## Rovo tips

- Be specific about fields you know matter (status, assignee, component, fix version) — Rovo's search accuracy improves a lot with concrete field/value hints rather than vague requests.
- Good follow-up once you see the JQL: *"Save this as a filter called {{filter_name}}."*
- If results look wrong, check whether the underlying data (status, labels) is actually kept up to date — Rovo can only surface what's really in Jira.

## Example composition

```
[ Brick: JQL Search Assistant (Rovo) ] + [ Brick: Sprint Status Summary (Rovo) ]
```
