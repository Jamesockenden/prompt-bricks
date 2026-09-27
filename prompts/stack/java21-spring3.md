---
title: "Stack: Java 21 & Spring Boot 3.3+"
category: "stack"
filename: "java21-spring3.md"
path: "prompts/stack/java21-spring3.md"
description: "Modern Java features: immutable records, virtual threads, pattern matching, Jakarta EE 10"
tags: ["java","spring-boot","virtual-threads","backend"]
commitHash: "c4e7191"
lastModified: "2026-09-22"
author: "jvm-platform-team"
params: [{"id":"spring_boot_version","name":"spring_boot_version","label":"Spring Boot Version","type":"select","defaultValue":"3.3.4","options":["3.3.4","3.4.0-RC1","3.2.10"],"description":"Target Spring Boot runtime version"},{"id":"use_virtual_threads","name":"use_virtual_threads","label":"Enable Virtual Threads (Project Loom)","type":"boolean","defaultValue":true,"description":"Configure spring.threads.virtual.enabled=true for high concurrency I/O"},{"id":"reactive_mode","name":"reactive_mode","label":"Reactive (WebFlux) or Imperative (WebMVC)","type":"select","defaultValue":"Imperative + Virtual Threads","options":["Imperative + Virtual Threads","Reactive WebFlux (Project Reactor)"],"description":"Concurrency and web framework architecture"}]
---

## Technology Stack: Java 21 & Spring Boot {{spring_boot_version}}

- **Java 21 Language Features**:
  - Represent all request/response DTOs and domain events as immutable Java `record` classes.
  - Use sealed interfaces and switch pattern matching for exhaustive domain state transitions.
  - Rely on text blocks (`"""`) for inline SQL queries, JSON schemas, and templating.
- **Spring Boot Foundation**:
  {{#if use_virtual_threads}}
  - Enable Virtual Threads (`spring.threads.virtual.enabled=true`) for blocking I/O, eliminating legacy thread-pool tuning.
  {{/if}}
  - Framework mode: {{reactive_mode}}.
  - Use standard Jakarta EE 10 annotations (`jakarta.validation.constraints.*`, `jakarta.persistence.*`).
  - Prefer constructor-based dependency injection with `final` fields; disallow `@Autowired` on fields.
  - Configure Jackson with `SerializationFeature.WRITE_DATES_AS_TIMESTAMPS = false` and `JavaTimeModule` for ISO-8601 formatting.
