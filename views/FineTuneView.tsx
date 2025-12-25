
import React, { useState, useEffect } from 'react';
import { ModelTier } from '../types';
import { geminiService } from '../services/geminiService';

const FineTuneView: React.FC = () => {
  const [tier, setTier] = useState<ModelTier>(ModelTier.SLM);
  const [epochs, setEpochs] = useState(3);
  const [learningRate, setLearningRate] = useState(2e-5);
  const [advice, setAdvice] = useState<{title: string, content: string}[]>([]);
  const [loadingAdvice, setLoadingAdvice] = useState(false);

  const fetchAdvice = async () => {
    setLoadingAdvice(true);
    const res = await geminiService.getModelAdvice(tier, "Customer support tickets for a SaaS platform");
    setAdvice(res);
    setLoadingAdvice(false);
  };

  useEffect(() => {
    fetchAdvice();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tier]);

  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h2 className="text-3xl font-bold mb-2">Fine-Tuning Pipeline</h2>
        <p className="text-slate-400">Configure hyperparameters and select target architecture.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6 bg-slate-900 border border-slate-800 p-8 rounded-2xl">
          <div className="space-y-4">
            <label className="block text-sm font-bold text-slate-300">Target Compute Tier</label>
            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={() => setTier(ModelTier.SLM)}
                className={`py-3 px-4 rounded-xl border text-sm font-bold transition-all ${tier === ModelTier.SLM ? 'bg-blue-600 border-blue-500 text-white' : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-500'}`}
              >
                SLM (e.g. Phi-2)
              </button>
              <button 
                onClick={() => setTier(ModelTier.LLM)}
                className={`py-3 px-4 rounded-xl border text-sm font-bold transition-all ${tier === ModelTier.LLM ? 'bg-purple-600 border-purple-500 text-white' : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-500'}`}
              >
                LLM (Open Weights)
              </button>
            </div>
            {tier === ModelTier.LLM && (
              <p className="text-[10px] text-amber-400 font-bold bg-amber-400/10 p-2 rounded border border-amber-400/20">
                NOTE: Open-weight LLMs (Llama, Mistral) require high compute clusters (A100 x 4 minimum).
              </p>
            )}
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-sm font-bold text-slate-300">Epochs</label>
              <span className="text-blue-400 font-mono text-sm">{epochs}</span>
            </div>
            <input 
              type="range" min="1" max="20" step="1" value={epochs} 
              onChange={(e) => setEpochs(parseInt(e.target.value))}
              className="w-full accent-blue-600"
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-sm font-bold text-slate-300">Learning Rate</label>
              <span className="text-blue-400 font-mono text-sm">{learningRate.toExponential()}</span>
            </div>
            <input 
              type="range" min="0.000001" max="0.0005" step="0.000005" value={learningRate} 
              onChange={(e) => setLearningRate(parseFloat(e.target.value))}
              className="w-full accent-blue-600"
            />
          </div>

          <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 py-4 rounded-xl font-bold text-lg hover:shadow-xl hover:shadow-blue-600/20 transition-all">
            Launch Training Job
          </button>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl h-full">
            <h3 className="text-lg font-bold mb-4 flex items-center space-x-2">
              <span className="p-1 bg-amber-500/20 rounded text-amber-500">✨</span>
              <span>AI Optimizer Advice</span>
            </h3>
            
            {loadingAdvice ? (
              <div className="space-y-4 animate-pulse">
                {[1,2,3].map(i => <div key={i} className="h-20 bg-slate-800 rounded-lg"></div>)}
              </div>
            ) : (
              <div className="space-y-4">
                {advice.map((item, idx) => (
                  <div key={idx} className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
                    <p className="font-bold text-slate-200 text-sm mb-1">{item.title}</p>
                    <p className="text-xs text-slate-400 leading-relaxed">{item.content}</p>
                  </div>
                ))}
              </div>
            )}
            
            {!loadingAdvice && advice.length === 0 && (
              <p className="text-slate-500 text-sm italic">Connect your API key to get AI-powered tuning suggestions.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FineTuneView;
