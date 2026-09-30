---
title: "Unit Test Generator"
category: "Layer 4: Task Specification"
filename: "unit-test-generator.md"
prompt_version: "1.0.0"
description: "Generate focused unit tests using the project's framework and established conventions."
author: "AI Generated"
---

# Brick: Unit Test Generator

**Category:** testing
**Purpose:** Generate a unit test suite for a given piece of code, using the project's existing test framework and conventions.

## Prompt

````
Write unit tests for the code below using {{test_framework}}.

Cover:
- The happy path for each public function/method
- Boundary and edge cases (empty input, nulls, zero, max values, etc.)
- Error/exception paths
- Any branching logic, so every branch is exercised at least once

Follow these conventions:
- Test naming: {{naming_convention}}
- Mock external dependencies rather than hitting real services/DB
- One assertion focus per test where practical

Code under test:
```{{language}}
{{source_code}}
```
````

## Variables

- `{{test_framework}}`: e.g. Jest, pytest, JUnit, xUnit
- `{{naming_convention}}`: e.g. "should_doX_when_Y" or "test_x_returns_y"
- `{{language}}`: programming language
- `{{source_code}}`: the code to be tested

## Example composition

```
[ Brick: Implement From Spec ] + [ Brick: Unit Test Generator ] + [ Brick: Edge Case Finder ]
```
