---
title: "Confluence Release Notes (Rovo)"
category: "rovo / Confluence"
filename: "release-notes-page.md"
description: "Draft Confluence release notes from Jira work items and a specified release."
author: "Prompt Bricks contributors"
---

# Brick: Release Notes Page (Rovo)

**Category:** rovo/confluence
**Purpose:** Publish release notes to Confluence directly from the Jira work items in a release/fix version, via Rovo.

## Prompt

```
Create a release notes page in {{space}} for {{release_scope}}.

Pull the changes from the Jira work items in {{release_scope}} and
group them under:
- 🚀 New features
- 🛠 Improvements
- 🐛 Bug fixes
- ⚠️ Breaking changes (include a one-line migration note for each)

Write for {{audience}} — plain language if end users, more technical
detail if internal engineers. Skip purely internal chores (CI, deps,
formatting) unless the audience is internal engineers.
```

## Variables

- `{{space}}`: target Confluence space
- `{{release_scope}}`: e.g. "fix version 2.4.0 in {{project_key}}", "everything merged this sprint"
- `{{audience}}`: "end users" or "internal engineers"

## Rovo tips

- Because Rovo has live Jira access, you usually don't need to paste a changelog — just point it at the fix version or sprint.
- Good follow-up: *"Now create this page under {{parent_page}} and link it from the {{project_key}} space homepage."*

## Example composition

```
[ Brick: Release Notes ] + [ Brick: Release Notes Page (Rovo) ]
```
