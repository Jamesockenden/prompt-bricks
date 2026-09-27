import React from 'react';
import { PromptBrick, StackedBrickItem, BrickParam } from '../types/prompt';
import { Sliders, Link2, Info } from 'lucide-react';

interface ChainedParamsPanelProps {
  stackedItems: StackedBrickItem[];
  bricksMap: Map<string, PromptBrick>;
  paramValues: Record<string, any>;
  onParamChange: (paramName: string, value: any) => void;
}

interface MergedParam extends BrickParam {
  consumingBricks: string[];
}

export const ChainedParamsPanel: React.FC<ChainedParamsPanelProps> = ({
  stackedItems,
  bricksMap,
  paramValues,
  onParamChange
}) => {
  // Extract all parameters required by currently enabled bricks
  const activeItems = stackedItems.filter((i) => i.enabled);
  const paramMap = new Map<string, MergedParam>();

  for (const item of activeItems) {
    const brick = bricksMap.get(item.brickId);
    if (!brick) continue;

    for (const p of brick.params) {
      if (paramMap.has(p.name)) {
        const existing = paramMap.get(p.name)!;
        if (!existing.consumingBricks.includes(brick.filename)) {
          existing.consumingBricks.push(brick.filename);
        }
      } else {
        paramMap.set(p.name, {
          ...p,
          consumingBricks: [brick.filename]
        });
      }
    }
  }

  const mergedParams = Array.from(paramMap.values());

  if (mergedParams.length === 0) {
    return (
      <div className="p-4 text-center border-t border-slate-800/80 bg-slate-950/40 text-slate-500 text-xs">
        No configurable parameters in the current active bricks.
      </div>
    );
  }

  return (
    <div className="border-t border-slate-800 bg-slate-950/80 p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Sliders className="w-3.5 h-3.5 text-sky-400" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
            Chained Template Parameters
          </h3>
        </div>
        <div className="flex items-center gap-1 text-[11px] text-slate-500 font-mono">
          <Link2 className="w-3 h-3 text-emerald-400" />
          <span>{mergedParams.length} parameters chained across active bricks</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {mergedParams.map((param) => {
          const currentValue =
            paramValues[param.name] !== undefined
              ? paramValues[param.name]
              : param.defaultValue;

          const isShared = param.consumingBricks.length > 1;

          return (
            <div
              key={param.name}
              className={`p-2.5 rounded-lg border text-xs transition-colors ${
                isShared
                  ? 'bg-slate-900/90 border-sky-500/30'
                  : 'bg-slate-900/50 border-slate-800'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <label className="font-medium text-slate-200 text-xs">
                  {param.label}
                </label>
                {isShared && (
                  <span className="text-[10px] text-sky-400 font-mono flex items-center gap-0.5" title={`Chained in: ${param.consumingBricks.join(', ')}`}>
                    <Link2 className="w-2.5 h-2.5" />
                    Chained ({param.consumingBricks.length})
                  </span>
                )}
              </div>

              <div className="mt-1">
                {param.type === 'select' && param.options ? (
                  <select
                    value={currentValue}
                    onChange={(e) => onParamChange(param.name, e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-slate-700 cursor-pointer"
                  >
                    {param.options.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                ) : param.type === 'boolean' ? (
                  <label className="flex items-center gap-2 cursor-pointer mt-1 py-1">
                    <input
                      type="checkbox"
                      checked={Boolean(currentValue)}
                      onChange={(e) => onParamChange(param.name, e.target.checked)}
                      className="rounded bg-slate-950 border-slate-700 text-emerald-500 focus:ring-0 focus:ring-offset-0 cursor-pointer"
                    />
                    <span className="text-slate-300 text-xs font-mono">
                      {Boolean(currentValue) ? 'true (enabled)' : 'false (disabled)'}
                    </span>
                  </label>
                ) : param.type === 'number' ? (
                  <input
                    type="number"
                    value={currentValue}
                    onChange={(e) => onParamChange(param.name, Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-slate-200 font-mono focus:outline-none focus:border-slate-700"
                  />
                ) : (
                  <input
                    type="text"
                    value={currentValue}
                    placeholder={param.placeholder || `Enter ${param.name}`}
                    onChange={(e) => onParamChange(param.name, e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-slate-200 font-mono focus:outline-none focus:border-slate-700"
                  />
                )}
              </div>

              {/* Param description and variable name */}
              <div className="flex items-center justify-between mt-1.5 text-[10px] text-slate-400">
                <span className="font-mono text-slate-400">
                  {`{{${param.name}}}`}
                </span>
                <span className="truncate max-w-[140px]" title={param.consumingBricks.join(', ')}>
                  in {param.consumingBricks.join(', ')}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
