---
title: "Technical Spec Page (Rovo)"
category: "rovo / Confluence"
filename: "technical-spec-page.md"
description: "Draft a review-ready Confluence technical specification from supplied context."
author: "Prompt Bricks contributors"
---

# Brick: Technical Spec Page (Rovo)

**Category:** rovo/confluence
**Purpose:** Draft a technical design/spec page in Confluence from a problem description, ready for team review and comments.

## Prompt

```
Create a technical spec page in {{space}} for the following work.

Use this structure:
1. Overview (problem + goal, 2-3 sentences)
2. Background / context
3. Proposed approach
4. Scope (in scope / out of scope, as two bullet lists)
5. Risks and open questions
6. Rollout plan (if relevant)
7. Reviewers / stakeholders to tag

Base the technical details only on what's provided below and any linked
pages — flag anything you had to assume.

Work description:
"""
{{work_description}}
"""

Related pages/context to draw on: {{related_links}}
```

## Variables

- `{{space}}`: target Confluence space
- `{{work_description}}`: the problem, feature, or system being designed
- `{{related_links}}`: smart links to related pages, ADRs, or prior art (optional)

## Rovo tips

- Paste smart links to related pages directly in the prompt so Rovo can pull real context rather than guessing.
- Good follow-up: *"Now create this page under {{parent_page}} and @mention {{reviewer}} for review."*

## Example composition

```
[ Brick: System Design Document ] + [ Brick: Technical Spec Page (Rovo) ]
```
