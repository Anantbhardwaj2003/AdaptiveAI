
import React from 'react';
import { Icons } from '../constants';
import { ServiceContext } from '../types';

interface SidebarProps {
  context: ServiceContext;
  setContext: (c: ServiceContext) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ context, setContext, activeTab, setActiveTab }) => {
  const getMenuItems = () => {
    switch (context) {
      case 'ready-intel':
        return [
          { id: 'dashboard', label: 'Models Catalog', icon: Icons.Cpu },
          { id: 'inference', label: 'Batch Inference', icon: Icons.Play },
          { id: 'monitor', label: 'Live Monitoring', icon: Icons.Layers },
        ];
      case 'adaptive-ai':
        return [
          { id: 'dashboard', label: 'Overview', icon: Icons.Cpu },
          { id: 'datasets', label: 'Datasets', icon: Icons.Database },
          { id: 'finetune', label: 'Fine-Tuning', icon: Icons.Settings },
          { id: 'playground', label: 'Playground', icon: Icons.Layers },
          { id: 'speech', label: 'Speech AI', icon: Icons.Mic },
        ];
      case 'annotation-engine':
        return [
          { id: 'dashboard', label: 'Labeling Tasks', icon: Icons.Database },
          { id: 'quality', label: 'Quality Control', icon: Icons.Layers },
          { id: 'export', label: 'Export Data', icon: Icons.Play },
        ];
      default:
        return [];
    }
  };

  const menuItems = getMenuItems();

  const serviceSwitchers = [
    { id: 'ready-intel', label: 'Ready Intelligence', color: 'blue', icon: Icons.Cpu },
    { id: 'adaptive-ai', label: 'Adaptive AI Lab', color: 'purple', icon: Icons.Settings },
    { id: 'annotation-engine', label: 'Data Annotation', color: 'emerald', icon: Icons.Database },
  ];

  return (
    <div className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col h-screen">
      <div className="p-6 border-b border-slate-800">
        <button onClick={() => setContext('hub')} className="group text-left w-full">
          <h1 className="text-xl font-black bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent group-hover:opacity-80 transition-opacity">
            AI as a Service
          </h1>
          <div className="flex items-center space-x-2 mt-1">
             <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
             <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">
               {context === 'hub' ? 'Enterprise Hub' : context.replace('-', ' ')}
             </p>
          </div>
        </button>
      </div>
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Context Specific Navigation */}
        <div className="flex-1 p-4 space-y-1 overflow-y-auto custom-scrollbar">
          {context !== 'hub' && (
            <>
              <p className="text-[10px] text-slate-500 px-4 py-2 uppercase font-black tracking-[0.1em] opacity-50">Current Service</p>
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-all ${
                      isActive 
                        ? 'bg-blue-600/10 text-blue-400 border border-blue-500/10' 
                        : 'text-slate-500 hover:bg-slate-800 hover:text-slate-300'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="font-bold text-[13px] tracking-tight">{item.label}</span>
                  </button>
                )
              })}
            </>
          )}

          {/* Service Switcher Section */}
          <div className="mt-8">
            <p className="text-[10px] text-slate-500 px-4 py-2 uppercase font-black tracking-[0.1em] opacity-50">Infrastructure Hub</p>
            <div className="space-y-1">
              {serviceSwitchers.map((s) => {
                const SIcon = s.icon;
                return (
                  <button
                    key={s.id}
                    onClick={() => { setContext(s.id as ServiceContext); setActiveTab('dashboard'); }}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-[13px] font-black tracking-tight transition-all border ${
                      context === s.id 
                        ? `bg-${s.color}-500/10 text-${s.color}-400 border-${s.color}-500/20`
                        : 'text-slate-500 hover:bg-slate-800 hover:text-slate-300 border-transparent'
                    }`}
                  >
                    <SIcon className={`w-4 h-4 ${context === s.id ? `text-${s.color}-400` : 'text-slate-600'}`} />
                    <span className="flex-1 text-left">{s.label}</span>
                    {context === s.id && (
                      <div className={`w-1.5 h-1.5 rounded-full bg-${s.color}-400 shadow-[0_0_8px_rgba(255,255,255,0.4)]`}></div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-4 border-t border-slate-800 space-y-3">
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[9px] font-black text-slate-500 uppercase">System Integrity</span>
            <span className="text-[9px] font-bold text-emerald-500">OPTIMAL</span>
          </div>
          <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden">
             <div className="w-1/3 bg-blue-500 h-full"></div>
          </div>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default Sidebar;
