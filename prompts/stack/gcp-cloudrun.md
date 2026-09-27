---
title: "Runtime: GCP Cloud Run Container Contract"
category: "stack"
filename: "gcp-cloudrun.md"
path: "prompts/stack/gcp-cloudrun.md"
description: "Port 8080 binding, non-root execution, Workload Identity, fast startup optimization"
tags: ["gcp","cloud-run","containers","serverless"]
commitHash: "1e550bd"
lastModified: "2026-09-24"
author: "AI Generated"
params: [{"id":"port_binding","name":"port_binding","label":"HTTP Listener Port","type":"number","defaultValue":8080,"description":"Port read from the PORT environment variable"},{"id":"memory_limit","name":"memory_limit","label":"Container Memory Allocation","type":"select","defaultValue":"1Gi","options":["512Mi","1Gi","2Gi","4Gi"],"description":"Memory allocated to Cloud Run instance"},{"id":"concurrency_limit","name":"concurrency_limit","label":"Max Concurrent Requests Per Instance","type":"number","defaultValue":80,"description":"Cloud Run request multiplexing cap"}]
---

## Deployment Runtime: Google Cloud Run Contract

- **Port Binding**: The service MUST read the `PORT` environment variable and bind to `0.0.0.0:{{port_binding}}` (defaulting to {{port_binding}}).
- **Process Security**: Docker container must run as an unprivileged non-root user (e.g. `USER 10001:10001` or `USER appuser`).
- **Resource Constraints**:
  - Memory budget: `{{memory_limit}}`. Ensure JVM or runtime heap boundaries (`-XX:MaxRAMPercentage=75.0`) fit within this envelope without OOM termination.
  - Concurrency capacity: configured to handle `{{concurrency_limit}}` concurrent multiplexed streams.
- **Identity & Authorization**: Use GCP Workload Identity Federation. Under no circumstance should a service account JSON key file be packaged into the container image.
