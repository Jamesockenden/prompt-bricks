import React, { useState } from 'react';
import { PromptBrick } from '../types/prompt';
import {
  Folder,
  FolderOpen,
  FileCode2,
  Plus,
  Eye,
  Search,
  Upload,
  Layers,
  ChevronRight,
  ChevronDown,
  Check
} from 'lucide-react';

interface RepoExplorerProps {
  bricks: PromptBrick[];
  activeBrickIds: Set<string>;
  onAddBrickToStack: (brickId: string) => void;
  onPreviewBrick: (brick: PromptBrick) => void;
  onOpenNewBrickModal: () => void;
  onImportBrickFile: (file: File) => void;
}

export const RepoExplorer: React.FC<RepoExplorerProps> = ({
  bricks,
  activeBrickIds,
  onAddBrickToStack,
  onPreviewBrick,
  onOpenNewBrickModal,
  onImportBrickFile
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({
    core: true,
    stack: true,
    tasks: true,
    persona: true
  });

  const toggleFolder = (folder: string) => {
    setExpandedFolders((prev) => ({
      ...prev,
      [folder]: !prev[folder]
    }));
  };

  // Group bricks by category
  const categories = Array.from(new Set(bricks.map((b) => b.category)));

  const filteredBricks = bricks.filter((brick) => {
    const matchesCategory = selectedCategory === 'all' || brick.category === selectedCategory;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      brick.title.toLowerCase().includes(q) ||
      brick.filename.toLowerCase().includes(q) ||
      brick.description.toLowerCase().includes(q) ||
      brick.tags.some((t) => t.toLowerCase().includes(q)) ||
      brick.params.some((p) => p.name.toLowerCase().includes(q));

    return matchesCategory && matchesSearch;
  });

  const bricksByCategory = categories.reduce<Record<string, PromptBrick[]>>((acc, cat) => {
    acc[cat] = filteredBricks.filter((b) => b.category === cat);
    return acc;
  }, {});

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImportBrickFile(file);
      e.target.value = '';
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-950 border-r border-slate-800/80">
      {/* Search and Filter Bar */}
      <div className="p-3 border-b border-slate-800/80 space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-300">
            <Folder className="w-3.5 h-3.5 text-sky-400" />
            <span>prompts/</span>
          </div>
          <div className="flex items-center gap-1">
            <label className="p-1 text-slate-400 hover:text-slate-200 hover:bg-slate-900 rounded cursor-pointer transition-colors" title="Import Markdown Brick">
              <Upload className="w-3.5 h-3.5" />
              <input type="file" accept=".md,.markdown" className="hidden" onChange={handleFileUpload} />
            </label>
            <button
              onClick={onOpenNewBrickModal}
              className="px-2 py-1 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700/80 rounded text-[11px] font-medium flex items-center gap-1 transition-colors"
              title="Create New Prompt Brick"
            >
              <Plus className="w-3 h-3 text-emerald-400" />
              <span>New Brick</span>
            </button>
          </div>
        </div>

        {/* Search input */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-2.5" />
          <input
            type="text"
            placeholder="Search bricks, variables, tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900/90 border border-slate-800 rounded-md pl-8 pr-2.5 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-slate-700"
          />
        </div>

        {/* Category Filter Pills (Functional Filter Tabs) */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 text-[11px] scrollbar-none">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-2 py-0.5 rounded transition-colors whitespace-nowrap ${
              selectedCategory === 'all'
                ? 'bg-slate-800 text-white font-medium border border-slate-700'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            All ({bricks.length})
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2 py-0.5 rounded transition-colors capitalize whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-slate-800 text-white font-medium border border-slate-700'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {cat} ({bricks.filter((b) => b.category === cat).length})
            </button>
          ))}
        </div>
      </div>

      {/* Directory Tree & Brick Catalog */}
      <div className="flex-1 overflow-y-auto p-2 space-y-3 divide-y divide-slate-900">
        {categories.map((cat) => {
          const categoryBricks = bricksByCategory[cat] || [];
          if (categoryBricks.length === 0 && searchQuery) return null;

          const isExpanded = expandedFolders[cat] ?? true;

          return (
            <div key={cat} className="pt-2 first:pt-0">
              {/* Folder header */}
              <button
                onClick={() => toggleFolder(cat)}
                className="w-full flex items-center justify-between px-2 py-1 rounded text-xs font-semibold text-slate-300 hover:bg-slate-900/60 transition-colors group"
              >
                <div className="flex items-center gap-1.5">
                  {isExpanded ? (
                    <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                  ) : (
                    <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                  )}
                  {isExpanded ? (
                    <FolderOpen className="w-3.5 h-3.5 text-sky-400" />
                  ) : (
                    <Folder className="w-3.5 h-3.5 text-sky-400/80" />
                  )}
                  <span className="font-mono text-slate-200">{cat}/</span>
                </div>
                <span className="text-[11px] font-mono text-slate-500 group-hover:text-slate-400">
                  {categoryBricks.length} {categoryBricks.length === 1 ? 'file' : 'files'}
                </span>
              </button>

              {/* Folder contents */}
              {isExpanded && (
                <div className="mt-1 pl-4 space-y-1">
                  {categoryBricks.map((brick) => {
                    const isStacked = activeBrickIds.has(brick.id);

                    return (
                      <div
                        key={brick.id}
                        className={`p-2 rounded-lg border transition-all text-xs group relative ${
                          isStacked
                            ? 'bg-slate-900/90 border-emerald-500/30 shadow-xs'
                            : 'bg-slate-900/40 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/70'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-1.5">
                              <FileCode2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                              <span className="font-mono text-slate-300 truncate font-medium">
                                {brick.filename}
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-400 font-sans mt-0.5 line-clamp-1">
                              {brick.title}
                            </p>
                          </div>

                          <div className="flex items-center gap-1 shrink-0">
                            <button
                              onClick={() => onPreviewBrick(brick)}
                              className="p-1 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded transition-colors"
                              title="Preview Raw Brick & Schema"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => onAddBrickToStack(brick.id)}
                              className={`p-1 rounded transition-colors flex items-center gap-1 text-[11px] font-medium ${
                                isStacked
                                  ? 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20'
                                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
                              }`}
                              title={isStacked ? 'Add another instance to stack' : 'Add brick to stack'}
                            >
                              {isStacked ? (
                                <Check className="w-3.5 h-3.5" />
                              ) : (
                                <Plus className="w-3.5 h-3.5 text-emerald-400" />
                              )}
                            </button>
                          </div>
                        </div>

                        {/* Unboxed metadata separator */}
                        <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-mono mt-1.5">
                          <span>{brick.params.length} params</span>
                          <span aria-hidden="true">·</span>
                          <span>{brick.lastModified}</span>
                          <span aria-hidden="true">·</span>
                          <span>{brick.commitHash}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}

        {filteredBricks.length === 0 && (
          <div className="p-6 text-center text-slate-500 text-xs">
            <p>No prompt bricks found matching "{searchQuery}"</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="mt-2 text-emerald-400 hover:underline"
            >
              Reset filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
