---
title: "Technical Spec Page"
category: "Layer 4: Task Specification"
filename: "technical-spec-page.md"
prompt_version: "1.0.0"
description: "Draft a review-ready Confluence technical specification from supplied context."
author: "Prompt Bricks contributors"
---

# Brick: Technical Spec Page

**Purpose:** Draft a technical design/specification for Confluence from a problem description, ready for team review.

## Prompt

```
Draft a technical spec for {{space}} for the following work.

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

Related pages/context to draw on (use only if their contents are supplied or accessible): {{related_links}}
```

Return the draft without claiming it was published. Publish only when explicitly requested and an authorized Confluence integration is available.

## Variables

- `{{space}}`: target Confluence space
- `{{work_description}}`: the problem, feature, or system being designed
- `{{related_links}}`: smart links to related pages, ADRs, or prior art (optional)

## Usage notes

- Provide relevant linked-page content when the assistant cannot access those pages directly.

## Example composition

```
[ Brick: System Design Document ] + [ Brick: Technical Spec Page ]
```
