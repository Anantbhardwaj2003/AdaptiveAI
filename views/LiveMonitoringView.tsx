
import React, { useEffect, useState } from 'react';
import { Icons } from '../constants';

const LiveMonitoringView: React.FC = () => {
  const [metrics, setMetrics] = useState({ reqs: 0, latency: 0, errors: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics({
        reqs: Math.floor(Math.random() * 500) + 1200,
        latency: Math.floor(Math.random() * 15) + 22,
        errors: Math.random() > 0.9 ? 1 : 0
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h2 className="text-3xl font-black mb-2">Live Monitoring</h2>
        <p className="text-slate-400">Global fleet observability and error tracking.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Global Throughput', val: `${metrics.reqs} req/s`, color: 'text-blue-400' },
          { label: 'P99 Latency', val: `${metrics.latency}ms`, color: 'text-emerald-400' },
          { label: 'Error Rate', val: `${metrics.errors}%`, color: 'text-red-400' },
        ].map((m, i) => (
          <div key={i} className="bg-slate-900 border border-slate-800 p-8 rounded-[2rem] space-y-2">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{m.label}</p>
            <p className={`text-3xl font-black ${m.color}`}>{m.val}</p>
          </div>
        ))}
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-8 h-96 relative overflow-hidden">
        <div className="flex justify-between items-center mb-8">
          <h3 className="font-bold text-lg">Inference Distribution (Global)</h3>
          <div className="flex space-x-2">
            {['1H', '6H', '24H', 'LIVE'].map(t => (
              <button key={t} className={`px-3 py-1 text-[10px] font-black rounded-lg ${t === 'LIVE' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-500'}`}>{t}</button>
            ))}
          </div>
        </div>

        {/* Visualizer Simulator */}
        <div className="absolute bottom-0 left-0 w-full h-64 flex items-end space-x-2 px-8">
          {[...Array(40)].map((_, i) => (
            <div 
              key={i} 
              className="flex-1 bg-blue-500/20 rounded-t-lg transition-all duration-500" 
              style={{ height: `${Math.random() * 80 + 10}%` }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LiveMonitoringView;
