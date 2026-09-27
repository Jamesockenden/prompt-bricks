import React, { useState } from 'react';
import { GitBranch, GitCommit, X, Check } from 'lucide-react';
import { StackedBrickItem } from '../types/prompt';

interface SaveVariationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (variation: {
    name: string;
    version: string;
    commitMessage: string;
    author: string;
  }) => void;
  activeCount: number;
}

export const SaveVariationModal: React.FC<SaveVariationModalProps> = ({
  isOpen,
  onClose,
  onSave,
  activeCount
}) => {
  const [name, setName] = useState('');
  const [version, setVersion] = useState('v1.0.0');
  const [commitMessage, setCommitMessage] = useState('');
  const [author, setAuthor] = useState('engineer@company.internal');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !commitMessage.trim()) return;

    onSave({
      name: name.trim(),
      version: version.trim(),
      commitMessage: commitMessage.trim(),
      author: author.trim()
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-xl w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="px-5 py-3.5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GitBranch className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-semibold text-white">Save Template Variation</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Variation Name
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Java 21 Cloud Run CRUD Controller"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-slate-700"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Version Tag
              </label>
              <input
                type="text"
                required
                placeholder="v1.0.0"
                value={version}
                onChange={(e) => setVersion(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs font-mono text-slate-200 focus:outline-none focus:border-slate-700"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Author
              </label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-slate-700"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Git Commit Message
            </label>
            <textarea
              required
              rows={2}
              placeholder="feat(prompts): add strict clean code and virtual threads guardrail"
              value={commitMessage}
              onChange={(e) => setCommitMessage(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 placeholder-slate-500 font-mono focus:outline-none focus:border-slate-700"
            />
          </div>

          <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800 text-[11px] text-slate-400">
            This will record a git commit snapshot containing all <strong className="text-slate-200">{activeCount} active prompt bricks</strong>, their exact sequence, and current parameter valuations for reproducible rollback.
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 text-xs text-slate-400 hover:text-slate-200 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 text-xs font-medium bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-semibold rounded-lg transition-colors flex items-center gap-1.5"
            >
              <GitCommit className="w-3.5 h-3.5" />
              <span>Commit Variation</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
