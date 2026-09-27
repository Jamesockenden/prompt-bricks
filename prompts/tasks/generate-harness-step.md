---
title: "Task: CI/CD Pipeline & Harness Step"
category: "tasks"
filename: "generate-harness-step.md"
path: "prompts/tasks/generate-harness-step.md"
description: "Automated container build, Trivy vulnerability scanning, SonarQube quality gate, canary rollouts"
tags: ["cicd","harness","devops","security-scan"]
commitHash: "f72a110"
lastModified: "2026-09-25"
author: "AI Generated"
params: [{"id":"pipeline_system","name":"pipeline_system","label":"CI/CD Platform","type":"select","defaultValue":"Harness CI/CD","options":["Harness CI/CD","GitHub Actions Workflow","GitLab CI"],"description":"Target continuous deployment syntax"},{"id":"trivy_severity_threshold","name":"trivy_severity_threshold","label":"Trivy Scan Blocking Severity","type":"select","defaultValue":"HIGH,CRITICAL","options":["CRITICAL","HIGH,CRITICAL","MEDIUM,HIGH,CRITICAL"],"description":"Vulnerability level that fails the build step"},{"id":"canary_traffic_split","name":"canary_traffic_split","label":"Initial Canary Traffic %","type":"number","defaultValue":10,"description":"Percentage of live traffic routed to the canary candidate"}]
---

## Task: Define {{pipeline_system}} Deployment Pipeline Step

Generate a declarative configuration for the {{pipeline_system}} pipeline executing the following phases:

1. **Hermetic Container Build**:
   - Build multi-stage container leveraging buildkit cache mounts for dependencies.
   - Tag image with Git commit SHA and semantic version.
2. **Shift-Left Security Gate**:
   - Run Trivy vulnerability scan against generated image. Fail immediately if vulnerabilities matching `{{trivy_severity_threshold}}` are detected.
   - Execute static application security testing (SAST) and SonarQube quality gate (require zero blocker issues).
3. **Canary Deployment Rollout**:
   - Deploy candidate revision to the staging and production targets.
   - Route initial `{{canary_traffic_split}}%` live traffic to the canary revision.
   - Run automated synthetic health checks for 5 minutes (error rate < 0.1%, p99 latency < 200ms) before stepping up to 100% traffic.
