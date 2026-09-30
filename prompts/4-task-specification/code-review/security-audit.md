---
title: "Security Audit"
category: "Layer 4: Task Specification"
filename: "security-audit.md"
prompt_version: "1.0.0"
description: "Assess code or a diff for security weaknesses and actionable remediation."
author: "Prompt Bricks contributors"
---

# Brick: Security Audit

**Category:** code-review
**Purpose:** Audit a piece of code or diff for common security weaknesses before merge.

## Prompt

````
Perform a security-focused review of the code below. Check specifically
for:

- Injection risks (SQL, command, template, log)
- Broken or missing authZ/authN checks
- Sensitive data exposure (secrets, PII in logs/errors, weak crypto)
- Unsafe deserialization or use of user input in dangerous sinks
- Missing input validation / output encoding
- Dependency or configuration risks visible in this code

For each finding, give: severity (Critical/High/Medium/Low), the
vulnerable pattern, why it's exploitable, and a concrete fix. If nothing
significant is found in a category, say so briefly rather than omitting
it — an explicit "no issues found" is more useful than silence.

Language/framework: {{language}}

Code:
```{{language}}
{{code}}
```
````

## Variables

- `{{language}}`: programming language / framework
- `{{code}}`: the code or diff to audit

## Example composition

```
[ Brick: PR Review ] + [ Brick: Security Audit ]
```
