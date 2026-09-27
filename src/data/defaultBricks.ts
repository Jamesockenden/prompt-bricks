import { PromptBrick } from '../types/prompt';

export const DEFAULT_BRICKS: PromptBrick[] = [
  {
    id: 'core/output-format-clean-code',
    category: 'core',
    filename: 'output-format-clean-code.md',
    path: 'prompts/core/output-format-clean-code.md',
    title: 'Output Format: Strict Clean Code',
    description: 'Enforces a single markdown code block, production-ready syntax, zero conversational fluff',
    tags: ['formatting', 'clean-code', 'strict', 'markdown'],
    commitHash: '3a9f02c',
    lastModified: '2026-09-18',
    author: 'architecture-guild',
    isCore: true,
    params: [
      {
        id: 'target_language',
        name: 'target_language',
        label: 'Target Code Language',
        type: 'string',
        defaultValue: 'java',
        placeholder: 'e.g. java, python, typescript, yaml',
        description: 'Language tag to apply to the main fenced block'
      },
      {
        id: 'enforce_single_block',
        name: 'enforce_single_block',
        label: 'Enforce Single Code Block',
        type: 'boolean',
        defaultValue: true,
        description: 'Disallow splitting into multiple intermediate blocks'
      },
      {
        id: 'include_file_path_header',
        name: 'include_file_path_header',
        label: 'Include Target File Path Comment',
        type: 'boolean',
        defaultValue: true,
        description: 'Prepend relative target file location at line 1'
      }
    ],
    content: `## Output Format & Code Delivery Rules

1. Provide the complete implementation inside a single fenced code block (\`\`\`{{target_language}} ... \`\`\`).
2. {{#if include_file_path_header}}The first line inside the code block MUST specify the exact relative file path as a language comment (e.g., \`// src/main/.../Target.java\`).{{/if}}
3. Do NOT omit implementation details using comments like "// TODO: implement", "// add rest here", or ellipsis (...). Write complete, compiling, and syntactically valid code.
4. Output ZERO introductory fluff ("Here is your code:"), ZERO conversational preambles, and ZERO concluding pleasantries. Return only the instructions and the code payload.
5. All public classes, interfaces, and methods must have standard documentation comments describing purpose and parameters.`
  },
  {
    id: 'core/architecture-guardrails',
    category: 'core',
    filename: 'architecture-guardrails.md',
    path: 'prompts/core/architecture-guardrails.md',
    title: 'Architecture Guardrails & Security',
    description: 'Zero inline secrets, 12-factor configuration, health probes, and structured JSON observability',
    tags: ['security', 'guardrails', 'cloud-native', 'observability'],
    commitHash: '8b1d44e',
    lastModified: '2026-09-20',
    author: 'infosec-platform',
    isCore: true,
    params: [
      {
        id: 'secret_manager_provider',
        name: 'secret_manager_provider',
        label: 'Secret Management System',
        type: 'select',
        defaultValue: 'GCP Secret Manager',
        options: ['GCP Secret Manager', 'HashiCorp Vault', 'AWS Secrets Manager', 'Kubernetes Secrets'],
        description: 'Backend for secret resolution'
      },
      {
        id: 'liveness_probe_path',
        name: 'liveness_probe_path',
        label: 'Liveness Probe Path',
        type: 'string',
        defaultValue: '/livez',
        description: 'HTTP probe for application liveness'
      },
      {
        id: 'readiness_probe_path',
        name: 'readiness_probe_path',
        label: 'Readiness Probe Path',
        type: 'string',
        defaultValue: '/readyz',
        description: 'HTTP probe for dependency readiness'
      }
    ],
    content: `## Cloud Architecture Guardrails

- **Zero Inline Secrets**: Strictly prohibit hardcoded credentials, API keys, database connection strings, or private tokens. All secrets must be loaded dynamically at runtime via {{secret_manager_provider}} and mapped via environment variables or workload identity bindings.
- **Graceful Shutdown**: Implement SIGTERM and SIGINT interceptors allowing in-flight requests a minimum of 25 seconds to drain cleanly before terminating.
- **Health Verification Probes**:
  - Expose \`{{liveness_probe_path}}\` for superficial process vitality.
  - Expose \`{{readiness_probe_path}}\` verifying downstream datastore, cache, and message broker connectivity.
- **Structured Observability**: All logs must emit single-line JSON adhering to OpenTelemetry semantic conventions, including \`trace_id\`, \`span_id\`, \`severity\`, \`service.name\`, and ISO-8601 timestamps. Never print raw stack traces directly to stdout.`
  },
  {
    id: 'stack/java21-spring3',
    category: 'stack',
    filename: 'java21-spring3.md',
    path: 'prompts/stack/java21-spring3.md',
    title: 'Stack: Java 21 & Spring Boot 3.3+',
    description: 'Modern Java features: immutable records, virtual threads, pattern matching, Jakarta EE 10',
    tags: ['java', 'spring-boot', 'virtual-threads', 'backend'],
    commitHash: 'c4e7191',
    lastModified: '2026-09-22',
    author: 'jvm-platform-team',
    params: [
      {
        id: 'spring_boot_version',
        name: 'spring_boot_version',
        label: 'Spring Boot Version',
        type: 'select',
        defaultValue: '3.3.4',
        options: ['3.3.4', '3.4.0-RC1', '3.2.10'],
        description: 'Target Spring Boot runtime version'
      },
      {
        id: 'use_virtual_threads',
        name: 'use_virtual_threads',
        label: 'Enable Virtual Threads (Project Loom)',
        type: 'boolean',
        defaultValue: true,
        description: 'Configure spring.threads.virtual.enabled=true for high concurrency I/O'
      },
      {
        id: 'reactive_mode',
        name: 'reactive_mode',
        label: 'Reactive (WebFlux) or Imperative (WebMVC)',
        type: 'select',
        defaultValue: 'Imperative + Virtual Threads',
        options: ['Imperative + Virtual Threads', 'Reactive WebFlux (Project Reactor)'],
        description: 'Concurrency and web framework architecture'
      }
    ],
    content: `## Technology Stack: Java 21 & Spring Boot {{spring_boot_version}}

- **Java 21 Language Features**:
  - Represent all request/response DTOs and domain events as immutable Java \`record\` classes.
  - Use sealed interfaces and switch pattern matching for exhaustive domain state transitions.
  - Rely on text blocks (\`"""\`) for inline SQL queries, JSON schemas, and templating.
- **Spring Boot Foundation**:
  {{#if use_virtual_threads}}
  - Enable Virtual Threads (\`spring.threads.virtual.enabled=true\`) for blocking I/O, eliminating legacy thread-pool tuning.
  {{/if}}
  - Framework mode: {{reactive_mode}}.
  - Use standard Jakarta EE 10 annotations (\`jakarta.validation.constraints.*\`, \`jakarta.persistence.*\`).
  - Prefer constructor-based dependency injection with \`final\` fields; disallow \`@Autowired\` on fields.
  - Configure Jackson with \`SerializationFeature.WRITE_DATES_AS_TIMESTAMPS = false\` and \`JavaTimeModule\` for ISO-8601 formatting.`
  },
  {
    id: 'stack/gcp-cloudrun',
    category: 'stack',
    filename: 'gcp-cloudrun.md',
    path: 'prompts/stack/gcp-cloudrun.md',
    title: 'Runtime: GCP Cloud Run Container Contract',
    description: 'Port 8080 binding, non-root execution, Workload Identity, fast startup optimization',
    tags: ['gcp', 'cloud-run', 'containers', 'serverless'],
    commitHash: '1e550bd',
    lastModified: '2026-09-24',
    author: 'cloud-infrastructure',
    params: [
      {
        id: 'port_binding',
        name: 'port_binding',
        label: 'HTTP Listener Port',
        type: 'number',
        defaultValue: 8080,
        description: 'Port read from the PORT environment variable'
      },
      {
        id: 'memory_limit',
        name: 'memory_limit',
        label: 'Container Memory Allocation',
        type: 'select',
        defaultValue: '1Gi',
        options: ['512Mi', '1Gi', '2Gi', '4Gi'],
        description: 'Memory allocated to Cloud Run instance'
      },
      {
        id: 'concurrency_limit',
        name: 'concurrency_limit',
        label: 'Max Concurrent Requests Per Instance',
        type: 'number',
        defaultValue: 80,
        description: 'Cloud Run request multiplexing cap'
      }
    ],
    content: `## Deployment Runtime: Google Cloud Run Contract

- **Port Binding**: The service MUST read the \`PORT\` environment variable and bind to \`0.0.0.0:{{port_binding}}\` (defaulting to {{port_binding}}).
- **Process Security**: Docker container must run as an unprivileged non-root user (e.g. \`USER 10001:10001\` or \`USER appuser\`).
- **Resource Constraints**:
  - Memory budget: \`{{memory_limit}}\`. Ensure JVM or runtime heap boundaries (\`-XX:MaxRAMPercentage=75.0\`) fit within this envelope without OOM termination.
  - Concurrency capacity: configured to handle \`{{concurrency_limit}}\` concurrent multiplexed streams.
- **Identity & Authorization**: Use GCP Workload Identity Federation. Under no circumstance should a service account JSON key file be packaged into the container image.`
  },
  {
    id: 'tasks/generate-controller',
    category: 'tasks',
    filename: 'generate-controller.md',
    path: 'prompts/tasks/generate-controller.md',
    title: 'Task: Generate RESTful API Controller',
    description: 'OpenAPI 3 tags, RFC 7807 ProblemDetail error responses, idempotency, pagination',
    tags: ['task', 'rest-api', 'controller', 'openapi'],
    commitHash: '9d21af8',
    lastModified: '2026-09-25',
    author: 'api-architecture',
    params: [
      {
        id: 'resource_name',
        name: 'resource_name',
        label: 'Entity / Resource Name',
        type: 'string',
        defaultValue: 'Order',
        placeholder: 'e.g. Customer, Order, Payment, Inventory',
        description: 'Primary domain resource managed by this endpoint'
      },
      {
        id: 'endpoint_base_path',
        name: 'endpoint_base_path',
        label: 'Endpoint Base URL Path',
        type: 'string',
        defaultValue: '/api/v1/orders',
        placeholder: '/api/v1/...',
        description: 'URI prefix for the controller route'
      },
      {
        id: 'enable_idempotency',
        name: 'enable_idempotency',
        label: 'Require Idempotency-Key Header on POST',
        type: 'boolean',
        defaultValue: true,
        description: 'Prevent double-billing or duplicate entity creation'
      },
      {
        id: 'enable_cursor_pagination',
        name: 'enable_cursor_pagination',
        label: 'Implement Keyset/Cursor Pagination',
        type: 'boolean',
        defaultValue: true,
        description: 'Provide after_cursor and limit parameters for collection queries'
      }
    ],
    content: `## Task: Implement Production REST Controller for {{resource_name}}

Implement the complete RESTful HTTP controller for \`{{resource_name}}\` mounted at \`{{endpoint_base_path}}\`:

1. **Standardized Endpoints**:
   - \`POST {{endpoint_base_path}}\`: Create new {{resource_name}}. Returns 201 Created with \`Location\` header.
   - \`GET {{endpoint_base_path}}/{id}\`: Fetch {{resource_name}} by UUID. Returns 200 OK or 404 Not Found.
   - \`GET {{endpoint_base_path}}\`: Query collection {{#if enable_cursor_pagination}}with cursor-based pagination (\`limit\`, \`cursor\`, \`next_cursor\`){{/if}}.
   - \`PUT {{endpoint_base_path}}/{id}\`: Complete replace / update with optimistic lock check.
   - \`DELETE {{endpoint_base_path}}/{id}\`: Idempotent soft deletion returning 204 No Content.

2. **Enterprise Contract & Error Handling**:
   - Annotate all endpoints with Swagger/OpenAPI 3 annotations (\`@Operation\`, \`@ApiResponse\`, \`@Tag\`).
   - Format all HTTP 4xx and 5xx errors conforming strictly to RFC 7807 (Problem Details for HTTP APIs).
   {{#if enable_idempotency}}
   - Require an \`Idempotency-Key\` header on the create endpoint, validating UUID format and short-circuiting replays with cached responses.
   {{/if}}
   - Validate incoming payloads using standard bean/model validation decorators.`
  },
  {
    id: 'tasks/generate-harness-step',
    category: 'tasks',
    filename: 'generate-harness-step.md',
    path: 'prompts/tasks/generate-harness-step.md',
    title: 'Task: CI/CD Pipeline & Harness Step',
    description: 'Automated container build, Trivy vulnerability scanning, SonarQube quality gate, canary rollouts',
    tags: ['cicd', 'harness', 'devops', 'security-scan'],
    commitHash: 'f72a110',
    lastModified: '2026-09-25',
    author: 'devops-enablement',
    params: [
      {
        id: 'pipeline_system',
        name: 'pipeline_system',
        label: 'CI/CD Platform',
        type: 'select',
        defaultValue: 'Harness CI/CD',
        options: ['Harness CI/CD', 'GitHub Actions Workflow', 'GitLab CI'],
        description: 'Target continuous deployment syntax'
      },
      {
        id: 'trivy_severity_threshold',
        name: 'trivy_severity_threshold',
        label: 'Trivy Scan Blocking Severity',
        type: 'select',
        defaultValue: 'HIGH,CRITICAL',
        options: ['CRITICAL', 'HIGH,CRITICAL', 'MEDIUM,HIGH,CRITICAL'],
        description: 'Vulnerability level that fails the build step'
      },
      {
        id: 'canary_traffic_split',
        name: 'canary_traffic_split',
        label: 'Initial Canary Traffic %',
        type: 'number',
        defaultValue: 10,
        description: 'Percentage of live traffic routed to the canary candidate'
      }
    ],
    content: `## Task: Define {{pipeline_system}} Deployment Pipeline Step

Generate a declarative configuration for the {{pipeline_system}} pipeline executing the following phases:

1. **Hermetic Container Build**:
   - Build multi-stage container leveraging buildkit cache mounts for dependencies.
   - Tag image with Git commit SHA and semantic version.
2. **Shift-Left Security Gate**:
   - Run Trivy vulnerability scan against generated image. Fail immediately if vulnerabilities matching \`{{trivy_severity_threshold}}\` are detected.
   - Execute static application security testing (SAST) and SonarQube quality gate (require zero blocker issues).
3. **Canary Deployment Rollout**:
   - Deploy candidate revision to the staging and production targets.
   - Route initial \`{{canary_traffic_split}}%\` live traffic to the canary revision.
   - Run automated synthetic health checks for 5 minutes (error rate < 0.1%, p99 latency < 200ms) before stepping up to 100% traffic.`
  },
  {
    id: 'tasks/generate-test-suite',
    category: 'tasks',
    filename: 'generate-test-suite.md',
    path: 'prompts/tasks/generate-test-suite.md',
    title: 'Task: Unit & Integration Test Suite',
    description: 'Unit and integration tests with Mockito, Testcontainers, and boundary coverage',
    tags: ['testing', 'junit5', 'testcontainers', 'quality'],
    commitHash: '2b4c89a',
    lastModified: '2026-09-26',
    author: 'qa-guild',
    params: [
      {
        id: 'test_framework',
        name: 'test_framework',
        label: 'Unit Test Framework',
        type: 'select',
        defaultValue: 'JUnit 5 + Mockito + AssertJ',
        options: ['JUnit 5 + Mockito + AssertJ', 'Spock Framework (Groovy)', 'pytest + pytest-mock'],
        description: 'Test runner and assertion library'
      },
      {
        id: 'target_coverage_percent',
        name: 'target_coverage_percent',
        label: 'Minimum Line/Branch Coverage %',
        type: 'number',
        defaultValue: 85,
        description: 'Target test coverage percentage'
      },
      {
        id: 'use_testcontainers',
        name: 'use_testcontainers',
        label: 'Use Real Containerized Dependencies (Testcontainers)',
        type: 'boolean',
        defaultValue: true,
        description: 'Spin up real Postgres or Kafka containers for integration tests'
      }
    ],
    content: `## Task: Generate Comprehensive Test Suite

Generate an exhaustive test suite using {{test_framework}} targeting a minimum of {{target_coverage_percent}}% branch coverage:

1. **Isolated Unit Tests**:
   - Mock all external ports and service boundaries.
   - Test both happy path and adversarial scenarios (null values, malformed inputs, boundary overflows, timeout errors).
   - Use parameterized tests (\`@ParameterizedTest\` / \`@ValueSource\`) for edge-case tabular data.
2. **Integration Tests**:
   {{#if use_testcontainers}}
   - Use real Testcontainers for all storage backends (e.g., PostgreSQL / Redis) to avoid brittle in-memory mock discrepancies.
   - Clean state between runs using transactional rollbacks or dynamic test database schemas.
   {{/if}}
   - Validate full HTTP lifecycle including authentication filters, JSON deserialization, and HTTP error response contracts.
3. **Assertions Style**:
   - Use fluent assertion statements (\`assertThat(...).isEqualTo(...)\`) with custom descriptive failure messages.`
  },
  {
    id: 'persona/staff-principal-architect',
    category: 'persona',
    filename: 'staff-principal-architect.md',
    path: 'prompts/persona/staff-principal-architect.md',
    title: 'Persona: Staff Principal Architect',
    description: 'Authoritative, defense-in-depth security mindset, enterprise resiliency, zero fluff',
    tags: ['persona', 'architecture', 'expert', 'rigor'],
    commitHash: '5e3309a',
    lastModified: '2026-09-15',
    author: 'leadership-council',
    params: [
      {
        id: 'system_tier',
        name: 'system_tier',
        label: 'System Criticality Tier',
        type: 'select',
        defaultValue: 'Tier 1 - Mission Critical',
        options: ['Tier 1 - Mission Critical', 'Tier 2 - Business Essential', 'Tier 3 - Internal Utility'],
        description: 'Defines rigor, SLA guarantees, and fallback requirements'
      }
    ],
    content: `## Architectural Stance & Persona

You are acting as a Staff Principal Cloud Architect. This application is designated as **{{system_tier}}**.
- Assume high concurrency, network unreliability, and adversarial traffic in all architectural choices.
- Favor explicit design over "magic" annotations or implicit defaults.
- Every architectural decision must prioritize operational observability, idempotency, data consistency, and disaster recoverability.`
  }
];
