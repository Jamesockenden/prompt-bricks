---
title: "Release Notes"
category: "Layer 4: Task Specification"
filename: "release-notes.md"
prompt_version: "1.0.0"
description: "Turn verified changes into clear, audience-appropriate release notes."
author: "Prompt Bricks contributors"
---

# Brick: Release Notes

**Category:** deployment
**Purpose:** Turn a list of commits/PRs/tickets into user-facing (or internal) release notes.

## Prompt

```
Write release notes for version {{version}} from the list of
changes below.

Group changes under these headings, omitting any heading with nothing
in it:
- 🚀 New features
- 🛠 Improvements
- 🐛 Bug fixes
- ⚠️ Breaking changes
- 🔒 Security

Rules:
- Write for {{audience}} (end users vs. internal engineers) — adjust
  tone and technical depth accordingly
- One line per change, active voice, no jargon if audience is end users
- Breaking changes must include a one-line migration note
- Do not include internal-only chores (CI, formatting, deps bumps)
  unless audience is "internal engineers"

Raw changes (commits/PR titles/tickets):
"""
{{changes}}
"""
```

## Variables

- `{{version}}`: release version/tag
- `{{audience}}`: "end users" or "internal engineers"
- `{{changes}}`: raw commit log, PR list, or ticket titles

## Example composition

```
[ Brick: README Generator ] + [ Brick: Release Notes ]
```
