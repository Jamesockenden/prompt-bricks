---
title: "Epic Breakdown"
category: "Layer 4: Task Specification"
filename: "epic-breakdown.md"
prompt_version: "1.0.0"
description: "Break an initiative into scoped, dependency-aware Jira stories and tasks."
author: "Prompt Bricks contributors"
---

# Brick: Epic Breakdown

**Purpose:** Break a large epic or initiative into a set of right-sized stories/subtasks ready to add to a Jira project.

## Prompt

```
Break the epic below down into stories for the {{project_key}} project.

Rules:
- Each story should be independently shippable and testable — no story
  should depend on "everything else being done first" unless the
  dependency is unavoidable and called out explicitly
- Aim for stories a single engineer could reasonably complete in
  {{target_size}}
- For each story give: title, one-line description, and a rough
  complexity estimate (S/M/L)
- Call out dependencies between stories explicitly (e.g. "Story 3
  depends on Story 1")
- Add a short "suggested sequencing" list at the end

Epic:
"""
{{epic_description}}
"""
```

## Variables

- `{{project_key}}`: Jira project key
- `{{target_size}}`: e.g. "1-3 days" or "one sprint"
- `{{epic_description}}`: the epic goal, context, and any known constraints

## Usage notes

- Supply related design context or use it only when an authorized integration can access it.
- Create issues only when explicitly requested and an authorized Jira integration is available; otherwise return drafts.

## Example composition

```
[ Brick: System Design Document ] + [ Brick: Epic Breakdown ] + [ Brick: Jira Issue From Notes ]
```
