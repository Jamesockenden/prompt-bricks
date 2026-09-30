---
title: "Task: Unit & Integration Test Suite"
category: "Layer 4: Task Specification"
filename: "generate-test-suite.md"
prompt_version: "1.0.0"
path: "prompts/4-task-specification/testing/generate-test-suite.md"
description: "Unit and integration tests with Mockito, Testcontainers, and boundary coverage"
tags: ["testing","junit5","testcontainers","quality"]
commitHash: "2b4c89a"
lastModified: "2026-09-26"
author: "AI Generated"
params: [{"id":"test_framework","name":"test_framework","label":"Unit Test Framework","type":"select","defaultValue":"JUnit 5 + Mockito + AssertJ","options":["JUnit 5 + Mockito + AssertJ","Spock Framework (Groovy)","pytest + pytest-mock"],"description":"Test runner and assertion library"},{"id":"target_coverage_percent","name":"target_coverage_percent","label":"Minimum Line/Branch Coverage %","type":"number","defaultValue":85,"description":"Target test coverage percentage"},{"id":"use_testcontainers","name":"use_testcontainers","label":"Use Real Containerized Dependencies (Testcontainers)","type":"boolean","defaultValue":true,"description":"Spin up real Postgres or Kafka containers for integration tests"}]
---

## Task: Generate Comprehensive Test Suite

Generate an exhaustive test suite using {{test_framework}} targeting a minimum of {{target_coverage_percent}}% branch coverage:

1. **Isolated Unit Tests**:
   - Mock all external ports and service boundaries.
   - Test both happy path and adversarial scenarios (null values, malformed inputs, boundary overflows, timeout errors).
   - Use parameterized tests (`@ParameterizedTest` / `@ValueSource`) for edge-case tabular data.
2. **Integration Tests**:
   {{#if use_testcontainers}}
   - Use real Testcontainers for all storage backends (e.g., PostgreSQL / Redis) to avoid brittle in-memory mock discrepancies.
   - Clean state between runs using transactional rollbacks or dynamic test database schemas.
   {{/if}}
   - Validate full HTTP lifecycle including authentication filters, JSON deserialization, and HTTP error response contracts.
3. **Assertions Style**:
   - Use fluent assertion statements (`assertThat(...).isEqualTo(...)`) with custom descriptive failure messages.
