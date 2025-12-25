
import React, { useState } from 'react';

interface Block {
  id: string;
  type: 'Input' | 'SystemPrompt' | 'Layer' | 'Filter' | 'Output';
  value: string;
}

const PlaygroundView: React.FC = () => {
  const [blocks, setBlocks] = useState<Block[]>([
    { id: '1', type: 'SystemPrompt', value: 'You are a helpful assistant.' },
    { id: '2', type: 'Input', value: '{{user_query}}' },
    { id: '3', type: 'Layer', value: 'Attention (Heads: 12)' },
    { id: '4', type: 'Output', value: 'Stream Text' },
  ]);

  const addBlock = (type: Block['type']) => {
    setBlocks([...blocks, { id: Math.random().toString(), type, value: `New ${type}` }]);
  };

  const removeBlock = (id: string) => {
    setBlocks(blocks.filter(b => b.id !== id));
  };

  return (
    <div className="h-[calc(100vh-160px)] flex flex-col space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold mb-1">Model Playground</h2>
          <p className="text-slate-400">Visually architect your model's inference logic.</p>
        </div>
        <div className="flex space-x-3">
          <button className="bg-slate-800 border border-slate-700 px-4 py-2 rounded-lg text-sm font-bold hover:bg-slate-700 transition-colors">Export Config</button>
          <button className="bg-emerald-600 px-4 py-2 rounded-lg text-sm font-bold text-white hover:bg-emerald-500 transition-all shadow-lg shadow-emerald-600/20">Test Agent</button>
        </div>
      </div>

      <div className="flex-1 flex space-x-8 overflow-hidden">
        {/* Toolbox */}
        <div className="w-64 bg-slate-900 border border-slate-800 rounded-2xl p-6 overflow-y-auto">
          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-6">Components</h3>
          <div className="space-y-3">
            {(['SystemPrompt', 'Input', 'Layer', 'Filter', 'Output'] as const).map(type => (
              <button 
                key={type}
                onClick={() => addBlock(type)}
                className="w-full text-left p-3 rounded-xl border border-slate-800 bg-slate-800/50 hover:border-blue-500/50 hover:bg-slate-800 transition-all flex items-center space-x-3 group"
              >
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                <span className="text-sm font-medium">{type}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Canvas */}
        <div className="flex-1 bg-slate-900/40 border-2 border-dashed border-slate-800 rounded-3xl p-8 overflow-y-auto relative flex flex-col items-center space-y-6">
          {blocks.map((block, idx) => (
            <React.Fragment key={block.id}>
              <div className="w-full max-w-lg bg-slate-800 border border-slate-700 rounded-2xl p-5 shadow-2xl relative group">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[10px] font-bold text-blue-400 uppercase">{block.type}</span>
                  <button 
                    onClick={() => removeBlock(block.id)}
                    className="opacity-0 group-hover:opacity-100 text-slate-500 hover:text-red-400 transition-opacity"
                  >
                    ✕
                  </button>
                </div>
                <input 
                  className="bg-transparent border-none focus:ring-0 w-full font-medium text-lg text-slate-200"
                  value={block.value}
                  onChange={(e) => {
                    const newBlocks = [...blocks];
                    newBlocks[idx].value = e.target.value;
                    setBlocks(newBlocks);
                  }}
                />
              </div>
              {idx < blocks.length - 1 && (
                <div className="w-0.5 h-8 bg-gradient-to-b from-blue-500/50 to-indigo-500/50"></div>
              )}
            </React.Fragment>
          ))}
          {blocks.length === 0 && (
            <div className="flex-1 flex flex-col items-center justify-center text-slate-600">
              <svg className="w-16 h-16 mb-4 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
              <p className="font-bold">Canvas Empty</p>
              <p className="text-sm">Drag and drop components to build your model</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlaygroundView;
