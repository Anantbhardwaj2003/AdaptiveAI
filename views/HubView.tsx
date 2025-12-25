
import React from 'react';
import { ServiceContext } from '../types';
import { Icons } from '../constants';

interface HubViewProps {
  onSelectService: (s: ServiceContext) => void;
}

const HubView: React.FC<HubViewProps> = ({ onSelectService }) => {
  const services = [
    {
      id: 'ready-intel' as ServiceContext,
      title: 'Ready Intelligence',
      subtitle: 'Core Modules',
      desc: 'Instant-access production models including in-house developed speech and detection systems.',
      icon: Icons.Cpu,
      color: 'blue',
      capabilities: [
        { label: 'Pre-trained LLMs & SLMs', icon: Icons.Layers },
        { label: 'Change Detection (In-house)', icon: Icons.Activity },
        { label: 'CPU-based STT (In-house)', icon: Icons.Mic },
        { label: 'Anomaly Detection', icon: Icons.ShieldAlert },
      ]
    },
    {
      id: 'adaptive-ai' as ServiceContext,
      title: 'Adaptive AI',
      subtitle: 'Fine-Tuning Lab',
      desc: 'High-performance pipelines for specialized model evolution using your proprietary datasets.',
      icon: Icons.Settings,
      color: 'purple',
      capabilities: [
        { label: 'SLM Fine-tuning Pipelines', icon: Icons.Cpu },
        { label: 'Open-weight LLM Training', icon: Icons.Layers },
        { label: 'Visual Architecture GUI', icon: Icons.Settings },
        { label: 'Custom Speech Tuning', icon: Icons.Mic }
      ]
    },
    {
      id: 'annotation-engine' as ServiceContext,
      title: 'Annotation Engine',
      subtitle: 'Data Laboratory',
      desc: 'Full-spectrum preparation suite for text, image, and high-fidelity audio data.',
      icon: Icons.Database,
      color: 'emerald',
      capabilities: [
        { label: 'Text Labelling', icon: Icons.Layers },
        { label: 'Image Annotation', icon: Icons.Image },
        { label: 'Transcript Labelling', icon: Icons.Mic },
        { label: 'Speaker Diarisation', icon: Icons.Fingerprint },
      ]
    }
  ];

  return (
    <div className="space-y-16 py-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      
      {/* Grand Hero Section */}
      <div className="relative flex flex-col items-center justify-center text-center py-12">
        {/* Background Decorative Aura */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px]">
           <div className="absolute inset-0 bg-blue-600/10 blur-[120px] rounded-full animate-pulse"></div>
           <div className="absolute inset-20 bg-purple-600/5 blur-[100px] rounded-full animate-pulse delay-700"></div>
           {/* Rotating Ring */}
           <div className="absolute inset-0 border border-blue-500/10 rounded-full animate-[spin_20s_linear_infinite]"></div>
           <div className="absolute inset-10 border border-purple-500/5 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>
        </div>

        {/* Hero Icon */}
        <div className="relative mb-10 group">
          <div className="absolute inset-0 bg-blue-500 blur-2xl opacity-20 group-hover:opacity-40 transition-opacity animate-pulse"></div>
          <div className="relative w-24 h-24 bg-slate-900 border border-slate-800 rounded-[2rem] flex items-center justify-center text-blue-400 shadow-2xl group-hover:scale-110 transition-transform duration-500">
            <Icons.Cpu className="w-12 h-12 animate-[bounce_3s_ease-in-out_infinite]" />
          </div>
          {/* Orbital Dots */}
          <div className="absolute -top-4 -right-4 w-3 h-3 bg-emerald-500 rounded-full blur-sm animate-ping"></div>
          <div className="absolute -bottom-2 -left-6 w-2 h-2 bg-blue-400 rounded-full blur-sm animate-pulse"></div>
        </div>

        {/* Hero Text */}
        <div className="relative z-10 space-y-6">
          <div className="inline-flex items-center space-x-3 bg-slate-900/80 border border-slate-800 px-4 py-2 rounded-full mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">Neural Network Operational</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none">
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent animate-gradient-x">
              AI as a Service
            </span>
          </h1>

          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed opacity-80">
            Precision engineering for the next generation of autonomous intelligence. 
            Deploy, adapt, and orchestrate at exascale.
          </p>

          <div className="flex items-center justify-center space-x-12 pt-8">
             <div className="text-center">
                <p className="text-2xl font-black text-white">2.4 EF</p>
                <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mt-1">Compute Capacity</p>
             </div>
             <div className="w-px h-8 bg-slate-800"></div>
             <div className="text-center">
                <p className="text-2xl font-black text-white">42k+</p>
                <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mt-1">Active Clusters</p>
             </div>
             <div className="w-px h-8 bg-slate-800"></div>
             <div className="text-center">
                <p className="text-2xl font-black text-white">99.99</p>
                <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mt-1">Inference Uptime</p>
             </div>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
        {services.map((service) => {
          const Icon = service.icon;
          const colorClass = service.color;
          return (
            <button
              key={service.id}
              onClick={() => onSelectService(service.id)}
              className="group relative bg-slate-900/40 border border-slate-800/80 rounded-[2.5rem] p-10 text-left transition-all hover:bg-slate-900/80 hover:border-slate-600 hover:shadow-[0_30px_60px_rgba(0,0,0,0.5)] flex flex-col h-full overflow-hidden"
            >
              <div className={`absolute -top-20 -right-20 w-48 h-48 bg-${colorClass}-500/5 blur-[80px] rounded-full transition-all group-hover:bg-${colorClass}-500/15`}></div>

              <div className="relative z-10 flex flex-col h-full">
                <div className={`w-16 h-16 rounded-2xl bg-${colorClass}-500/10 text-${colorClass}-400 flex items-center justify-center mb-8 transition-all group-hover:scale-110 group-hover:bg-${colorClass}-500 group-hover:text-white shadow-xl`}>
                  <Icon className="w-8 h-8" />
                </div>
                
                <div className="space-y-2 mb-6">
                  <p className={`text-[10px] font-black text-${colorClass}-500 uppercase tracking-[0.2em]`}>{service.subtitle}</p>
                  <h3 className="text-3xl font-black text-white">{service.title}</h3>
                </div>

                <p className="text-slate-400 text-sm leading-relaxed mb-10 font-medium">
                  {service.desc}
                </p>

                <div className="space-y-4 mt-auto">
                  <div className="grid grid-cols-1 gap-3">
                    {service.capabilities.map((cap, i) => (
                      <div key={i} className="flex items-center space-x-3 text-slate-400 group-hover:text-slate-200 transition-colors">
                        <div className={`w-1 h-1 rounded-full bg-${colorClass}-500`}></div>
                        <span className="text-xs font-bold">{cap.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-10 pt-6 border-t border-slate-800 flex items-center justify-between text-[11px] font-black uppercase tracking-widest text-slate-500 group-hover:text-white transition-colors">
                  <span>Access Interface</span>
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Footer Connectivity Section */}
      <div className="relative overflow-hidden bg-slate-900/60 border border-slate-800 rounded-[3rem] p-12 md:p-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.05),transparent)] pointer-events-none"></div>
        <div className="relative z-10 flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 space-y-8">
            <h4 className="text-3xl md:text-4xl font-black text-white leading-tight">Hyper-Converged Intelligence</h4>
            <p className="text-slate-400 leading-relaxed font-medium text-base md:text-lg max-w-2xl">
              Our unified architecture ensures seamless data persistence. 
              <span className="text-emerald-400 font-bold"> Annotation Engine</span> handles raw ingest, 
              <span className="text-purple-400 font-bold"> Adaptive AI</span> optimizes weights, and 
              <span className="text-blue-400 font-bold"> Ready Intelligence</span> delivers production inference.
            </p>
          </div>
          <div className="flex gap-4">
             <div className="p-10 bg-slate-950 border border-slate-800 rounded-[2.5rem] text-center w-48 shadow-2xl">
                <p className="text-4xl font-black text-white">4.2 PB</p>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-2">Data Persistence</p>
             </div>
             <div className="p-10 bg-slate-950 border border-slate-800 rounded-[2.5rem] text-center w-48 shadow-2xl mt-8">
                <p className="text-4xl font-black text-white">1.2M</p>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-2">Daily Batches</p>
             </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 15s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default HubView;
