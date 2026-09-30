---
title: "Confluence Release Notes"
category: "Layer 4: Task Specification"
filename: "release-notes-page.md"
prompt_version: "1.0.0"
description: "Draft Confluence release notes from Jira work items and a specified release."
author: "Prompt Bricks contributors"
---

# Brick: Release Notes Page

**Purpose:** Draft Confluence release notes from verified changes in a release.

## Prompt

```
Draft Confluence release notes for {{release_scope}} for the {{audience}} audience.

Use the supplied change list or records retrieved through an explicitly available integration. If neither is available, ask for the changes instead of guessing. Group verified changes under:
- 🚀 New features
- 🛠 Improvements
- 🐛 Bug fixes
- ⚠️ Breaking changes (include a one-line migration note for each)

Write for {{audience}} — plain language if end users, more technical
detail if internal engineers. Skip purely internal chores (CI, dependencies, formatting) unless the audience is internal engineers.

Return a page draft for the {{space}} space. Publish it only if the user requests publication and an authorized Confluence integration is available; report success only after confirming the operation.
```

## Variables

- `{{space}}`: target Confluence space
- `{{release_scope}}`: e.g. "fix version 2.4.0 in {{project_key}}", "everything merged this sprint"
- `{{audience}}`: "end users" or "internal engineers"

## Usage notes

- Provide a verified change list or an accessible release scope. Do not assume access to Jira or Confluence.

## Example composition

```
[ Brick: Release Notes ] + [ Brick: Release Notes Page ]
```
