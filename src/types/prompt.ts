export type BrickCategory = 'core' | 'stack' | 'tasks' | 'persona' | 'guardrails' | string;

export interface BrickParam {
  id: string;
  name: string;
  label: string;
  type: 'string' | 'number' | 'select' | 'boolean' | 'multiline';
  defaultValue: string | number | boolean;
  placeholder?: string;
  options?: string[];
  description?: string;
}

export interface PromptBrick {
  id: string;
  category: BrickCategory;
  filename: string;
  path: string;
  title: string;
  description: string;
  content: string;
  params: BrickParam[];
  tags: string[];
  commitHash: string;
  lastModified: string;
  author: string;
  isCore?: boolean;
}

export interface StackedBrickItem {
  instanceId: string;
  brickId: string;
  enabled: boolean;
  notes?: string;
}

export interface TemplateVariation {
  id: string;
  name: string;
  version: string;
  commitMessage: string;
  timestamp: number;
  author: string;
  stackedBricks: StackedBrickItem[];
  paramValues: Record<string, any>;
  compiledSnapshot: string;
}

export interface CompileResult {
  fullText: string;
  tokenEstimate: number;
  wordCount: number;
  charCount: number;
  segments: {
    brickId: string;
    brickTitle: string;
    category: string;
    text: string;
    tokens: number;
  }[];
  unresolvedParams: string[];
}
