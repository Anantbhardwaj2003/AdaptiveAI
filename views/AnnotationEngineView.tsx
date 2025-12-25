
import React from 'react';
import { Icons } from '../constants';

interface AnnotationEngineViewProps {
  activeTab: string;
}

const AnnotationEngineView: React.FC<AnnotationEngineViewProps> = ({ activeTab }) => {
  const projects = [
    { name: 'Multimodal Text Labelling', type: 'NLP', icon: Icons.Layers, progress: 65, total: 1000, color: 'blue' },
    { name: 'Autonomous Image Labelling', type: 'Vision', icon: Icons.Image, progress: 30, total: 5000, color: 'emerald' },
    { name: 'Transcript Precision Labelling', type: 'Audio', icon: Icons.Mic, progress: 90, total: 120, color: 'purple' },
    { name: 'Multi-Speaker Diarisation', type: 'Audio', icon: Icons.Fingerprint, progress: 15, total: 200, color: 'amber' },
    { name: 'Waveform Classification', type: 'Audio', icon: Icons.Activity, progress: 50, total: 1500, color: 'blue' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black mb-2 text-white">Annotation Engine</h2>
          <p className="text-slate-400 font-medium">Orchestrate high-fidelity data labelling workflows for enterprise-grade training.</p>
        </div>
        <button className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-lg shadow-emerald-600/20">
          Initialize Project
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {projects.map(project => (
          <div key={project.name} className="bg-slate-900/40 border border-slate-800/60 rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6 group hover:border-slate-700/80 transition-all">
            <div className={`w-14 h-14 rounded-xl bg-${project.color}-500/10 flex items-center justify-center text-${project.color}-400 group-hover:scale-105 transition-all shadow-inner shrink-0`}>
              <project.icon className="w-7 h-7" />
            </div>
            <div className="flex-1 w-full space-y-3">
              <div className="flex justify-between items-end">
                <div>
                  <h4 className="font-bold text-lg text-slate-100">{project.name}</h4>
                  <div className="flex items-center space-x-2 mt-0.5">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-tighter">Domain: {project.type}</span>
                    <span className="text-slate-700">•</span>
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-tighter">Remaining: {Math.round(project.total * (1 - project.progress/100))} Units</span>
                  </div>
                </div>
                <span className="text-sm font-black text-slate-300 font-mono tracking-tighter">{project.progress}%</span>
              </div>
              <div className="w-full bg-slate-800/50 h-2 rounded-full overflow-hidden border border-slate-800/80">
                <div 
                  className={`h-full bg-${project.color}-500 transition-all duration-1000 shadow-[0_0_10px_rgba(59,130,246,0.3)]`} 
                  style={{ width: `${project.progress}%` }}
                ></div>
              </div>
            </div>
            <div className="flex items-center space-x-3 w-full md:w-auto">
               <button className="flex-1 md:flex-none bg-slate-800/80 hover:bg-slate-700 px-6 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-widest transition-colors border border-slate-700/50">
                Studio
              </button>
              <button className="flex-1 md:flex-none bg-blue-600/10 hover:bg-blue-600 text-blue-400 hover:text-white px-6 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all border border-blue-500/20">
                Review
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnnotationEngineView;
