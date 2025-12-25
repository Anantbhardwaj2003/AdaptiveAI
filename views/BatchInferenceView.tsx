
import React, { useState } from 'react';
import { Icons } from '../constants';

const BatchInferenceView: React.FC = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [jobs, setJobs] = useState([
    { id: 'B-991', name: 'User_Feedback_Archive.jsonl', status: 'Processing', progress: 64, speed: '850 tps' },
    { id: 'B-982', name: 'Legacy_Logs_Audit.csv', status: 'Completed', progress: 100, speed: '1.2k tps' },
  ]);

  const handleSimulateUpload = () => {
    setIsUploading(true);
    setTimeout(() => {
      setJobs([{ id: `B-${Math.floor(Math.random()*900)}`, name: 'New_Dataset_Inference.jsonl', status: 'Queued', progress: 0, speed: '0 tps' }, ...jobs]);
      setIsUploading(false);
    }, 1500);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-3xl font-black mb-2">Batch Inference</h2>
          <p className="text-slate-400">Asynchronous processing for high-volume data payloads.</p>
        </div>
      </div>

      <div 
        onClick={handleSimulateUpload}
        className="border-2 border-dashed border-slate-800 rounded-[2.5rem] p-12 flex flex-col items-center justify-center space-y-4 hover:border-blue-500/40 hover:bg-blue-500/5 transition-all cursor-pointer group"
      >
        <div className="p-6 bg-slate-900 rounded-full group-hover:scale-110 transition-transform">
          <Icons.Layers className="w-10 h-10 text-slate-500 group-hover:text-blue-400" />
        </div>
        <div className="text-center">
          <p className="text-lg font-bold text-white">Drop data to begin batching</p>
          <p className="text-sm text-slate-500">Supports JSONL, CSV, and Parquet up to 50GB</p>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest">Active Batch Jobs</h3>
        <div className="grid grid-cols-1 gap-4">
          {jobs.map(job => (
            <div key={job.id} className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 flex items-center justify-between">
              <div className="flex items-center space-x-6 flex-1">
                <div className={`p-3 rounded-xl ${job.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-blue-500/10 text-blue-400'}`}>
                  <Icons.Play className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between mb-2">
                    <p className="font-bold text-white">{job.name} <span className="text-slate-500 font-normal ml-2">#{job.id}</span></p>
                    <span className="text-xs font-black uppercase text-slate-400">{job.speed}</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-1000 ${job.status === 'Completed' ? 'bg-emerald-500' : 'bg-blue-500'}`}
                      style={{ width: `${job.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              <div className="ml-8">
                {job.status === 'Completed' ? (
                  <button className="text-emerald-400 text-xs font-black uppercase hover:underline">Download Results</button>
                ) : (
                  <button className="text-slate-500 text-xs font-black uppercase hover:text-red-400 transition-colors">Cancel</button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BatchInferenceView;
