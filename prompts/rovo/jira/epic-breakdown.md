---
title: "Epic Breakdown (Rovo)"
category: "rovo / Jira"
filename: "epic-breakdown.md"
description: "Break an initiative into scoped, dependency-aware Jira stories and tasks."
author: "Prompt Bricks contributors"
---

# Brick: Epic Breakdown (Rovo)

**Category:** rovo/jira
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

## Rovo tips

- If a related Confluence design doc exists, point Rovo at it: *"...using the design in [smart link] as the basis for scope."*
- Follow up with: *"Create these as stories under epic {{epic_key}}."* once you're happy with the breakdown.

## Example composition

```
[ Brick: System Design Document ] + [ Brick: Epic Breakdown (Rovo) ] + [ Brick: Jira Issue From Notes (Rovo) ]
```
