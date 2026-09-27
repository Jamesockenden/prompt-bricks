import React, { useState } from 'react';
import { PromptBrick, BrickParam, BrickCategory } from '../types/prompt';
import { X, Plus, Trash2, FilePlus2, Sliders } from 'lucide-react';

interface NewBrickModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveBrick: (brick: PromptBrick) => void;
  existingCategories: string[];
}

export const NewBrickModal: React.FC<NewBrickModalProps> = ({
  isOpen,
  onClose,
  onSaveBrick,
  existingCategories
}) => {
  const [category, setCategory] = useState<BrickCategory>('tasks');
  const [customCategory, setCustomCategory] = useState('');
  const [filename, setFilename] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [content, setContent] = useState('');
  const [params, setParams] = useState<BrickParam[]>([]);

  if (!isOpen) return null;

  const handleAddParam = () => {
    setParams([
      ...params,
      {
        id: `param-${Date.now()}`,
        name: `var_${params.length + 1}`,
        label: `Variable ${params.length + 1}`,
        type: 'string',
        defaultValue: 'default_value',
        description: ''
      }
    ]);
  };

  const handleRemoveParam = (index: number) => {
    setParams(params.filter((_, i) => i !== index));
  };

  const handleUpdateParam = (index: number, updates: Partial<BrickParam>) => {
    setParams(
      params.map((p, i) => (i === index ? { ...p, ...updates } : p))
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    const chosenCategory = category === 'custom' ? customCategory.trim() || 'tasks' : category;
    const finalFilename = filename.trim().endsWith('.md')
      ? filename.trim()
      : `${filename.trim() || title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.md`;

    const id = `${chosenCategory}/${finalFilename.replace(/\.md$/, '')}`;
    const path = `prompts/${chosenCategory}/${finalFilename}`;

    const newBrick: PromptBrick = {
      id,
      category: chosenCategory,
      filename: finalFilename,
      path,
      title: title.trim(),
      description: description.trim(),
      tags: tags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
      commitHash: Math.random().toString(36).substring(2, 9),
      lastModified: new Date().toISOString().slice(0, 10),
      author: 'local-developer',
      params,
      content: content.trim()
    };

    onSaveBrick(newBrick);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-xl w-full max-w-3xl max-h-[90vh] shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="px-5 py-3.5 border-b border-slate-800 flex items-center justify-between shrink-0 bg-slate-950">
          <div className="flex items-center gap-2">
            <FilePlus2 className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-semibold text-white">Create New Prompt Brick</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Folder Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-slate-700 cursor-pointer"
              >
                {existingCategories.map((c) => (
                  <option key={c} value={c}>
                    prompts/{c}/
                  </option>
                ))}
                <option value="custom">+ Create New Category...</option>
              </select>

              {category === 'custom' && (
                <input
                  type="text"
                  placeholder="e.g. guardrails, persona, compliance"
                  value={customCategory}
                  onChange={(e) => setCustomCategory(e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, ''))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-200 mt-2 focus:outline-none focus:border-slate-700"
                />
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                File Name
              </label>
              <input
                type="text"
                placeholder="e.g. security-boundary-check.md"
                value={filename}
                onChange={(e) => setFilename(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs font-mono text-slate-200 focus:outline-none focus:border-slate-700"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Brick Title
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Task: Generate OpenAPI Specification"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-slate-700"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Short Description
            </label>
            <input
              type="text"
              placeholder="One line summary of what this brick instructs or constrains"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-slate-700"
            />
          </div>

          {/* Configurable Parameters Section */}
          <div className="border border-slate-800 rounded-lg p-3 bg-slate-950/60">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-300">
                <Sliders className="w-3.5 h-3.5 text-sky-400" />
                <span>Configurable Parameters (Variables)</span>
              </div>
              <button
                type="button"
                onClick={handleAddParam}
                className="px-2 py-1 bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700/80 rounded text-[11px] font-medium flex items-center gap-1 transition-colors"
              >
                <Plus className="w-3 h-3 text-emerald-400" />
                <span>Add Variable</span>
              </button>
            </div>

            {params.length === 0 ? (
              <p className="text-[11px] text-slate-500 py-1">
                No variables declared. Use <code className="text-slate-400">{"{{variable_name}}"}</code> in your markdown to inject dynamic values.
              </p>
            ) : (
              <div className="space-y-2">
                {params.map((p, idx) => (
                  <div key={p.id} className="p-2.5 rounded bg-slate-900 border border-slate-800 flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="param_name"
                      value={p.name}
                      onChange={(e) => handleUpdateParam(idx, { name: e.target.value })}
                      className="w-1/4 bg-slate-950 border border-slate-800 rounded px-2 py-1 text-xs font-mono text-emerald-400 focus:outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Human Label"
                      value={p.label}
                      onChange={(e) => handleUpdateParam(idx, { label: e.target.value })}
                      className="w-1/4 bg-slate-950 border border-slate-800 rounded px-2 py-1 text-xs text-slate-200 focus:outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Default Value"
                      value={String(p.defaultValue)}
                      onChange={(e) => handleUpdateParam(idx, { defaultValue: e.target.value })}
                      className="w-1/4 bg-slate-950 border border-slate-800 rounded px-2 py-1 text-xs text-slate-300 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveParam(idx)}
                      className="p-1 text-slate-500 hover:text-rose-400 transition-colors ml-auto"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Markdown Instructions Content
            </label>
            <textarea
              required
              rows={8}
              placeholder={`## Instructions or Rules\n\n1. Do something specific with {{var_1}}.\n2. Ensure zero secrets and high test coverage.`}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs font-mono text-slate-200 focus:outline-none focus:border-slate-700 leading-relaxed"
            />
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
              className="px-4 py-1.5 text-xs font-semibold bg-emerald-400 hover:bg-emerald-300 text-slate-950 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Save Brick to Repository</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
