---
title: "Refactor for Readability"
category: "coding"
filename: "refactor-for-readability.md"
description: "Improve code clarity and maintainability without changing externally observable behavior."
author: "Prompt Bricks contributors"
---

# Brick: Refactor for Readability

**Category:** coding
**Purpose:** Refactor a piece of code for clarity and maintainability without changing its external behaviour.

## Prompt

````
Refactor the following code for readability and maintainability. Do not
change its external behaviour or public interface.

Focus on:
- Extracting functions where a block does more than one thing
- Naming that describes intent, not implementation
- Removing duplication
- Reducing nesting depth where reasonable
- Adding brief comments only where the "why" isn't obvious from the code

After the refactored code, list what you changed and why, as a short
bullet list. If you spot a likely bug (not just a style issue), call it
out separately instead of silently fixing it.

Language/framework: {{language}}

Code:
```{{language}}
{{source_code}}
```
````

## Variables

- `{{language}}`: programming language / framework
- `{{source_code}}`: the code to refactor

## Example composition

```
[ Brick: Refactor for Readability ] + [ Brick: Unit Test Generator ] + [ Brick: PR Review ]
```
