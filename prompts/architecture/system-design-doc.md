---
title: "System Design Document"
category: "architecture"
filename: "system-design-doc.md"
description: "Draft a structured technical design for a system or feature, ready for team review."
author: "Prompt Bricks contributors"
---

# Brick: System Design Document

**Category:** architecture
**Purpose:** Draft a structured technical design doc for a new system or feature, ready for team review.

## Prompt

```
Draft a system design document for the following requirement. Use this
structure, and keep each section tight — this is a working doc, not a
sales pitch:

1. Problem statement (2-3 sentences)
2. Goals and non-goals
3. Proposed architecture (describe components and how they interact;
   note where a diagram would help and what it should show)
4. Data model changes (if any)
5. API changes (if any) — request/response shape, not full spec
6. Failure modes & how they're handled
7. Alternatives considered and why they were rejected
8. Open questions

Requirement / feature:
"""
{{requirement}}
"""

Existing system context: {{system_context}}
Constraints (tech stack, SLAs, compliance, etc.): {{constraints}}
```

## Variables

- `{{requirement}}`: the feature or problem being designed for
- `{{system_context}}`: relevant existing architecture, services, or tech stack
- `{{constraints}}`: hard constraints the design must respect

## Example composition

```
[ Brick: System Design Document ] + [ Brick: Architecture Decision Record ]
```
