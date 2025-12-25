
import React, { useState } from 'react';
import { Icons } from '../constants';
import { ModelConfig } from '../types';
import ModelDeploymentWorkspace from './ModelDeploymentWorkspace';
import BatchInferenceView from './BatchInferenceView';
import LiveMonitoringView from './LiveMonitoringView';

const ReadyIntelligenceView: React.FC<{ activeTab: string }> = ({ activeTab }) => {
  const [selectedModel, setSelectedModel] = useState<ModelConfig | null>(null);
  const [models, setModels] = useState<ModelConfig[]>([
    { id: 'm1', name: 'Core LLM v4', category: 'NLP', latency: '12ms', status: 'Idle', tier: 'High Performance', desc: 'General purpose high-performance LLM for enterprise chat and logic.' },
    { id: 'm2', name: 'ChangeDetector-Pro', category: 'Vision', latency: '45ms', status: 'Idle', tier: 'Computer Vision', desc: 'In-house CV model for detecting pixel-level changes in streams.' },
    { id: 'm3', name: 'CPU-STT Edge', category: 'Audio', latency: '8ms', status: 'Idle', tier: 'Edge Audio', desc: 'Speech-to-Text running entirely on edge CPU nodes.' },
    { id: 'm4', name: 'AnomalySense', category: 'Anomaly', latency: '2ms', status: 'Idle', tier: 'Signal Processing', desc: 'Real-time pattern recognition and anomaly detection in JSON streams.' },
  ]);

  const handleDeploy = (modelId: string) => {
    setModels(prev => prev.map(m => m.id === modelId ? { ...m, status: 'Deploying' } : m));
    setTimeout(() => {
      setModels(prev => prev.map(m => m.id === modelId ? { ...m, status: 'Active' } : m));
    }, 2500);
  };

  const handleTerminate = (modelId: string) => {
    setModels(prev => prev.map(m => m.id === modelId ? { ...m, status: 'Idle' } : m));
    setSelectedModel(null);
  };

  if (selectedModel) {
    return (
      <ModelDeploymentWorkspace 
        model={selectedModel} 
        onBack={() => setSelectedModel(null)} 
        onTerminate={() => handleTerminate(selectedModel.id)}
      />
    );
  }

  // Routing based on sidebar activeTab
  switch (activeTab) {
    case 'inference':
      return <BatchInferenceView />;
    case 'monitor':
      return <LiveMonitoringView />;
    case 'dashboard':
    default:
      return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
          <div className="flex justify-between items-end">
            <div>
              <h2 className="text-3xl font-black mb-2">Models Catalog</h2>
              <p className="text-slate-400 font-medium">Verified, low-latency models ready for instant deployment.</p>
            </div>
            <div className="flex items-center space-x-2 bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl">
               <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
               <span className="text-[10px] font-black uppercase text-slate-300">GPU Cluster: Healthy</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {models.map(m => (
              <div key={m.id} className="bg-slate-900/50 border border-slate-800/80 rounded-[2rem] p-8 hover:border-blue-500/30 transition-all group relative overflow-hidden">
                {m.status === 'Active' && (
                  <div className="absolute top-0 right-0 p-6">
                    <span className="flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                    </span>
                  </div>
                )}

                <div className="flex items-start space-x-4 mb-6">
                  <div className={`p-4 rounded-2xl bg-blue-500/10 text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all`}>
                    <Icons.Cpu className="w-8 h-8" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-xl font-bold text-white">{m.name}</h4>
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest">{m.tier}</span>
                      <span className="text-slate-700">•</span>
                      <span className="text-[10px] font-black uppercase text-blue-500">{m.category}</span>
                    </div>
                  </div>
                </div>

                <p className="text-slate-400 text-sm leading-relaxed mb-8 line-clamp-2">{m.desc}</p>

                <div className="flex items-center justify-between pt-6 border-t border-slate-800/60">
                  <div className="flex space-x-6">
                    <div className="text-left">
                      <p className="text-[9px] text-slate-500 font-black uppercase">Latency</p>
                      <p className="text-sm font-black text-slate-300 font-mono">{m.latency}</p>
                    </div>
                  </div>

                  {m.status === 'Idle' ? (
                    <button onClick={() => handleDeploy(m.id)} className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all">Deploy</button>
                  ) : m.status === 'Deploying' ? (
                    <div className="flex items-center space-x-3 text-blue-400">
                      <div className="w-4 h-4 border-2 border-t-transparent border-blue-400 rounded-full animate-spin"></div>
                      <span className="text-[10px] font-black uppercase tracking-widest">Provisioning...</span>
                    </div>
                  ) : (
                    <button onClick={() => setSelectedModel(m)} className="bg-slate-800 hover:bg-slate-700 text-blue-400 px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all border border-blue-500/20">Control Plane</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
  }
};

export default ReadyIntelligenceView;
