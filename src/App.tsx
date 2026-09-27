import React, { useState, useMemo, useEffect } from 'react';
import { PromptBrick, StackedBrickItem, TemplateVariation } from './types/prompt';
import { DEFAULT_BRICKS } from './data/defaultBricks';
import { PRESET_TEMPLATES } from './data/presetTemplates';
import { compilePrompt } from './utils/compiler';
import {
  getStoredVariations,
  saveVariation,
  deleteVariation
} from './utils/versionControl';
import { Header } from './components/Header';
import { RepoExplorer } from './components/RepoExplorer';
import { AssemblyStack } from './components/AssemblyStack';
import { ChainedParamsPanel } from './components/ChainedParamsPanel';
import { PromptPreview } from './components/PromptPreview';
import { SaveVariationModal } from './components/SaveVariationModal';
import { VersionHistoryModal } from './components/VersionHistoryModal';
import { StaticExportModal } from './components/StaticExportModal';
import { NewBrickModal } from './components/NewBrickModal';
import { BrickPreviewModal } from './components/BrickPreviewModal';

const LOCAL_STORAGE_BRICKS_KEY = 'promptbrick_custom_bricks_v1';

export default function App() {
  // 1. Repository Bricks State
  const [bricks, setBricks] = useState<PromptBrick[]>(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_BRICKS_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_BRICKS;
  });

  const bricksMap = useMemo(() => {
    const map = new Map<string, PromptBrick>();
    for (const b of bricks) {
      map.set(b.id, b);
    }
    return map;
  }, [bricks]);

  // 2. Active Assembled Stack State
  // Default to the first preset (Java 21 Spring 3 Cloud Run Controller)
  const [stackedItems, setStackedItems] = useState<StackedBrickItem[]>(() => {
    const initialPreset = PRESET_TEMPLATES[0];
    return initialPreset.bricks.map((b) => ({ ...b }));
  });

  // 3. Parameter values
  const [paramValues, setParamValues] = useState<Record<string, any>>(() => {
    const initialPreset = PRESET_TEMPLATES[0];
    return { ...initialPreset.defaultParams };
  });

  // 4. Preview and layout configuration
  const [headerStyle, setHeaderStyle] = useState<'clean' | 'comment' | 'markdown'>('clean');
  const [activeTab, setActiveTab] = useState<'workspace' | 'repo' | 'history' | 'export'>('workspace');

  // 5. Version Control Variations
  const [variations, setVariations] = useState<TemplateVariation[]>(() => getStoredVariations());

  // 6. Modal States
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [isNewBrickModalOpen, setIsNewBrickModalOpen] = useState(false);
  const [previewBrick, setPreviewBrick] = useState<PromptBrick | null>(null);

  // Sync bricks to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_BRICKS_KEY, JSON.stringify(bricks));
    } catch (e) {
      console.error(e);
    }
  }, [bricks]);

  // Handle active brick IDs set for quick lookup
  const activeBrickIds = useMemo(() => {
    return new Set(stackedItems.map((i) => i.brickId));
  }, [stackedItems]);

  // REAL-TIME COMPILATION:
  // Updates immediately on any addition, removal, toggle, reordering, or parameter edit!
  const compileResult = useMemo(() => {
    return compilePrompt(stackedItems, bricksMap, paramValues, {
      includeBrickHeaders: true,
      headerStyle
    });
  }, [stackedItems, bricksMap, paramValues, headerStyle]);

  // Handlers for Stack manipulations
  const handleAddBrickToStack = (brickId: string, targetIndex?: number) => {
    const brick = bricksMap.get(brickId);
    if (!brick) return;

    const newItem: StackedBrickItem = {
      instanceId: `stack-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      brickId,
      enabled: true
    };

    // Auto-populate any default params for this brick if not yet present
    const updatedParams = { ...paramValues };
    for (const p of brick.params) {
      if (updatedParams[p.name] === undefined && p.defaultValue !== undefined) {
        updatedParams[p.name] = p.defaultValue;
      }
    }
    setParamValues(updatedParams);

    if (targetIndex !== undefined) {
      setStackedItems((prev) => {
        const next = [...prev];
        next.splice(targetIndex, 0, newItem);
        return next;
      });
    } else {
      setStackedItems((prev) => [...prev, newItem]);
    }
  };

  const handleToggleBrick = (instanceId: string) => {
    setStackedItems((prev) =>
      prev.map((item) =>
        item.instanceId === instanceId ? { ...item, enabled: !item.enabled } : item
      )
    );
  };

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    setStackedItems((prev) => {
      const next = [...prev];
      const temp = next[index - 1];
      next[index - 1] = next[index];
      next[index] = temp;
      return next;
    });
  };

  const handleMoveDown = (index: number) => {
    if (index >= stackedItems.length - 1) return;
    setStackedItems((prev) => {
      const next = [...prev];
      const temp = next[index + 1];
      next[index + 1] = next[index];
      next[index] = temp;
      return next;
    });
  };

  const handleRemoveBrick = (instanceId: string) => {
    setStackedItems((prev) => prev.filter((item) => item.instanceId !== instanceId));
  };

  const handleClearStack = () => {
    if (confirm('Clear all bricks from current Lego stack?')) {
      setStackedItems([]);
    }
  };

  const handleLoadPreset = (presetId: string) => {
    const preset = PRESET_TEMPLATES.find((p) => p.id === presetId);
    if (!preset) return;

    setStackedItems(preset.bricks.map((b) => ({ ...b, instanceId: `preset-${Date.now()}-${Math.random().toString(36).substring(2, 5)}` })));
    setParamValues((prev) => ({
      ...prev,
      ...preset.defaultParams
    }));
  };

  const handleParamChange = (paramName: string, value: any) => {
    setParamValues((prev) => ({
      ...prev,
      [paramName]: value
    }));
  };

  // Handlers for Brick creation and import
  const handleSaveNewBrick = (newBrick: PromptBrick) => {
    setBricks((prev) => [newBrick, ...prev]);
    handleAddBrickToStack(newBrick.id);
  };

  const handleImportBrickFile = async (file: File) => {
    try {
      const text = await file.text();
      let title = file.name.replace(/\.md$/, '');
      let description = 'Imported from local markdown file';
      let content = text;
      let category = 'tasks';
      const paramsList: any[] = [];

      // Check for YAML frontmatter
      const fmMatch = text.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
      if (fmMatch) {
        const rawFm = fmMatch[1];
        content = fmMatch[2];

        const titleMatch = rawFm.match(/title:\s*["']?([^"'\n]+)["']?/);
        if (titleMatch) title = titleMatch[1];

        const catMatch = rawFm.match(/category:\s*["']?([^"'\n]+)["']?/);
        if (catMatch) category = catMatch[1];

        const descMatch = rawFm.match(/description:\s*["']?([^"'\n]+)["']?/);
        if (descMatch) description = descMatch[1];
      }

      // Auto-detect {{variable}} parameters inside content
      const foundVars = Array.from(content.matchAll(/\{\{([a-zA-Z0-9_]+)\}\}/g)).map((m) => m[1]);
      const uniqueVars = Array.from(new Set(foundVars)).filter((v) => v !== '#if' && v !== '/if');

      for (const varName of uniqueVars) {
        paramsList.push({
          id: `param-${varName}`,
          name: varName,
          label: varName.replace(/_/g, ' '),
          type: 'string',
          defaultValue: '',
          description: `Extracted from {{${varName}}}`
        });
      }

      const importedBrick: PromptBrick = {
        id: `${category}/${file.name.replace(/\.md$/, '')}`,
        category,
        filename: file.name,
        path: `prompts/${category}/${file.name}`,
        title,
        description,
        tags: ['imported'],
        commitHash: Math.random().toString(36).substring(2, 9),
        lastModified: new Date().toISOString().slice(0, 10),
        author: 'importer',
        params: paramsList,
        content: content.trim()
      };

      setBricks((prev) => [importedBrick, ...prev]);
      handleAddBrickToStack(importedBrick.id);
    } catch (err) {
      console.error('Failed to import brick file', err);
      alert('Failed to parse markdown file.');
    }
  };

  // Handlers for Variations
  const handleSaveVariation = (info: {
    name: string;
    version: string;
    commitMessage: string;
    author: string;
  }) => {
    const saved = saveVariation({
      name: info.name,
      version: info.version,
      commitMessage: info.commitMessage,
      author: info.author,
      stackedBricks: [...stackedItems],
      paramValues: { ...paramValues },
      compiledSnapshot: compileResult.fullText
    });
    setVariations(getStoredVariations());
  };

  const handleRestoreVariation = (variation: TemplateVariation) => {
    setStackedItems(variation.stackedBricks.map((b) => ({ ...b })));
    setParamValues({ ...variation.paramValues });
  };

  const handleDeleteVariation = (id: string) => {
    const updated = deleteVariation(id);
    setVariations(updated);
  };

  // Categories list
  const existingCategories = Array.from(new Set(bricks.map((b) => b.category)));

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* 3-Zone Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          if (tab === 'history') setIsHistoryModalOpen(true);
          if (tab === 'export') setIsExportModalOpen(true);
        }}
        onOpenSaveModal={() => setIsSaveModalOpen(true)}
        onOpenExportModal={() => setIsExportModalOpen(true)}
        onLoadPreset={handleLoadPreset}
        bricksCount={bricks.length}
        activeBricksCount={stackedItems.filter((i) => i.enabled).length}
        variationsCount={variations.length}
      />

      {/* Main Workbench Layout: 3 Columns (Catalog, Lego Stack, Real-Time Preview) */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden h-[calc(100vh-53px)]">
        {/* Left Column: Repository Explorer (280px–320px) */}
        <div
          className={`w-full lg:w-80 shrink-0 h-full ${
            activeTab === 'repo' || activeTab === 'workspace' ? 'block' : 'hidden lg:block'
          }`}
        >
          <RepoExplorer
            bricks={bricks}
            activeBrickIds={activeBrickIds}
            onAddBrickToStack={(id) => handleAddBrickToStack(id)}
            onPreviewBrick={(b) => setPreviewBrick(b)}
            onOpenNewBrickModal={() => setIsNewBrickModalOpen(true)}
            onImportBrickFile={handleImportBrickFile}
          />
        </div>

        {/* Center Column: Lego Brick Pipeline Stack & Chained Parameters */}
        <div className="flex-1 flex flex-col h-full border-r border-slate-800/80 overflow-hidden bg-slate-950/40">
          <div className="flex-1 overflow-y-auto">
            <AssemblyStack
              stackedItems={stackedItems}
              bricksMap={bricksMap}
              availableBricks={bricks}
              onToggleBrick={handleToggleBrick}
              onMoveUp={handleMoveUp}
              onMoveDown={handleMoveDown}
              onRemoveBrick={handleRemoveBrick}
              onAddBrickToStack={handleAddBrickToStack}
              onClearStack={handleClearStack}
              onLoadPreset={handleLoadPreset}
            />
          </div>

          {/* Chained Parameter Controls */}
          <ChainedParamsPanel
            stackedItems={stackedItems}
            bricksMap={bricksMap}
            paramValues={paramValues}
            onParamChange={handleParamChange}
          />
        </div>

        {/* Right Column: Dedicated Real-time Preview Pane */}
        {/* Updates instantly with each addition, removal, toggle, or parameter tweak */}
        <div className="w-full lg:w-[480px] xl:w-[540px] shrink-0 h-full">
          <PromptPreview
            compileResult={compileResult}
            headerStyle={headerStyle}
            setHeaderStyle={setHeaderStyle}
            onOpenSaveModal={() => setIsSaveModalOpen(true)}
          />
        </div>
      </div>

      {/* Modals */}
      <SaveVariationModal
        isOpen={isSaveModalOpen}
        onClose={() => setIsSaveModalOpen(false)}
        onSave={handleSaveVariation}
        activeCount={stackedItems.filter((i) => i.enabled).length}
      />

      <VersionHistoryModal
        isOpen={isHistoryModalOpen}
        onClose={() => {
          setIsHistoryModalOpen(false);
          setActiveTab('workspace');
        }}
        variations={variations}
        currentCompiledText={compileResult.fullText}
        onRestoreVariation={handleRestoreVariation}
        onDeleteVariation={handleDeleteVariation}
        bricksMap={bricksMap}
      />

      <StaticExportModal
        isOpen={isExportModalOpen}
        onClose={() => {
          setIsExportModalOpen(false);
          setActiveTab('workspace');
        }}
        bricks={bricks}
        variations={variations}
      />

      <NewBrickModal
        isOpen={isNewBrickModalOpen}
        onClose={() => setIsNewBrickModalOpen(false)}
        onSaveBrick={handleSaveNewBrick}
        existingCategories={existingCategories}
      />

      <BrickPreviewModal
        brick={previewBrick}
        onClose={() => setPreviewBrick(null)}
        onAddToStack={(id) => handleAddBrickToStack(id)}
        isStacked={previewBrick ? activeBrickIds.has(previewBrick.id) : false}
      />
    </div>
  );
}
