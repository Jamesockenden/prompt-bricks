---
title: "Context Format: Codebase and Environment"
category: "Layer 3: Context Format"
filename: "codebase-context.md"
prompt_version: "1.0.0"
description: "Provide structured, factual codebase, stack, architecture, and runtime context."
author: "Prompt Bricks contributors"
---

## Codebase and Environment Context

Use the following project context as the source of truth. Treat omitted details as unknown; do not infer specific files, dependencies, schemas, or runtime behavior without evidence.

### Repository and scope

- Repository or project: {{repository}}
- Relevant paths and modules: {{relevant_paths}}
- In-scope boundaries or constraints: {{scope_boundaries}}

### Technology and dependencies

- Languages and framework versions: {{technology_stack}}
- Relevant dependencies and versions: {{dependencies}}
- Build, test, lint, and run commands: {{project_commands}}

### Architecture and data

- Architectural patterns and module responsibilities: {{architecture}}
- Relevant APIs, contracts, or database schemas: {{contracts_and_schemas}}
- Existing conventions or representative examples: {{existing_patterns}}

### Environment and operations

- Target runtime, deployment environment, and configuration: {{runtime_environment}}
- Performance, security, availability, or compliance constraints: {{operational_constraints}}
- Known limitations, unresolved questions, or assumptions: {{known_unknowns}}

Use only context relevant to the task. If an essential detail is missing or contradictory, identify it instead of silently choosing an interpretation.
