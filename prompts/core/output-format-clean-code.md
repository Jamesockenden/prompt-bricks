---
title: "Output Format: Strict Clean Code"
category: "core"
filename: "output-format-clean-code.md"
path: "prompts/core/output-format-clean-code.md"
description: "Enforces a single markdown code block, production-ready syntax, zero conversational fluff"
tags: ["formatting","clean-code","strict","markdown"]
commitHash: "3a9f02c"
lastModified: "2026-09-18"
author: "architecture-guild"
params: [{"id":"target_language","name":"target_language","label":"Target Code Language","type":"string","defaultValue":"java","placeholder":"e.g. java, python, typescript, yaml","description":"Language tag to apply to the main fenced block"},{"id":"enforce_single_block","name":"enforce_single_block","label":"Enforce Single Code Block","type":"boolean","defaultValue":true,"description":"Disallow splitting into multiple intermediate blocks"},{"id":"include_file_path_header","name":"include_file_path_header","label":"Include Target File Path Comment","type":"boolean","defaultValue":true,"description":"Prepend relative target file location at line 1"}]
---

## Output Format & Code Delivery Rules

1. Provide the complete implementation inside a single fenced code block (```{{target_language}} ...```).
2. {{#if include_file_path_header}}The first line inside the code block MUST specify the exact relative file path as a language comment (e.g., `// src/main/.../Target.java`).{{/if}}
3. Do NOT omit implementation details using comments like "// TODO: implement", "// add rest here", or ellipsis (...). Write complete, compiling, and syntactically valid code.
4. Output ZERO introductory fluff ("Here is your code:"), ZERO conversational preambles, and ZERO concluding pleasantries. Return only the instructions and the code payload.
5. All public classes, interfaces, and methods must have standard documentation comments describing purpose and parameters.
