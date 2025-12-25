
import React, { useState } from 'react';
import { Dataset } from '../types';
import { Icons } from '../constants';

const DatasetsView: React.FC = () => {
  const [datasets, setDatasets] = useState<Dataset[]>([
    { id: 'd1', name: 'Support_Queries_2024.jsonl', size: '12.4 MB', format: 'JSONL', rows: 4500 },
    { id: 'd2', name: 'Legal_Summaries.csv', size: '2.1 MB', format: 'CSV', rows: 800 },
    { id: 'd3', name: 'Medical_Reports_Anonymized.txt', size: '45.8 MB', format: 'TXT', rows: 12000 },
  ]);

  const [previewingDataset, setPreviewingDataset] = useState<Dataset | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const newDataset: Dataset = {
        id: `d-${Math.random().toString(36).substr(2, 4)}`,
        name: file.name,
        size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
        format: file.name.split('.').pop()?.toUpperCase() as any || 'TXT',
        rows: Math.floor(Math.random() * 5000) + 100
      };
      setDatasets(prev => [...prev, newDataset]);
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm("CRITICAL: Are you sure you want to purge this dataset? This action is permanent and will interrupt any active training jobs using this data.")) {
      setDatasets(prev => prev.filter(ds => ds.id !== id));
    }
  };

  const handlePreview = (dataset: Dataset) => {
    setPreviewingDataset(dataset);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 relative pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black mb-2 text-white">Data Assets</h2>
          <p className="text-slate-400 font-medium">Repository for fine-tuning corpus, evaluation sets, and ground truth data.</p>
        </div>
        <div className="relative">
          <input 
            type="file" 
            id="file-upload" 
            className="hidden" 
            onChange={handleFileUpload}
            accept=".jsonl,.csv,.txt"
          />
          <label 
            htmlFor="file-upload"
            className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest cursor-pointer transition-all shadow-xl shadow-blue-500/20 active:scale-95 flex items-center space-x-3"
          >
            <Icons.Layers className="w-4 h-4" />
            <span>Ingest New Data</span>
          </label>
        </div>
      </div>

      {datasets.length === 0 ? (
        <div className="bg-slate-900/40 border-2 border-dashed border-slate-800 rounded-[2.5rem] p-20 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center text-slate-600 mb-6">
            <Icons.Database className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-slate-300 mb-2">No Datasets Found</h3>
          <p className="text-slate-500 max-w-sm">Start by uploading JSONL, CSV or TXT files to build your training library.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {datasets.map(ds => (
            <div key={ds.id} className="bg-slate-900/60 border border-slate-800 p-6 rounded-[2rem] relative overflow-hidden group hover:border-blue-500/30 transition-all shadow-lg hover:shadow-blue-500/5">
              <div className="absolute top-0 right-0 p-4">
                <span className={`text-[10px] font-black px-3 py-1 rounded-full border uppercase tracking-widest ${
                  ds.format === 'JSONL' ? 'bg-purple-500/10 border-purple-500/30 text-purple-400' :
                  ds.format === 'CSV' ? 'bg-blue-500/10 border-blue-500/30 text-blue-400' :
                  'bg-slate-800 border-slate-700 text-slate-400'
                }`}>
                  {ds.format}
                </span>
              </div>
              
              <div className="mb-6">
                <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-400 mb-4 transition-transform group-hover:scale-110">
                  <Icons.Database className="w-6 h-6" />
                </div>
                <h3 className="font-black text-lg text-white truncate pr-12 mb-1">{ds.name}</h3>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Asset ID: {ds.id}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs mb-8">
                <div className="bg-slate-950/50 border border-slate-800 p-3 rounded-2xl">
                  <p className="text-slate-500 font-black uppercase text-[9px] mb-1">Total Entries</p>
                  <p className="font-black text-slate-200 text-sm">{ds.rows.toLocaleString()}</p>
                </div>
                <div className="bg-slate-950/50 border border-slate-800 p-3 rounded-2xl">
                  <p className="text-slate-500 font-black uppercase text-[9px] mb-1">Volume</p>
                  <p className="font-black text-slate-200 text-sm">{ds.size}</p>
                </div>
              </div>

              <div className="flex space-x-3">
                <button 
                  onClick={() => handlePreview(ds)}
                  className="flex-1 flex items-center justify-center space-x-2 text-[10px] font-black uppercase tracking-widest py-3 bg-slate-800 hover:bg-blue-600 text-white rounded-xl transition-all border border-slate-700/50 group/btn"
                >
                  <Icons.Eye className="w-4 h-4 transition-transform group-hover/btn:scale-110" />
                  <span>Preview</span>
                </button>
                <button 
                  onClick={() => handleDelete(ds.id)}
                  className="flex-1 flex items-center justify-center space-x-2 text-[10px] font-black uppercase tracking-widest py-3 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-xl transition-all border border-red-500/20 group/btn"
                >
                  <Icons.Trash className="w-4 h-4 transition-transform group-hover/btn:scale-110" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Info Banner */}
      <div className="bg-blue-600/5 border border-blue-500/20 p-8 rounded-[2.5rem] flex items-center space-x-6">
        <div className="w-14 h-14 bg-blue-500/20 rounded-2xl flex items-center justify-center text-blue-400 shrink-0">
          <Icons.ShieldAlert className="w-8 h-8" />
        </div>
        <div>
          <h4 className="font-black text-white text-lg">Integrity Validation Active</h4>
          <p className="text-sm text-slate-400 leading-relaxed font-medium">Every dataset uploaded to the Adaptive AI Lab is automatically scanned for distribution bias, semantic duplicates, and PII leakage.</p>
        </div>
      </div>

      {/* Preview Modal */}
      {previewingDataset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 backdrop-blur-xl bg-black/60 animate-in fade-in duration-300">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-5xl max-h-[90vh] rounded-[3rem] flex flex-col shadow-[0_0_150px_rgba(30,58,138,0.3)] overflow-hidden">
            <div className="p-8 border-b border-slate-800 flex items-center justify-between shrink-0">
              <div className="flex items-center space-x-5">
                <div className="p-4 bg-blue-600/10 rounded-2xl text-blue-400">
                  <Icons.Eye className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-white">{previewingDataset.name}</h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Sanity Preview</span>
                    <span className="text-slate-700">•</span>
                    <span className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.2em]">Validation Passed</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setPreviewingDataset(null)}
                className="p-3 bg-slate-800 hover:bg-slate-700 rounded-full text-slate-400 hover:text-white transition-all active:scale-90"
              >
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-8 custom-scrollbar space-y-6">
               <div className="grid grid-cols-1 gap-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="bg-slate-950 border border-slate-800 rounded-[2rem] p-8 font-mono text-xs text-blue-300/80 space-y-4 group hover:border-blue-500/50 transition-all shadow-inner">
                       <div className="flex justify-between items-center pb-4 border-b border-slate-800/50">
                          <div className="flex items-center space-x-3">
                             <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                             <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest font-sans">Object Record #{i + 1}</span>
                          </div>
                          <span className="text-[9px] bg-slate-800 text-slate-400 px-3 py-1 rounded font-sans font-bold">SHA-256: {Math.random().toString(36).substring(2, 12)}</span>
                       </div>
                       
                       {previewingDataset.format === 'JSONL' ? (
                         <div className="space-y-3 leading-relaxed">
                            <p className="text-blue-400/60">{`{`}</p>
                            <p className="ml-6"><span className="text-purple-400">"uuid"</span>: <span className="text-emerald-400">"usr_9x_{i}2"</span>,</p>
                            <p className="ml-6"><span className="text-purple-400">"prompt"</span>: <span className="text-amber-400">"Analyze the correlation between epoch count and validation loss..."</span>,</p>
                            <p className="ml-6"><span className="text-purple-400">"completion"</span>: <span className="text-amber-400">"Higher epoch counts without early stopping typically lead to overfitting..."</span></p>
                            <p className="text-blue-400/60">{`}`}</p>
                         </div>
                       ) : (
                         <div className="space-y-3 leading-relaxed font-sans text-sm">
                            <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-800">
                               <p className="text-[10px] font-black text-slate-600 uppercase mb-2">Column Headers: ID, QUERY, RESPONSE</p>
                               <p className="text-slate-300">"{i + 102}","Requesting model re-calibration sequence","Access denied. Insufficient permissions for Tier-2 architecture."</p>
                            </div>
                         </div>
                       )}
                    </div>
                  ))}
               </div>
               <div className="py-10 text-center opacity-30">
                  <div className="inline-block w-1.5 h-1.5 rounded-full bg-slate-500 mx-1"></div>
                  <div className="inline-block w-1.5 h-1.5 rounded-full bg-slate-500 mx-1"></div>
                  <div className="inline-block w-1.5 h-1.5 rounded-full bg-slate-500 mx-1"></div>
                  <p className="text-[10px] font-black uppercase mt-4">Remaining {previewingDataset.rows - 5} records hidden for performance</p>
               </div>
            </div>

            <div className="p-8 border-t border-slate-800 flex justify-end shrink-0 bg-slate-900/50 backdrop-blur-md">
               <button 
                onClick={() => setPreviewingDataset(null)}
                className="px-10 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-xl shadow-blue-600/20 active:scale-95"
               >
                 Close Inspector
               </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #334155; }
      `}</style>
    </div>
  );
};

export default DatasetsView;
