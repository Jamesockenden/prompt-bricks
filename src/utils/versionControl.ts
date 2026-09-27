import { TemplateVariation, StackedBrickItem } from '../types/prompt';

const STORAGE_KEY = 'promptbrick_variations_v1';

export const INITIAL_VARIATIONS: TemplateVariation[] = [
  {
    id: 'var-init-01',
    name: 'Base Java 21 Cloud Run Endpoint',
    version: 'v1.0.0',
    commitMessage: 'feat: initial production controller prompt for GCP Cloud Run',
    timestamp: Date.now() - 86400000 * 3, // 3 days ago
    author: 'iamjamesockenden@gmail.com',
    stackedBricks: [
      { instanceId: 'init-1', brickId: 'core/output-format-clean-code', enabled: true },
      { instanceId: 'init-2', brickId: 'core/architecture-guardrails', enabled: true },
      { instanceId: 'init-3', brickId: 'stack/java21-spring3', enabled: true },
      { instanceId: 'init-4', brickId: 'stack/gcp-cloudrun', enabled: true },
      { instanceId: 'init-5', brickId: 'tasks/generate-controller', enabled: true }
    ],
    paramValues: {
      target_language: 'java',
      resource_name: 'CustomerAccount',
      endpoint_base_path: '/api/v1/accounts',
      spring_boot_version: '3.3.4',
      use_virtual_threads: true,
      port_binding: 8080,
      memory_limit: '1Gi',
      secret_manager_provider: 'GCP Secret Manager'
    },
    compiledSnapshot: `## Output Format & Code Delivery Rules

1. Provide the complete implementation inside a single fenced code block (\`\`\`java ... \`\`\`).
2. The first line inside the code block MUST specify the exact relative file path as a language comment (e.g., \`// src/main/.../Target.java\`).
3. Do NOT omit implementation details using comments like "// TODO: implement". Write complete, compiling, and syntactically valid code.
4. Output ZERO introductory fluff, ZERO conversational preambles, and ZERO concluding pleasantries. Return only the instructions and the code payload.

---

## Cloud Architecture Guardrails

- **Zero Inline Secrets**: Strictly prohibit hardcoded credentials. All secrets must be loaded dynamically at runtime via GCP Secret Manager.
- **Graceful Shutdown**: Implement SIGTERM interceptors allowing 25 seconds to drain cleanly.
- **Health Verification Probes**: Expose /livez and /readyz probes.
- **Structured Observability**: All logs must emit single-line JSON adhering to OpenTelemetry semantic conventions.`
  },
  {
    id: 'var-init-02',
    name: 'CI/CD Pipeline with Trivy Scan',
    version: 'v1.1.0',
    commitMessage: 'feat(cicd): add automated Trivy vulnerability gate and canary steps',
    timestamp: Date.now() - 86400000 * 1, // 1 day ago
    author: 'iamjamesockenden@gmail.com',
    stackedBricks: [
      { instanceId: 'init-10', brickId: 'persona/staff-principal-architect', enabled: true },
      { instanceId: 'init-11', brickId: 'core/output-format-clean-code', enabled: true },
      { instanceId: 'init-12', brickId: 'stack/gcp-cloudrun', enabled: true },
      { instanceId: 'init-13', brickId: 'tasks/generate-harness-step', enabled: true }
    ],
    paramValues: {
      target_language: 'yaml',
      pipeline_system: 'Harness CI/CD',
      trivy_severity_threshold: 'HIGH,CRITICAL',
      canary_traffic_split: 10,
      system_tier: 'Tier 1 - Mission Critical'
    },
    compiledSnapshot: `## Architectural Stance & Persona

You are acting as a Staff Principal Cloud Architect. This application is designated as **Tier 1 - Mission Critical**.

---

## Output Format & Code Delivery Rules

1. Provide the complete implementation inside a single fenced code block (\`\`\`yaml ... \`\`\`).`
  }
];

export function getStoredVariations(): TemplateVariation[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_VARIATIONS));
      return INITIAL_VARIATIONS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_VARIATIONS;
  }
}

export function saveVariation(variation: Omit<TemplateVariation, 'id' | 'timestamp'>): TemplateVariation {
  const variations = getStoredVariations();
  const newVariation: TemplateVariation = {
    ...variation,
    id: `var-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 6)}`,
    timestamp: Date.now()
  };
  const updated = [newVariation, ...variations];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return newVariation;
}

export function deleteVariation(id: string): TemplateVariation[] {
  const variations = getStoredVariations().filter((v) => v.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(variations));
  return variations;
}

export interface DiffLine {
  type: 'added' | 'removed' | 'unchanged';
  content: string;
  oldLineNumber?: number;
  newLineNumber?: number;
}

/**
 * Computes line-by-line diff between two text blocks
 */
export function computeTextDiff(oldText: string, newText: string): DiffLine[] {
  const oldLines = oldText.split('\n');
  const newLines = newText.split('\n');
  const result: DiffLine[] = [];

  let i = 0;
  let j = 0;

  while (i < oldLines.length || j < newLines.length) {
    if (i < oldLines.length && j < newLines.length) {
      if (oldLines[i] === newLines[j]) {
        result.push({
          type: 'unchanged',
          content: oldLines[i],
          oldLineNumber: i + 1,
          newLineNumber: j + 1
        });
        i++;
        j++;
      } else {
        // Look ahead
        const nextMatchInNew = newLines.indexOf(oldLines[i], j);
        const nextMatchInOld = oldLines.indexOf(newLines[j], i);

        if (nextMatchInNew !== -1 && (nextMatchInOld === -1 || nextMatchInNew - j < nextMatchInOld - i)) {
          // Lines inserted in new
          result.push({
            type: 'added',
            content: newLines[j],
            newLineNumber: j + 1
          });
          j++;
        } else if (nextMatchInOld !== -1) {
          // Lines deleted in old
          result.push({
            type: 'removed',
            content: oldLines[i],
            oldLineNumber: i + 1
          });
          i++;
        } else {
          // Replace line
          result.push({
            type: 'removed',
            content: oldLines[i],
            oldLineNumber: i + 1
          });
          result.push({
            type: 'added',
            content: newLines[j],
            newLineNumber: j + 1
          });
          i++;
          j++;
        }
      }
    } else if (i < oldLines.length) {
      result.push({
        type: 'removed',
        content: oldLines[i],
        oldLineNumber: i + 1
      });
      i++;
    } else if (j < newLines.length) {
      result.push({
        type: 'added',
        content: newLines[j],
        newLineNumber: j + 1
      });
      j++;
    }
  }

  return result;
}
