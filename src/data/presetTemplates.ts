import { StackedBrickItem } from '../types/prompt';

export interface PresetTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  bricks: StackedBrickItem[];
  defaultParams: Record<string, any>;
}

export const PRESET_TEMPLATES: PresetTemplate[] = [
  {
    id: 'java-spring3-cloudrun-crud',
    name: 'Java 21 + Spring Boot 3 + Cloud Run Controller',
    description: 'Production-ready REST controller with Virtual Threads, GCP Cloud Run contract, and strict clean code output',
    category: 'Backend Microservices',
    bricks: [
      { instanceId: 'p-1', brickId: 'core/output-format-clean-code', enabled: true },
      { instanceId: 'p-2', brickId: 'core/architecture-guardrails', enabled: true },
      { instanceId: 'p-3', brickId: 'stack/java21-spring3', enabled: true },
      { instanceId: 'p-4', brickId: 'stack/gcp-cloudrun', enabled: true },
      { instanceId: 'p-5', brickId: 'tasks/generate-controller', enabled: true }
    ],
    defaultParams: {
      target_language: 'java',
      resource_name: 'PaymentTransaction',
      endpoint_base_path: '/api/v1/payments',
      spring_boot_version: '3.3.4',
      use_virtual_threads: true,
      port_binding: 8080,
      memory_limit: '1Gi',
      secret_manager_provider: 'GCP Secret Manager'
    }
  },
  {
    id: 'enterprise-testcontainers-suite',
    name: 'JUnit 5 & Testcontainers Test Suite',
    description: 'Isolated unit and integration test suite with high branch coverage and containerized dependencies',
    category: 'Quality & Testing',
    bricks: [
      { instanceId: 'p-10', brickId: 'core/output-format-clean-code', enabled: true },
      { instanceId: 'p-11', brickId: 'stack/java21-spring3', enabled: true },
      { instanceId: 'p-12', brickId: 'tasks/generate-test-suite', enabled: true }
    ],
    defaultParams: {
      target_language: 'java',
      test_framework: 'JUnit 5 + Mockito + AssertJ',
      target_coverage_percent: 90,
      use_testcontainers: true
    }
  },
  {
    id: 'cloudrun-harness-pipeline',
    name: 'GCP Cloud Run + Harness CI/CD Pipeline',
    description: 'Shift-left security pipeline with Trivy vulnerability gates and canary deployment traffic splits',
    category: 'DevOps & CI/CD',
    bricks: [
      { instanceId: 'p-20', brickId: 'persona/staff-principal-architect', enabled: true },
      { instanceId: 'p-21', brickId: 'core/output-format-clean-code', enabled: true },
      { instanceId: 'p-22', brickId: 'stack/gcp-cloudrun', enabled: true },
      { instanceId: 'p-23', brickId: 'tasks/generate-harness-step', enabled: true }
    ],
    defaultParams: {
      target_language: 'yaml',
      pipeline_system: 'Harness CI/CD',
      trivy_severity_threshold: 'HIGH,CRITICAL',
      canary_traffic_split: 15,
      system_tier: 'Tier 1 - Mission Critical'
    }
  }
];
