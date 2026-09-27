import React, { useState } from 'react';
import { TemplateVariation, PromptBrick } from '../types/prompt';
import { computeTextDiff, DiffLine } from '../utils/versionControl';
import {
  History,
  GitCommit,
  GitBranch,
  X,
  RotateCcw,
  Trash2,
  Calendar,
  User,
  ArrowRight,
  FileDiff,
  Check
} from 'lucide-react';

interface VersionHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  variations: TemplateVariation[];
  currentCompiledText: string;
  onRestoreVariation: (variation: TemplateVariation) => void;
  onDeleteVariation: (id: string) => void;
  bricksMap: Map<string, PromptBrick>;
}

export const VersionHistoryModal: React.FC<VersionHistoryModalProps> = ({
  isOpen,
  onClose,
  variations,
  currentCompiledText,
  onRestoreVariation,
  onDeleteVariation,
  bricksMap
}) => {
  const [selectedVariationId, setSelectedVariationId] = useState<string>(
    variations[0]?.id || ''
  );

  if (!isOpen) return null;

  const selectedVariation = variations.find((v) => v.id === selectedVariationId) || variations[0];

  // Compute diff between selected variation's compiled snapshot and current active working prompt
  const diffLines: DiffLine[] = selectedVariation
    ? computeTextDiff(selectedVariation.compiledSnapshot, currentCompiledText)
    : [];

  const addedCount = diffLines.filter((l) => l.type === 'added').length;
  const removedCount = diffLines.filter((l) => l.type === 'removed').length;

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-xl w-full max-w-5xl h-[85vh] shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="px-5 py-3.5 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <History className="w-4 h-4 text-amber-400" />
            <h3 className="text-sm font-semibold text-white">
              Template Version Control & Diff Viewer
            </h3>
            <span className="text-xs text-slate-500 font-mono">
              ({variations.length} saved commits)
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left column: Variations Commit Log */}
          <div className="w-80 border-r border-slate-800 flex flex-col bg-slate-950/50">
            <div className="p-3 border-b border-slate-800 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Commit History
            </div>
            <div className="flex-1 overflow-y-auto p-2 space-y-1.5">
              {variations.map((v) => {
                const isSelected = v.id === selectedVariation?.id;
                const dateStr = new Date(v.timestamp).toLocaleDateString(undefined, {
                  month: 'short',
                  day: 'numeric'
                });

                return (
                  <div
                    key={v.id}
                    onClick={() => setSelectedVariationId(v.id)}
                    className={`p-2.5 rounded-lg border text-xs cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-slate-800 border-emerald-500/40 shadow-xs'
                        : 'bg-slate-900/40 border-slate-800/80 hover:bg-slate-900 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono text-emerald-400 text-xs font-bold">
                        {v.version}
                      </span>
                      <span className="text-[10px] text-slate-500 font-mono">
                        {dateStr}
                      </span>
                    </div>

                    <div className="font-medium text-slate-200 truncate">
                      {v.name}
                    </div>

                    <div className="text-[11px] font-mono text-slate-400 truncate mt-1">
                      {v.commitMessage}
                    </div>

                    <div className="flex items-center justify-between mt-2 text-[10px] text-slate-500 font-mono">
                      <span>{v.stackedBricks.length} bricks</span>
                      <span className="truncate max-w-[120px]">{v.author}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right column: Selected Variation Inspector & Diff */}
          {selectedVariation ? (
            <div className="flex-1 flex flex-col overflow-hidden bg-slate-950">
              {/* Variation Detail Bar */}
              <div className="p-4 border-b border-slate-800 bg-slate-900/60 flex items-start justify-between gap-4 shrink-0">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-base font-bold text-white">
                      {selectedVariation.name}
                    </span>
                    <span className="px-2 py-0.5 rounded font-mono text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
                      {selectedVariation.version}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 font-mono mt-1">
                    commit: {selectedVariation.commitMessage}
                  </p>
                  <div className="flex items-center gap-3 text-xs text-slate-500 mt-2 font-mono">
                    <span className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {selectedVariation.author}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(selectedVariation.timestamp).toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => {
                      if (confirm(`Restore variation "${selectedVariation.name}"? This will update your current Lego stack.`)) {
                        onRestoreVariation(selectedVariation);
                        onClose();
                      }
                    }}
                    className="px-3 py-1.5 text-xs font-medium bg-emerald-500 text-slate-950 hover:bg-emerald-400 font-semibold rounded-lg transition-colors flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Restore Variation to Stack</span>
                  </button>

                  <button
                    onClick={() => {
                      if (confirm(`Delete variation ${selectedVariation.version}?`)) {
                        onDeleteVariation(selectedVariation.id);
                      }
                    }}
                    className="p-1.5 text-slate-500 hover:text-rose-400 transition-colors"
                    title="Delete variation"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Diff summary banner */}
              <div className="px-4 py-2 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
                <div className="flex items-center gap-2">
                  <FileDiff className="w-3.5 h-3.5 text-sky-400" />
                  <span>
                    Diff: Snapshot ({selectedVariation.version}) <ArrowRight className="w-3 h-3 inline text-slate-500" /> Current Working Prompt
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-emerald-400">+{addedCount} lines</span>
                  <span className="text-rose-400">-{removedCount} lines</span>
                </div>
              </div>

              {/* Diff content view */}
              <div className="flex-1 overflow-y-auto p-4 font-mono text-xs leading-relaxed space-y-0.5">
                {diffLines.length === 0 ? (
                  <div className="text-center py-12 text-slate-500">
                    Working prompt is identical to this saved snapshot.
                  </div>
                ) : (
                  diffLines.map((line, idx) => (
                    <div
                      key={idx}
                      className={`flex items-start px-2 py-0.5 rounded-sm ${
                        line.type === 'added'
                          ? 'bg-emerald-950/40 text-emerald-300'
                          : line.type === 'removed'
                          ? 'bg-rose-950/40 text-rose-300 line-through opacity-70'
                          : 'text-slate-400'
                      }`}
                    >
                      <span className="w-6 text-[10px] text-slate-600 select-none shrink-0">
                        {line.type === 'added' ? '+' : line.type === 'removed' ? '-' : ' '}
                      </span>
                      <span className="w-10 text-[10px] text-slate-600 select-none text-right pr-3 shrink-0 tabular-nums">
                        {line.newLineNumber || line.oldLineNumber || ''}
                      </span>
                      <span className="flex-1 break-all whitespace-pre-wrap">
                        {line.content || ' '}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center text-slate-500 text-xs">
              Select a version commit from the history on the left.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
