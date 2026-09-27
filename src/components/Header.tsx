import React from 'react';
import { Layers, GitBranch, Download, History, Sparkles, FolderGit2 } from 'lucide-react';
import { PRESET_TEMPLATES } from '../data/presetTemplates';

interface HeaderProps {
  activeTab: 'workspace' | 'repo' | 'history' | 'export';
  setActiveTab: (tab: 'workspace' | 'repo' | 'history' | 'export') => void;
  onOpenSaveModal: () => void;
  onOpenExportModal: () => void;
  onLoadPreset: (presetId: string) => void;
  bricksCount: number;
  activeBricksCount: number;
  variationsCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenSaveModal,
  onOpenExportModal,
  onLoadPreset,
  bricksCount,
  activeBricksCount,
  variationsCount
}) => {
  return (
    <header className="border-b border-slate-800 bg-slate-950/90 backdrop-blur-md sticky top-0 z-40 px-4 lg:px-6 py-3">
      <div className="flex items-center justify-between gap-4">
        {/* Zone 1: Single text element wordmark + subtle repo indicator */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold text-base shadow-sm">
              🧱
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-bold tracking-tight text-white">
                  PromptBrick
                </span>
                <span className="text-xs text-slate-400 font-mono hidden sm:inline-flex items-center gap-1 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded">
                  <GitBranch className="w-3 h-3 text-emerald-400" />
                  main
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-900/80 p-1 rounded-lg border border-slate-800 text-xs font-medium">
          <button
            onClick={() => setActiveTab('workspace')}
            className={`px-3 py-1.5 rounded-md transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'workspace'
                ? 'bg-slate-800 text-white shadow-xs'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-emerald-400" />
            <span>Assembler Stack</span>
            <span className="text-slate-400 font-mono text-[11px] tabular-nums">
              ({activeBricksCount})
            </span>
          </button>

          <button
            onClick={() => setActiveTab('repo')}
            className={`px-3 py-1.5 rounded-md transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'repo'
                ? 'bg-slate-800 text-white shadow-xs'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <FolderGit2 className="w-3.5 h-3.5 text-sky-400" />
            <span>Repository Bricks</span>
            <span className="text-slate-400 font-mono text-[11px] tabular-nums">
              ({bricksCount})
            </span>
          </button>

          <button
            onClick={() => setActiveTab('history')}
            className={`px-3 py-1.5 rounded-md transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'history'
                ? 'bg-slate-800 text-white shadow-xs'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <History className="w-3.5 h-3.5 text-amber-400" />
            <span>Variations & Diff</span>
            <span className="text-slate-400 font-mono text-[11px] tabular-nums">
              ({variationsCount})
            </span>
          </button>
        </nav>

        {/* Zone 3: Primary Actions */}
        <div className="flex items-center gap-2">
          {/* Preset templates selector */}
          <div className="relative hidden lg:block">
            <select
              aria-label="Load preset Lego stack template"
              onChange={(e) => {
                if (e.target.value) {
                  onLoadPreset(e.target.value);
                  e.target.value = '';
                }
              }}
              defaultValue=""
              className="bg-slate-900 border border-slate-800 text-slate-300 text-xs rounded-lg px-2.5 py-1.5 pr-7 focus:outline-none focus:border-slate-700 cursor-pointer"
            >
              <option value="" disabled>⚡ Load Preset Stack...</option>
              {PRESET_TEMPLATES.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={onOpenSaveModal}
            className="px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-900 border border-slate-700/80 rounded-lg hover:bg-slate-800 hover:text-white transition-colors flex items-center gap-1.5 whitespace-nowrap"
          >
            <GitBranch className="w-3.5 h-3.5 text-emerald-400" />
            <span>Save Variation</span>
          </button>

          <button
            onClick={onOpenExportModal}
            className="px-3 py-1.5 text-xs font-medium text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors flex items-center gap-1.5 font-semibold whitespace-nowrap shadow-sm shadow-emerald-500/20"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Git Pages / Site</span>
          </button>
        </div>
      </div>
    </header>
  );
};
