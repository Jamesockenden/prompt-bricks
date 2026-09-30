---
title: "Acceptance Criteria (Gherkin)"
category: "Layer 4: Task Specification"
filename: "acceptance-criteria-gherkin.md"
prompt_version: "1.0.0"
description: "Convert a feature request into clear, testable Given/When/Then acceptance criteria."
author: "Prompt Bricks contributors"
---

# Brick: Acceptance Criteria (Gherkin)

**Category:** requirements
**Purpose:** Convert a user story or feature description into Given/When/Then acceptance criteria that testers and developers can act on directly.

## Prompt

```
Convert the user story below into Gherkin-style acceptance criteria.

Rules:
- Use Given / When / Then / And syntax
- Write one scenario per distinct behaviour (happy path, edge cases, error
  states)
- Keep each step concrete and testable — no vague terms like "works
  correctly"
- Flag any ambiguity in the source story as a "Clarification needed" note
  instead of guessing

User story:
"""
{{user_story}}
"""

Additional context / constraints: {{context}}
```

## Variables

- `{{user_story}}`: the story to convert (ideally already in "As a... I want... so that..." form)
- `{{context}}`: business rules, constraints, or systems involved (optional)

## Example composition

```
[ Brick: User Story Generator ] + [ Brick: Acceptance Criteria (Gherkin) ] + [ Brick: Unit Test Generator ]
```
