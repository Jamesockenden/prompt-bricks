import { CompileResult, PromptBrick, StackedBrickItem } from '../types/prompt';

export interface CompileOptions {
  includeBrickHeaders?: boolean;
  headerStyle?: 'markdown' | 'comment' | 'clean';
}

export function compilePrompt(
  stackedItems: StackedBrickItem[],
  bricksMap: Map<string, PromptBrick>,
  paramValues: Record<string, any>,
  options: CompileOptions = {}
): CompileResult {
  const { includeBrickHeaders = true, headerStyle = 'clean' } = options;
  const segments: CompileResult['segments'] = [];
  const unresolvedSet = new Set<string>();

  const activeItems = stackedItems.filter((item) => item.enabled);

  for (const item of activeItems) {
    const brick = bricksMap.get(item.brickId);
    if (!brick) continue;

    let text = brick.content;

    // 1. Process conditional blocks: {{#if param_name}}...{{/if}}
    text = text.replace(/\{\{#if\s+([a-zA-Z0-9_]+)\}\}([\s\S]*?)\{\{\/if\}\}/g, (_, varName, innerContent) => {
      const val = paramValues[varName];
      // Truthy check for booleans or non-empty strings/numbers
      if (val === true || (typeof val === 'string' && val.trim().length > 0 && val !== 'false') || typeof val === 'number') {
        return innerContent;
      }
      return '';
    });

    // 2. Process variable substitutions: {{param_name}}
    text = text.replace(/\{\{([a-zA-Z0-9_]+)\}\}/g, (match, varName) => {
      if (varName in paramValues && paramValues[varName] !== undefined && paramValues[varName] !== null) {
        return String(paramValues[varName]);
      }
      // Check brick default
      const foundParam = brick.params.find((p) => p.name === varName);
      if (foundParam && foundParam.defaultValue !== undefined) {
        return String(foundParam.defaultValue);
      }
      unresolvedSet.add(varName);
      return match; // Keep {{varName}} as placeholder
    });

    // Clean up excessive blank lines inside brick
    const cleanedText = text.trim();

    // Optionally wrap with brick boundary identifier
    let segmentText = cleanedText;
    if (includeBrickHeaders && headerStyle === 'comment') {
      segmentText = `<!-- [Brick: ${brick.path}] -->\n${cleanedText}`;
    } else if (includeBrickHeaders && headerStyle === 'markdown') {
      segmentText = `### [Brick] ${brick.title}\n*Path: \`${brick.path}\`*\n\n${cleanedText}`;
    }

    const words = segmentText.split(/\s+/).filter(Boolean).length;
    const tokens = Math.max(1, Math.round(segmentText.length / 4));

    segments.push({
      brickId: brick.id,
      brickTitle: brick.title,
      category: brick.category,
      text: segmentText,
      tokens
    });
  }

  const fullText = segments.map((s) => s.text).join('\n\n---\n\n');
  const totalWords = fullText.split(/\s+/).filter(Boolean).length;
  const totalChars = fullText.length;
  const totalTokens = Math.max(0, Math.round(totalChars / 4));

  return {
    fullText,
    tokenEstimate: totalTokens,
    wordCount: totalWords,
    charCount: totalChars,
    segments,
    unresolvedParams: Array.from(unresolvedSet)
  };
}
