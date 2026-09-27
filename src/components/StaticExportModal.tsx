import React, { useState } from 'react';
import { PromptBrick, TemplateVariation } from '../types/prompt';
import {
  generateStaticSiteFiles,
  downloadRepoZip,
  ExportFramework,
  GeneratedFile
} from '../utils/staticSiteExport';
import {
  Download,
  X,
  FileCode2,
  FolderTree,
  Terminal,
  Copy,
  Check,
  Globe,
  GitBranch,
  ExternalLink,
  BookOpen
} from 'lucide-react';

interface StaticExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  bricks: PromptBrick[];
  variations: TemplateVariation[];
}

export const StaticExportModal: React.FC<StaticExportModalProps> = ({
  isOpen,
  onClose,
  bricks,
  variations
}) => {
  const [framework, setFramework] = useState<ExportFramework>('jekyll');
  const [repoName, setRepoName] = useState('prompt-brick-service');
  const [selectedFilePath, setSelectedFilePath] = useState<string>('_config.yml');
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedGitCmds, setCopiedGitCmds] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  if (!isOpen) return null;

  const generatedFiles = generateStaticSiteFiles(bricks, variations, framework, repoName);
  const selectedFile =
    generatedFiles.find((f) => f.path === selectedFilePath) || generatedFiles[0];

  const gitCommands = `# 1. Initialize local repository
git init
git add .
git commit -m "feat: initialize prompt brick static site repository"
git branch -M main

# 2. Link your GitHub repository
git remote add origin https://github.com/YOUR_USERNAME/${repoName}.git
git push -u origin main

# 3. GitHub Pages is enabled automatically via .github/workflows/deploy.yml!`;

  const handleCopyFileCode = async () => {
    if (!selectedFile) return;
    await navigator.clipboard.writeText(selectedFile.content);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleCopyGitCommands = async () => {
    await navigator.clipboard.writeText(gitCommands);
    setCopiedGitCmds(true);
    setTimeout(() => setCopiedGitCmds(false), 2000);
  };

  const handleDownloadZip = async () => {
    setIsExporting(true);
    try {
      await downloadRepoZip(bricks, variations, framework, repoName);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-xl w-full max-w-5xl h-[88vh] shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-5 py-3.5 border-b border-slate-800 flex items-center justify-between shrink-0 bg-slate-950">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-semibold text-white">
              Static Site Framework & GitHub Pages Exporter
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Framework & Options Toolbar */}
        <div className="p-4 border-b border-slate-800 bg-slate-900/90 flex flex-wrap items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400 font-medium">Framework:</span>
            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
              <button
                onClick={() => {
                  setFramework('jekyll');
                  setSelectedFilePath('_config.yml');
                }}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                  framework === 'jekyll'
                    ? 'bg-emerald-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Jekyll (GitHub Pages Native)
              </button>
              <button
                onClick={() => {
                  setFramework('hugo');
                  setSelectedFilePath('hugo.toml');
                }}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                  framework === 'hugo'
                    ? 'bg-emerald-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Hugo (Fast Static Engine)
              </button>
              <button
                onClick={() => {
                  setFramework('gh-pages');
                  setSelectedFilePath('index.html');
                }}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                  framework === 'gh-pages'
                    ? 'bg-emerald-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Pure GitHub Pages SPA
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
              <span>Repo:</span>
              <input
                type="text"
                value={repoName}
                onChange={(e) => setRepoName(e.target.value.toLowerCase().replace(/\s+/g, '-'))}
                className="bg-slate-950 border border-slate-800 rounded px-2 py-1 text-slate-200 w-44 focus:outline-none focus:border-slate-700"
              />
            </div>

            <button
              onClick={handleDownloadZip}
              disabled={isExporting}
              className="px-4 py-1.5 text-xs font-semibold bg-emerald-400 hover:bg-emerald-300 text-slate-950 rounded-lg transition-colors flex items-center gap-1.5 shadow-sm shadow-emerald-500/20 disabled:opacity-50"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isExporting ? 'Generating ZIP...' : 'Download Complete Repo (.zip)'}</span>
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 flex overflow-hidden">
          {/* File Tree Sidebar */}
          <div className="w-72 border-r border-slate-800 bg-slate-950/70 flex flex-col">
            <div className="p-3 border-b border-slate-800 text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <FolderTree className="w-3.5 h-3.5 text-sky-400" />
              <span>Generated Repository Files ({generatedFiles.length})</span>
            </div>

            <div className="flex-1 overflow-y-auto p-2 space-y-1">
              {generatedFiles.map((file) => {
                const isSelected = file.path === selectedFile?.path;
                return (
                  <button
                    key={file.path}
                    onClick={() => setSelectedFilePath(file.path)}
                    className={`w-full text-left px-2.5 py-1.5 rounded-md text-xs font-mono transition-colors flex items-center justify-between group ${
                      isSelected
                        ? 'bg-slate-800 text-emerald-400 font-semibold border border-slate-700'
                        : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <FileCode2 className="w-3.5 h-3.5 shrink-0 text-slate-500 group-hover:text-slate-400" />
                      <span className="truncate">{file.path}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Quick Git deploy help */}
            <div className="p-3 border-t border-slate-800 bg-slate-950 text-[11px] text-slate-500 space-y-1.5">
              <div className="font-semibold text-slate-400 flex items-center gap-1">
                <BookOpen className="w-3 h-3 text-emerald-400" />
                <span>GitHub Pages Setup</span>
              </div>
              <p>
                Workflow <code className="text-slate-400">.github/workflows/deploy.yml</code> automatically builds and serves your prompts on every push to <code className="text-slate-400">main</code>.
              </p>
            </div>
          </div>

          {/* Center/Right: File Preview & Git Terminal Instructions */}
          <div className="flex-1 flex flex-col bg-slate-950 overflow-hidden">
            {/* File Header */}
            {selectedFile && (
              <div className="px-4 py-2.5 bg-slate-900/60 border-b border-slate-800 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2 font-mono text-xs text-slate-300">
                  <span className="text-slate-500">{selectedFile.category}</span>
                  <span className="text-slate-700">/</span>
                  <span className="font-semibold text-white">{selectedFile.path}</span>
                </div>

                <button
                  onClick={handleCopyFileCode}
                  className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-xs transition-colors flex items-center gap-1.5"
                >
                  {copiedCode ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy File Content</span>
                    </>
                  )}
                </button>
              </div>
            )}

            {/* File Source Viewer */}
            <div className="flex-1 overflow-y-auto p-4">
              {selectedFile ? (
                <pre className="font-mono text-xs text-slate-300 leading-relaxed bg-slate-900/40 p-4 rounded-xl border border-slate-800 overflow-x-auto selection:bg-emerald-500/30">
                  <code>{selectedFile.content}</code>
                </pre>
              ) : null}
            </div>

            {/* Bottom Git Quick Launch Box */}
            <div className="p-3 bg-slate-950 border-t border-slate-800 shrink-0">
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400">
                  <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Terminal Deploy Commands</span>
                </div>
                <button
                  onClick={handleCopyGitCommands}
                  className="text-[11px] text-emerald-400 hover:underline flex items-center gap-1"
                >
                  {copiedGitCmds ? '✓ Copied commands' : 'Copy git commands'}
                </button>
              </div>
              <pre className="font-mono text-[11px] text-slate-400 bg-slate-900/90 p-2 rounded border border-slate-800 overflow-x-auto">
                <code>{gitCommands}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
