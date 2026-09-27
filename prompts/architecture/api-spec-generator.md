---
title: "API Spec Generator"
category: "architecture"
filename: "api-spec-generator.md"
description: "Create an OpenAPI specification from a plain-language description of API behavior."
author: "Prompt Bricks contributors"
---

# Brick: API Spec Generator

**Category:** architecture
**Purpose:** Generate an OpenAPI 3.0 spec (or equivalent) for an API from a plain-language description of its behaviour.

## Prompt

```
Generate an OpenAPI 3.0 specification (YAML) for the API described below.

Requirements:
- Include paths, methods, request bodies, response schemas (success and
  error), and status codes
- Use realistic, consistent field names and types
- Add a short `description` for every endpoint and schema
- Where the description below is ambiguous about a field or behaviour,
  make the most conventional REST choice and note it in a comment

API description:
"""
{{api_description}}
"""

Existing conventions to follow (auth scheme, naming style, versioning): {{conventions}}
```

## Variables

- `{{api_description}}`: plain-language description of resources and operations
- `{{conventions}}`: existing API conventions in the codebase, if any

## Example composition

```
[ Brick: API Spec Generator ] + [ Brick: Unit Test Generator ]
```
