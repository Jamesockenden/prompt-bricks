---
title: "JQL Search Assistant"
category: "Layer 4: Task Specification"
filename: "jql-search-assistant.md"
prompt_version: "1.0.0"
description: "Translate a plain-language question into a precise Jira search and JQL query."
author: "Prompt Bricks contributors"
---

# Brick: JQL Search Assistant

**Purpose:** Translate a plain-language request into a precise Jira search and JQL query.

## Prompt

```
For the Jira work items described below, use an authorized Jira search integration to find matches if one is available. Otherwise, construct a JQL query without claiming to have run it:
"""
{{search_description}}
"""

Scope: {{scope}}

Show the query used, or the constructed JQL if no search was run, so I
can reuse or adjust it. If the description is ambiguous (e.g. "recent"
or "my team"), state your assumptions.
```

## Variables

- `{{search_description}}`: what you're looking for, in plain language (status, assignee, dates, labels, etc.)
- `{{scope}}`: project(s), board, or "across everything I have access to"

## Usage notes

- Use the supplied Jira field names and values. State assumptions for ambiguous terms and do not claim a search was run unless it was.

## Example composition

```
[ Brick: JQL Search Assistant ] + [ Brick: Sprint Status Summary ]
```
