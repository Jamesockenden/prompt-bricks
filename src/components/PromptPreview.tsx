import React, { useState } from 'react';
import { CompileResult } from '../types/prompt';
import {
  Copy,
  Check,
  Download,
  Eye,
  Layers,
  Code2,
  ListFilter,
  Sparkles,
  WrapText,
  FileDown,
  Info
} from 'lucide-react';

interface PromptPreviewProps {
  compileResult: CompileResult;
  headerStyle: 'clean' | 'markdown' | 'comment';
  setHeaderStyle: (style: 'clean' | 'markdown' | 'comment') => void;
  onOpenSaveModal: () => void;
}

export const PromptPreview: React.FC<PromptPreviewProps> = ({
  compileResult,
  headerStyle,
  setHeaderStyle,
  onOpenSaveModal
}) => {
  const [viewMode, setViewMode] = useState<'combined' | 'blocks' | 'variables'>('combined');
  const [copied, setCopied] = useState(false);
  const [wrapLines, setWrapLines] = useState(true);

  const handleCopy = async () => {
    if (!compileResult.fullText) return;
    try {
      await navigator.clipboard.writeText(compileResult.fullText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const textarea = document.createElement('textarea');
      textarea.value = compileResult.fullText;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    if (!compileResult.fullText) return;
    const blob = new Blob([compileResult.fullText], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `assembled-prompt-${new Date().toISOString().slice(0, 10)}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col h-full bg-slate-950 border-l border-slate-800">
      {/* Real-time Preview Pane Header */}
      <div className="p-3 border-b border-slate-800 bg-slate-950/95 sticky top-0 z-10 space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Live Assembled Preview
            </h2>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setWrapLines(!wrapLines)}
              className={`p-1.5 rounded transition-colors text-xs flex items-center gap-1 ${
                wrapLines ? 'bg-slate-800 text-slate-200' : 'text-slate-500 hover:text-slate-300'
              }`}
              title="Toggle line wrapping"
            >
              <WrapText className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={handleDownload}
              disabled={!compileResult.fullText}
              className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-900 rounded disabled:opacity-30 transition-colors"
              title="Download compiled .md prompt"
            >
              <FileDown className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={handleCopy}
              disabled={!compileResult.fullText}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-all flex items-center gap-1.5 ${
                copied
                  ? 'bg-emerald-500 text-slate-950 font-semibold shadow-xs'
                  : 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/30'
              } disabled:opacity-40 disabled:pointer-events-none`}
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Prompt</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Real-time Metrics Bar (Tabular figures) */}
        <div className="flex items-center justify-between text-[11px] font-mono bg-slate-900/80 px-2.5 py-1.5 rounded border border-slate-800 text-slate-400">
          <div className="flex items-center gap-3">
            <span>
              Tokens: <strong className="text-emerald-400 tabular-nums font-semibold">~{compileResult.tokenEstimate}</strong>
            </span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>
              Words: <strong className="text-slate-300 tabular-nums">{compileResult.wordCount}</strong>
            </span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>
              Chars: <strong className="text-slate-300 tabular-nums">{compileResult.charCount}</strong>
            </span>
          </div>

          <div className="text-slate-400">
            <span>{compileResult.segments.length} bricks active</span>
          </div>
        </div>

        {/* View Mode & Separator Selectors */}
        <div className="flex items-center justify-between gap-2 pt-0.5">
          {/* Sub-view switcher */}
          <div className="flex items-center gap-1 p-0.5 bg-slate-900 rounded border border-slate-800 text-[11px]">
            <button
              onClick={() => setViewMode('combined')}
              className={`px-2 py-0.5 rounded transition-colors ${
                viewMode === 'combined'
                  ? 'bg-slate-800 text-white font-medium'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Combined Text
            </button>
            <button
              onClick={() => setViewMode('blocks')}
              className={`px-2 py-0.5 rounded transition-colors ${
                viewMode === 'blocks'
                  ? 'bg-slate-800 text-white font-medium'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Brick Blocks ({compileResult.segments.length})
            </button>
          </div>

          {/* Separator style */}
          <div className="flex items-center gap-1 text-[11px]">
            <span className="text-slate-500">Headers:</span>
            <select
              aria-label="Brick separation header style"
              value={headerStyle}
              onChange={(e) => setHeaderStyle(e.target.value as any)}
              className="bg-slate-900 border border-slate-800 text-slate-300 rounded px-1.5 py-0.5 text-[11px] focus:outline-none cursor-pointer"
            >
              <option value="clean">Clean (---)</option>
              <option value="comment">&lt;!-- Brick --&gt;</option>
              <option value="markdown">### Headers</option>
            </select>
          </div>
        </div>
      </div>

      {/* Real-time Content Viewport */}
      <div className="flex-1 overflow-y-auto p-4">
        {compileResult.segments.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-8 text-slate-500 space-y-2">
            <div className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400">
              <Code2 className="w-5 h-5" />
            </div>
            <p className="text-xs text-slate-400 font-medium">No bricks in the assembly pipeline</p>
            <p className="text-[11px] text-slate-400 max-w-xs">
              Add prompt bricks from the catalog or stack pipeline on the left. The combined prompt will compile here instantaneously.
            </p>
          </div>
        ) : viewMode === 'combined' ? (
          <div className="relative">
            <pre
              className={`font-mono text-xs text-slate-200 bg-slate-900/60 p-4 rounded-xl border border-slate-800/80 leading-relaxed selection:bg-emerald-500/30 ${
                wrapLines ? 'whitespace-pre-wrap break-words' : 'whitespace-pre overflow-x-auto'
              }`}
            >
              <code>{compileResult.fullText}</code>
            </pre>

            {compileResult.unresolvedParams.length > 0 && (
              <div className="mt-3 p-2.5 bg-amber-500/10 border border-amber-500/20 rounded-lg text-xs text-amber-300 flex items-start gap-2">
                <Info className="w-4 h-4 shrink-0 mt-0.5 text-amber-400" />
                <div>
                  <span className="font-semibold">Unresolved variables detected: </span>
                  <span className="font-mono text-[11px]">
                    {compileResult.unresolvedParams.map((p) => `{{${p}}}`).join(', ')}
                  </span>
                  <p className="text-[10px] text-amber-400/80 mt-0.5">
                    These will remain as literal placeholders in the compiled output until specified in the parameters panel.
                  </p>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Segmented Brick Blocks View */
          <div className="space-y-4">
            {compileResult.segments.map((segment, idx) => (
              <div
                key={`${segment.brickId}-${idx}`}
                className="rounded-xl border border-slate-800 bg-slate-900/70 overflow-hidden"
              >
                <div className="px-3 py-2 bg-slate-900 border-b border-slate-800/80 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded bg-slate-800 text-slate-300 font-mono text-[10px] font-bold flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <span className="font-semibold text-slate-200">
                      {segment.brickTitle}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400">
                    <span className="text-slate-400 capitalize">{segment.category}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-emerald-400">~{segment.tokens} tokens</span>
                  </div>
                </div>

                <div className="p-3">
                  <pre
                    className={`font-mono text-xs text-slate-300 ${
                      wrapLines ? 'whitespace-pre-wrap break-words' : 'whitespace-pre overflow-x-auto'
                    }`}
                  >
                    <code>{segment.text}</code>
                  </pre>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
