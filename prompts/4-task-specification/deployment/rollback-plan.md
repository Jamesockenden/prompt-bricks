---
title: "Rollback Plan"
category: "Layer 4: Task Specification"
filename: "rollback-plan.md"
prompt_version: "1.0.0"
description: "Create a concrete rollback and mitigation plan with triggers and validation steps."
author: "Prompt Bricks contributors"
---

# Brick: Rollback Plan

**Category:** deployment
**Purpose:** Produce a concrete rollback/mitigation plan for a deployment, to be reviewed before release.

## Prompt

```
Write a rollback plan for the deployment described below.

Include:
1. Pre-deploy checks (what to verify is healthy/baselined before
   deploying, so you have something to compare against)
2. Rollback trigger conditions (specific, measurable signals — not
   "if something looks wrong")
3. Rollback steps, in order, including who/what executes each step
4. Data/migration considerations (is this rollback safe if a DB
   migration already ran? what needs a separate down-migration or
   backfill?)
5. Verification steps after rollback
6. Communication plan (who gets notified, at what point)

Deployment details:
"""
{{deployment_description}}
"""

Does this deploy include a database migration? {{has_migration}}
```

## Variables

- `{{deployment_description}}`: what's being deployed, how, and to what environment
- `{{has_migration}}`: yes/no — whether a DB/schema migration is involved

## Example composition

```
[ Brick: Release Notes ] + [ Brick: Rollback Plan ]
```
