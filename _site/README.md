# Prompt Brick Library

A modular library of small, reusable prompts for composing task-specific instructions across the software development lifecycle (SDLC). Each Markdown file is also a Jekyll page, so bricks can be reviewed individually or selected in the site builder.

## Compose a prompt

1. Start with one task brick that describes the work to do.
2. Add only the supporting bricks that apply: requirements, architecture, codebase or stack context, testing, review, or output format.
3. Replace every `{{placeholder}}` with concrete project information. Remove optional instructions that do not apply.
4. Check selected bricks for conflicting directions. Prefer the more specific requirement when two bricks overlap.
5. Build, review, and copy the combined prompt; include the relevant source code, ticket, logs, or other inputs when you send it to your assistant.

For example, an implementation prompt might combine **Acceptance Criteria**, **Implement from Spec**, **Java 21 & Spring Boot**, and **Unit Test Generator**. A security review might combine **Security Audit**, **Architecture Guardrails**, and **PR Review**.

The builder extracts only the `## Prompt` section from bricks that have one. Supporting material such as variable descriptions and composition suggestions remains on the brick page for reference and is not copied into the generated prompt.

## Folder guide

| Folder | Use |
| --- | --- |
| `requirements/` | Shape a feature request into stories and testable criteria |
| `architecture/` | Create API contracts, design documents, and decision records |
| `coding/`, `tasks/` | Implement or modify software |
| `testing/` | Generate tests and find edge cases |
| `debugging/` | Investigate defects from evidence |
| `code-review/` | Review changes for quality and security |
| `documentation/` | Write or improve project documentation |
| `deployment/` | Prepare release notes and rollback plans |
| `persona/`, `stack/`, `format/` | Add optional working style, technology, and output constraints |
| `rovo/` | Work with Jira and Confluence using Rovo |

## Adding a brick

Add a Markdown file under the folder that best describes its purpose. Give it Jekyll front matter with `title`, `category`, `filename`, `description`, and `author`, followed by its content. Put the copy-ready instructions under a `## Prompt` heading; use `{{placeholder}}` names for required inputs and explain them in a separate `## Variables` section. Keep composition examples and usage notes outside the prompt section so they are not included in a built prompt. Existing context-only bricks without a `## Prompt` heading contribute their full content.
