
import React from 'react';
import { ModelConfig, ModelTier } from '../types';
import { Icons } from '../constants';

interface ModelCardProps {
  model: ModelConfig;
}

const ModelCard: React.FC<ModelCardProps> = ({ model }) => {
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 hover:border-blue-500/50 transition-all cursor-pointer group">
      <div className="flex justify-between items-start mb-4">
        <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-colors">
          <Icons.Cpu className="w-6 h-6" />
        </div>
        <span className={`text-[10px] px-2 py-1 rounded-full border font-bold ${
          model.tier === ModelTier.SLM 
            ? 'border-emerald-500/30 text-emerald-400 bg-emerald-500/5' 
            : 'border-purple-500/30 text-purple-400 bg-purple-500/5'
        }`}>
          {model.tier}
        </span>
      </div>
      <h3 className="font-bold text-lg mb-1">{model.name}</h3>
      <p className="text-sm text-slate-400 mb-4">{model.baseModel}</p>
      <div className="flex items-center justify-between text-xs text-slate-500">
        <div className="flex items-center space-x-1">
          <span className="font-medium text-slate-300">{model.parameters}</span>
          <span>params</span>
        </div>
        <button className="text-blue-400 hover:text-blue-300 font-semibold">Config →</button>
      </div>
    </div>
  );
};

export default ModelCard;
