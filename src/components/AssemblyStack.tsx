import React, { useState } from 'react';
import { PromptBrick, StackedBrickItem } from '../types/prompt';
import {
  GripVertical,
  ChevronUp,
  ChevronDown,
  Trash2,
  Sliders,
  Plus,
  Layers,
  Sparkles,
  ToggleLeft,
  ToggleRight,
  Info
} from 'lucide-react';
import { PRESET_TEMPLATES } from '../data/presetTemplates';

interface AssemblyStackProps {
  stackedItems: StackedBrickItem[];
  bricksMap: Map<string, PromptBrick>;
  availableBricks: PromptBrick[];
  onToggleBrick: (instanceId: string) => void;
  onMoveUp: (index: number) => void;
  onMoveDown: (index: number) => void;
  onRemoveBrick: (instanceId: string) => void;
  onAddBrickToStack: (brickId: string, targetIndex?: number) => void;
  onClearStack: () => void;
  onLoadPreset: (presetId: string) => void;
}

export const AssemblyStack: React.FC<AssemblyStackProps> = ({
  stackedItems,
  bricksMap,
  availableBricks,
  onToggleBrick,
  onMoveUp,
  onMoveDown,
  onRemoveBrick,
  onAddBrickToStack,
  onClearStack,
  onLoadPreset
}) => {
  const [insertDropdownIndex, setInsertDropdownIndex] = useState<number | null>(null);

  const activeCount = stackedItems.filter((i) => i.enabled).length;

  return (
    <div className="flex flex-col h-full bg-slate-950/60 overflow-y-auto">
      {/* Workbench Header */}
      <div className="p-3 border-b border-slate-800 flex items-center justify-between sticky top-0 bg-slate-950/90 backdrop-blur-xs z-10">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-emerald-400" />
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-300">
            Lego Stack Pipeline
          </h2>
          <span className="text-[11px] text-slate-500 font-mono tabular-nums">
            {activeCount}/{stackedItems.length} active
          </span>
        </div>

        <div className="flex items-center gap-2">
          {stackedItems.length > 0 && (
            <button
              onClick={onClearStack}
              className="text-[11px] text-slate-500 hover:text-rose-400 transition-colors"
            >
              Clear Stack
            </button>
          )}
        </div>
      </div>

      {/* Stack Items */}
      <div className="p-4 space-y-3 flex-1">
        {stackedItems.length === 0 ? (
          <div className="border border-dashed border-slate-800 rounded-xl p-8 text-center flex flex-col items-center justify-center my-6">
            <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-xl mb-3">
              🧱
            </div>
            <h3 className="text-sm font-semibold text-slate-200">No Bricks Stacked</h3>
            <p className="text-xs text-slate-500 max-w-sm mt-1 mb-4">
              Add prompt bricks from the repository on the left, or kickstart with a standard engineering preset.
            </p>

            <div className="flex flex-wrap gap-2 justify-center max-w-md">
              {PRESET_TEMPLATES.map((p) => (
                <button
                  key={p.id}
                  onClick={() => onLoadPreset(p.id)}
                  className="px-3 py-1.5 text-xs bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700/80 rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <Sparkles className="w-3 h-3 text-emerald-400" />
                  <span>{p.name}</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          stackedItems.map((item, index) => {
            const brick = bricksMap.get(item.brickId);
            if (!brick) return null;

            return (
              <React.Fragment key={item.instanceId}>
                {/* Brick Item Card */}
                <div
                  className={`rounded-xl border transition-all duration-150 relative ${
                    item.enabled
                      ? 'bg-slate-900/90 border-slate-700/80 shadow-sm'
                      : 'bg-slate-900/30 border-slate-800/60 opacity-60'
                  }`}
                >
                  {/* Lego top pin accents (Tactile visual motif) */}
                  <div className="absolute -top-1.5 left-6 flex gap-1.5">
                    <span
                      className={`w-3 h-1.5 rounded-t-sm ${
                        item.enabled ? 'bg-slate-700' : 'bg-slate-800'
                      }`}
                    />
                    <span
                      className={`w-3 h-1.5 rounded-t-sm ${
                        item.enabled ? 'bg-slate-700' : 'bg-slate-800'
                      }`}
                    />
                  </div>

                  <div className="p-3.5 flex items-start gap-3">
                    {/* Index & Category indicator */}
                    <div className="flex flex-col items-center gap-1 pt-0.5">
                      <span className="text-[10px] font-mono text-slate-500 font-bold">
                        #{index + 1}
                      </span>
                      <div className="flex flex-col gap-0.5 mt-1">
                        <button
                          onClick={() => onMoveUp(index)}
                          disabled={index === 0}
                          className="p-0.5 text-slate-500 hover:text-slate-200 disabled:opacity-20 disabled:hover:text-slate-500 transition-colors"
                          title="Move Brick Up"
                        >
                          <ChevronUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onMoveDown(index)}
                          disabled={index === stackedItems.length - 1}
                          className="p-0.5 text-slate-500 hover:text-slate-200 disabled:opacity-20 disabled:hover:text-slate-500 transition-colors"
                          title="Move Brick Down"
                        >
                          <ChevronDown className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Brick Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-mono text-[11px] text-slate-400 capitalize">
                          {brick.category}
                        </span>
                        <span className="text-slate-600 text-xs">/</span>
                        <span className="font-mono text-xs text-slate-200 font-medium truncate">
                          {brick.filename}
                        </span>
                        {brick.isCore && (
                          <span className="text-[10px] text-amber-400 font-medium">
                            [Core Guardrail]
                          </span>
                        )}
                      </div>

                      <h4 className="text-xs font-semibold text-white mt-1">
                        {brick.title}
                      </h4>
                      <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-2">
                        {brick.description}
                      </p>

                      {/* Params summary */}
                      {brick.params.length > 0 && (
                        <div className="flex items-center gap-1.5 mt-2 text-[10px] text-slate-400 font-mono">
                          <Sliders className="w-3 h-3 text-sky-400" />
                          <span>
                            Parameters: {brick.params.map((p) => p.name).join(', ')}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Action Controls */}
                    <div className="flex items-center gap-2 shrink-0 pt-0.5">
                      {/* Active toggle */}
                      <button
                        onClick={() => onToggleBrick(item.instanceId)}
                        className={`transition-colors p-1 rounded ${
                          item.enabled
                            ? 'text-emerald-400 hover:text-emerald-300'
                            : 'text-slate-600 hover:text-slate-400'
                        }`}
                        title={item.enabled ? 'Disable brick in output' : 'Enable brick in output'}
                      >
                        {item.enabled ? (
                          <ToggleRight className="w-5 h-5" />
                        ) : (
                          <ToggleLeft className="w-5 h-5" />
                        )}
                      </button>

                      {/* Remove */}
                      <button
                        onClick={() => onRemoveBrick(item.instanceId)}
                        className="p-1 text-slate-500 hover:text-rose-400 transition-colors"
                        title="Remove brick from stack"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Insertion Connector between bricks */}
                <div className="flex items-center justify-center -my-1 py-1 relative z-5">
                  <div className="w-px h-3 bg-slate-800" />
                  <div className="relative">
                    <button
                      onClick={() =>
                        setInsertDropdownIndex(
                          insertDropdownIndex === index ? null : index
                        )
                      }
                      className="px-2 py-0.5 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200 rounded-full text-[10px] flex items-center gap-1 transition-colors"
                      title="Insert brick at this position"
                    >
                      <Plus className="w-2.5 h-2.5 text-emerald-400" />
                      <span>Insert Brick</span>
                    </button>

                    {insertDropdownIndex === index && (
                      <div className="absolute top-6 left-1/2 -translate-x-1/2 w-64 bg-slate-900 border border-slate-700 rounded-lg shadow-xl p-2 z-30 max-h-56 overflow-y-auto">
                        <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider px-2 py-1 border-b border-slate-800 mb-1">
                          Select Brick to Insert
                        </div>
                        {availableBricks.map((b) => (
                          <button
                            key={b.id}
                            onClick={() => {
                              onAddBrickToStack(b.id, index + 1);
                              setInsertDropdownIndex(null);
                            }}
                            className="w-full text-left px-2 py-1.5 rounded hover:bg-slate-800 text-xs text-slate-300 hover:text-white flex items-center justify-between"
                          >
                            <span className="truncate">{b.title}</span>
                            <span className="text-[10px] font-mono text-slate-500">
                              {b.category}
                            </span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="w-px h-3 bg-slate-800" />
                </div>
              </React.Fragment>
            );
          })
        )}
      </div>
    </div>
  );
};
