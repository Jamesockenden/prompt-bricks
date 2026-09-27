import React from 'react';
import { PromptBrick } from '../types/prompt';
import { X, FileCode2, Plus, Check, GitCommit, User, Calendar, Sliders } from 'lucide-react';

interface BrickPreviewModalProps {
  brick: PromptBrick | null;
  onClose: () => void;
  onAddToStack: (brickId: string) => void;
  isStacked: boolean;
}

export const BrickPreviewModal: React.FC<BrickPreviewModalProps> = ({
  brick,
  onClose,
  onAddToStack,
  isStacked
}) => {
  if (!brick) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-xl w-full max-w-3xl max-h-[85vh] shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-5 py-3.5 border-b border-slate-800 flex items-center justify-between shrink-0 bg-slate-950">
          <div className="flex items-center gap-2">
            <FileCode2 className="w-4 h-4 text-sky-400" />
            <span className="font-mono text-xs text-slate-400">{brick.path}</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base font-bold text-white">{brick.title}</span>
              <span className="px-2 py-0.5 rounded text-[11px] font-mono capitalize bg-slate-800 text-slate-300 border border-slate-700">
                {brick.category}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">{brick.description}</p>

            <div className="flex items-center gap-3 text-xs text-slate-500 font-mono mt-2.5">
              <span className="flex items-center gap-1">
                <GitCommit className="w-3 h-3 text-emerald-400" />
                {brick.commitHash}
              </span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1">
                <User className="w-3 h-3" />
                {brick.author}
              </span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {brick.lastModified}
              </span>
            </div>
          </div>

          {/* Configurable Parameters */}
          {brick.params.length > 0 && (
            <div className="border border-slate-800 rounded-lg p-3 bg-slate-950/60">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 mb-2">
                <Sliders className="w-3.5 h-3.5 text-sky-400" />
                <span>Configurable Template Parameters</span>
              </div>
              <div className="space-y-1.5">
                {brick.params.map((p) => (
                  <div
                    key={p.name}
                    className="p-2 rounded bg-slate-900/60 border border-slate-800/80 flex items-start justify-between text-xs font-mono"
                  >
                    <div>
                      <span className="text-emerald-400 font-semibold">{`{{${p.name}}}`}</span>
                      <span className="text-slate-500 text-[11px] ml-2">({p.type})</span>
                      <p className="text-slate-400 text-[11px] font-sans mt-0.5">{p.description}</p>
                    </div>
                    <div className="text-right shrink-0 ml-3">
                      <span className="text-[10px] text-slate-500">default:</span>{' '}
                      <span className="text-slate-300 font-semibold">{String(p.defaultValue)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Raw Markdown Template */}
          <div>
            <div className="text-xs font-semibold text-slate-400 mb-1.5">
              Raw Markdown Content
            </div>
            <pre className="font-mono text-xs text-slate-300 leading-relaxed bg-slate-950 p-4 rounded-xl border border-slate-800 overflow-x-auto whitespace-pre-wrap">
              <code>{brick.content}</code>
            </pre>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-slate-800 bg-slate-950 flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            className="px-3 py-1.5 text-xs text-slate-400 hover:text-slate-200 transition-colors"
          >
            Close
          </button>
          <button
            onClick={() => {
              onAddToStack(brick.id);
              onClose();
            }}
            className="px-4 py-1.5 text-xs font-semibold bg-emerald-400 hover:bg-emerald-300 text-slate-950 rounded-lg transition-colors flex items-center gap-1.5"
          >
            {isStacked ? (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>Add Another Instance to Stack</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>Add Brick to Stack</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
