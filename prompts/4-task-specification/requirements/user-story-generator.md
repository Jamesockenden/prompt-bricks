---
title: "User Story Generator"
category: "Layer 4: Task Specification"
filename: "user-story-generator.md"
prompt_version: "1.0.0"
description: "Turn a stakeholder request into user stories with explicit acceptance criteria."
author: "Prompt Bricks contributors"
---

# Brick: User Story Generator

**Category:** requirements
**Purpose:** Turn a rough feature idea or stakeholder request into well-formed user stories with acceptance criteria.

## Prompt

```
You are a business analyst. Convert the following feature description into
a set of user stories.

For each story, output:
- Title (short, action-oriented)
- Story: "As a {{persona}}, I want to {{action}}, so that {{benefit}}"
- Acceptance criteria (3-5 bullet points, testable)
- Priority (Must / Should / Could) with a one-line justification
- Open questions or assumptions you had to make

Split the feature into multiple stories if it covers more than one
distinct piece of user value. Do not invent functionality that isn't
implied by the description below.

Feature description:
"""
{{feature_description}}
"""

Target persona(s): {{personas}}
```

## Variables

- `{{feature_description}}`: the raw feature idea, ticket, or stakeholder notes
- `{{personas}}`: known user types/personas, if any (leave as "infer from context" if unknown)

## Example composition

```
[ Brick: User Story Generator ] + [ Brick: Acceptance Criteria (Gherkin) ]
```
