
import React from 'react';
import { ModelConfig, ModelTier, TrainingJob } from '../types';
import ModelCard from '../components/ModelCard';

const DashboardView: React.FC = () => {
  // Fix: Added missing 'status' property to satisfy ModelConfig interface requirement (lines 9-11)
  const [models] = React.useState<ModelConfig[]>([
    { id: '1', name: 'MiniMind-v1', tier: ModelTier.SLM, parameters: '1.2B', baseModel: 'Phi-2', category: 'NLP', status: 'Active' },
    { id: '2', name: 'CustomerSupport-LLM', tier: ModelTier.LLM, parameters: '7B', baseModel: 'Mistral-v0.3', category: 'NLP', status: 'Active' },
    { id: '3', name: 'TinyCoder', tier: ModelTier.SLM, parameters: '440M', baseModel: 'TinyLlama', category: 'NLP', status: 'Active' },
  ]);

  const [jobs] = React.useState<TrainingJob[]>([
    { id: 'j1', modelName: 'MiniMind-v1', status: 'Completed', progress: 100, startTime: '2h ago' },
    { id: 'j2', modelName: 'NewAgent-X', status: 'Training', progress: 45, startTime: '15m ago' },
  ]);

  return (
    <div className="space-y-10">
      <div>
        <h2 className="text-3xl font-bold mb-2">My Models</h2>
        <p className="text-slate-400">Deployed and ready-to-use tuned models.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {models.map(m => <ModelCard key={m.id} model={m} />)}
          <button className="border-2 border-dashed border-slate-800 rounded-xl p-5 flex flex-col items-center justify-center text-slate-500 hover:border-slate-600 hover:text-slate-300 transition-all">
            <span className="text-3xl mb-2">+</span>
            <span className="font-semibold">New Model</span>
          </button>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-6">Active Jobs</h2>
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/50">
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Model Name</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Status</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Progress</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Started</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map(job => (
                <tr key={job.id} className="border-b border-slate-800 hover:bg-slate-800/30">
                  <td className="px-6 py-4 font-medium">{job.modelName}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${
                      job.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-blue-500/10 text-blue-400'
                    }`}>
                      {job.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3 w-48">
                      <div className="flex-1 bg-slate-800 rounded-full h-1.5">
                        <div 
                          className={`h-1.5 rounded-full transition-all duration-1000 ${
                            job.status === 'Completed' ? 'bg-emerald-500' : 'bg-blue-500'
                          }`}
                          style={{ width: `${job.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-slate-400">{job.progress}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-400">{job.startTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
