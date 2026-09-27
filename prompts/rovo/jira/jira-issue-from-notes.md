---
title: "Jira Issue from Notes (Rovo)"
category: "rovo / Jira"
filename: "jira-issue-from-notes.md"
description: "Convert unstructured discussion notes into a well-formed Jira issue draft."
author: "Prompt Bricks contributors"
---

# Brick: Jira Issue From Notes (Rovo)

**Category:** rovo/jira
**Purpose:** Turn a meeting, Slack thread, or raw notes into a well-formed Jira issue, drafted directly in Rovo Chat or via the Rovo agent on a Jira project.

## Prompt

Paste into Rovo Chat (in the Jira project, or with the project set as context):

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

## Variables

- `{{issue_type}}`: Story / Bug / Task / Epic
- `{{project_key}}`: the Jira project key (e.g. ENG, MOB)
- `{{notes}}`: raw meeting notes, Slack thread, or a description of the work

## Rovo tips

- If the notes live on a Confluence page, reference it instead of pasting: *"...using the notes on [paste page link], draft a..."*
- Follow up with: *"Now create this as a real issue in {{project_key}}."* to have Rovo actually create it rather than just draft the text.

## Example composition

```
[ Brick: Jira Issue From Notes (Rovo) ] + [ Brick: Acceptance Criteria (Gherkin) ]
```
