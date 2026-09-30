---
title: "Architecture Decision Record (ADR)"
category: "Layer 4: Task Specification"
filename: "adr-generator.md"
prompt_version: "1.0.0"
description: "Record a technical decision, context, consequences, and alternatives in a reviewable ADR."
author: "Prompt Bricks contributors"
---

# Brick: Architecture Decision Record (ADR)

**Category:** architecture
**Purpose:** Produce a single ADR documenting a technical decision, in the standard ADR format, for the project's decision log.

## Prompt

```
Write an Architecture Decision Record for the decision described below,
using this format:

# ADR-{{number}}: {{title}}

## Status
{{status}} (Proposed / Accepted / Superseded)

## Context
What situation or problem led to this decision? What forces (technical,
business, team) are in play?

## Decision
State the decision plainly, in one paragraph.

## Consequences
What becomes easier or harder as a result? Include both positive and
negative consequences honestly.

## Alternatives considered
List each alternative with a one-line reason it was not chosen.

Decision details:
"""
{{decision_details}}
"""
```

## Variables

- `{{number}}`: ADR sequence number
- `{{title}}`: short decision title
- `{{status}}`: current status of the decision
- `{{decision_details}}`: notes, discussion, or options being weighed

## Example composition

```
[ Brick: System Design Document ] + [ Brick: Architecture Decision Record ]
```
