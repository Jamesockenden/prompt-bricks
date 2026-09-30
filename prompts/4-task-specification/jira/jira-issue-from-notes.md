---
title: "Jira Issue from Notes"
category: "Layer 4: Task Specification"
filename: "jira-issue-from-notes.md"
prompt_version: "1.0.0"
description: "Convert unstructured discussion notes into a well-formed Jira issue draft."
author: "Prompt Bricks contributors"
---

# Brick: Jira Issue From Notes

**Purpose:** Turn meeting notes or other raw notes into a well-formed Jira issue draft.

## Prompt

```
Using the notes below, draft a {{issue_type}} for the {{project_key}}
project.

Include:
- A clear, action-oriented summary (max ~10 words)
- A description with: context, what needs to be done, and why
- Acceptance criteria as a checklist
- Suggested labels/components if any are implied
- A suggested priority, with one line of reasoning

Don't invent scope that isn't implied by the notes — if something is
ambiguous, list it under "Needs clarification" instead of guessing.

Notes:
"""
{{notes}}
"""
```

Return a draft by default. Create the issue only when explicitly requested and an authorized Jira integration is available; confirm only after successful creation.

## Variables

- `{{issue_type}}`: Story / Bug / Task / Epic
- `{{project_key}}`: the Jira project key (e.g. ENG, MOB)
- `{{notes}}`: raw meeting notes, Slack thread, or a description of the work

## Usage notes

- Include source-page content when the assistant cannot access the link directly.

## Example composition

```
[ Brick: Jira Issue From Notes ] + [ Brick: Acceptance Criteria (Gherkin) ]
```
