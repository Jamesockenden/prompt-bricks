# Prompt Brick Library

A modular library of small, reusable prompts for composing task-specific instructions across the software development lifecycle (SDLC). Each Markdown file is also a Jekyll page, so bricks can be reviewed individually or selected in the site builder.

## Compose a prompt

1. Select only the layers needed for the task, in order: **role and persona**, **base instructions**, **context format**, **task specification**, then **output format**.
2. Choose one or more task bricks in Layer 4 and add only relevant context and constraints from Layers 1–3 and 5.
3. Replace every `{{placeholder}}` with concrete project information. Remove optional instructions that do not apply.
4. Check selected bricks for conflicting directions. Prefer the more specific requirement when two bricks overlap, unless it conflicts with a non-negotiable quality or safety constraint.
5. Build, review, and copy the combined prompt; include relevant source code, tickets, logs, or other inputs when you send it to your assistant.

The five layers separate identity, governance, domain facts, work to perform, and response constraints. They are assistant-agnostic: task bricks may refer to products such as Jira or Confluence, but must not assume a particular assistant, model, or integration. An assistant should use external tools only when they are actually available and authorized.

## Prompt versions and the Prompt Store

Each reusable brick has a semantic `prompt_version` in its Jekyll front matter. Bump the version when changing its instructions: use a patch bump for clarifications that do not change intent, a minor bump for compatible additions, and a major bump for breaking changes to its behavior or contract.

The **Prompt Store** navigation contains curated, complete prompt snapshots for repeatable workflows. Each stored prompt has its own version and records the exact brick versions used as its starting point. A stored prompt is a snapshot, not a live composition: updating a brick does not silently change a known-good stored prompt. To revise one, review and edit the complete prompt, update its source brick references and version notes, and bump its version. Git history retains earlier revisions.

For example, an implementation prompt might combine **Acceptance Criteria**, **Implement from Spec**, **Java 21 & Spring Boot**, and **Unit Test Generator**. A security review might combine **Security Audit**, **Architecture Guardrails**, and **PR Review**.

Use **Preview** on a brick to inspect the exact text that will be included, then choose **Add this brick** to select it for composition. The builder extracts only the `## Prompt` section from bricks that have one. Supporting material such as variable descriptions and composition suggestions remains on the brick page for reference and is not copied into the generated prompt.

## Folder guide

| Folder | Layer | Use |
| --- | --- | --- |
| `1-role-and-persona/` | 1. Role and persona | Define engineering identity, expertise, and scope boundaries |
| `2-base-instructions/` | 2. Base instructions | Set shared quality gates, security rules, and non-negotiable guardrails |
| `3-context-format/` | 3. Context format | Supply repository, technology, architecture, data, and environment facts |
| `4-task-specification/` | 4. Task specification | Define the discrete work, including requirements, coding, reviews, and documentation |
| `5-output-format/` | 5. Output format | Specify the response structure and artifact constraints |

Layer 4 retains topical subfolders such as `jira/`, `confluence/`, `coding/`, and `testing/`; these describe the task domain, not the target assistant.

## Adding a brick

Add a Markdown file under the layer that best describes its responsibility. Give it Jekyll front matter with `title`, `category` (for example, `Layer 4: Task Specification`), `filename`, `prompt_version`, `description`, and `author`, followed by its content. Put copy-ready task instructions under a `## Prompt` heading; use `{{placeholder}}` names for required inputs and explain them in a separate `## Variables` section. Keep composition examples and usage notes outside the prompt section so they are not included in a built prompt. Context and instruction bricks without a `## Prompt` heading contribute their full content.

To add a curated complete prompt, add an entry to `_data/prompt_store.yml` with a stable ID, title, description, semantic version, status, version notes, source brick paths and versions, and the complete prompt snapshot. Keep the snapshot self-contained and bump its version when it changes.
