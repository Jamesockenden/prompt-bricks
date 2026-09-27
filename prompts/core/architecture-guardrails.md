---
title: "Architecture Guardrails & Security"
category: "core"
filename: "architecture-guardrails.md"
path: "prompts/core/architecture-guardrails.md"
description: "Zero inline secrets, 12-factor configuration, health probes, and structured JSON observability"
tags: ["security","guardrails","cloud-native","observability"]
commitHash: "8b1d44e"
lastModified: "2026-09-20"
author: "infosec-platform"
params: [{"id":"secret_manager_provider","name":"secret_manager_provider","label":"Secret Management System","type":"select","defaultValue":"GCP Secret Manager","options":["GCP Secret Manager","HashiCorp Vault","AWS Secrets Manager","Kubernetes Secrets"],"description":"Backend for secret resolution"},{"id":"liveness_probe_path","name":"liveness_probe_path","label":"Liveness Probe Path","type":"string","defaultValue":"/livez","description":"HTTP probe for application liveness"},{"id":"readiness_probe_path","name":"readiness_probe_path","label":"Readiness Probe Path","type":"string","defaultValue":"/readyz","description":"HTTP probe for dependency readiness"}]
---

## Cloud Architecture Guardrails

- **Zero Inline Secrets**: Strictly prohibit hardcoded credentials, API keys, database connection strings, or private tokens. All secrets must be loaded dynamically at runtime via {{secret_manager_provider}} and mapped via environment variables or workload identity bindings.
- **Graceful Shutdown**: Implement SIGTERM and SIGINT interceptors allowing in-flight requests a minimum of 25 seconds to drain cleanly before terminating.
- **Health Verification Probes**:
  - Expose `{{liveness_probe_path}}` for superficial process vitality.
  - Expose `{{readiness_probe_path}}` verifying downstream datastore, cache, and message broker connectivity.
- **Structured Observability**: All logs must emit single-line JSON adhering to OpenTelemetry semantic conventions, including `trace_id`, `span_id`, `severity`, `service.name`, and ISO-8601 timestamps. Never print raw stack traces directly to stdout.
