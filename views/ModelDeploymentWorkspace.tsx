
import React, { useState, useRef, useEffect } from 'react';
import { ModelConfig } from '../types';
import { Icons } from '../constants';
import { GoogleGenAI } from "@google/genai";

interface WorkspaceProps {
  model: ModelConfig;
  onBack: () => void;
  onTerminate: () => void;
}

interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

// Enhanced Markdown-lite component for high-end professional rendering
const FormattedText: React.FC<{ text: string }> = ({ text }) => {
  const lines = text.split('\n');
  
  return (
    <div className="space-y-3 leading-relaxed text-slate-300">
      {lines.map((line, i) => {
        const trimmed = line.trim();
        if (!trimmed && line !== '') return <div key={i} className="h-2" />;

        // Header Parsing
        if (trimmed.startsWith('### ')) {
          return (
            <div key={i} className="pt-4 pb-1 border-b border-slate-800/50 mb-2">
              <h3 className="text-sm font-black text-blue-400 uppercase tracking-widest">
                {renderInline(trimmed.replace('### ', ''))}
              </h3>
            </div>
          );
        }
        
        if (trimmed.startsWith('## ')) {
          return (
            <h2 key={i} className="text-xl font-black text-white pt-6 pb-2">
              {renderInline(trimmed.replace('## ', ''))}
            </h2>
          );
        }

        // List Parsing (Unordered)
        const isUnordered = trimmed.startsWith('* ') || trimmed.startsWith('- ');
        // List Parsing (Ordered)
        const isOrdered = /^\d+\.\s/.test(trimmed);

        if (isUnordered) {
          const content = trimmed.startsWith('* ') ? trimmed.replace('* ', '') : trimmed.replace('- ', '');
          const indentation = line.indexOf(trimmed.charAt(0));
          return (
            <div key={i} className="flex items-start space-x-3 group" style={{ marginLeft: `${indentation * 8}px` }}>
              <div className="mt-2 w-1.5 h-1.5 rounded-full bg-blue-500/40 group-hover:bg-blue-400 transition-colors shrink-0" />
              <span className="flex-1">{renderInline(content)}</span>
            </div>
          );
        }

        if (isOrdered) {
          const numberMatch = trimmed.match(/^(\d+)\.\s/);
          const content = trimmed.replace(/^\d+\.\s/, '');
          const indentation = line.indexOf(trimmed.charAt(0));
          return (
            <div key={i} className="flex items-start space-x-3" style={{ marginLeft: `${indentation * 8}px` }}>
              <span className="text-[10px] font-black text-blue-500 mt-1 w-4 shrink-0 font-mono">{numberMatch ? numberMatch[1] : '•'}</span>
              <span className="flex-1">{renderInline(content)}</span>
            </div>
          );
        }

        // Standard Paragraph
        return <p key={i} className="min-h-[1.2em]">{renderInline(line)}</p>;
      })}
    </div>
  );
};

// Helper for inline bolding
const renderInline = (text: string) => {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, j) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={j} className="text-white font-bold">{part.slice(2, -2)}</strong>;
    }
    return part;
  });
};

const ModelDeploymentWorkspace: React.FC<WorkspaceProps> = ({ model, onBack, onTerminate }) => {
  const [input, setInput] = useState('');
  const [isTerminating, setIsTerminating] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [isScaling, setIsScaling] = useState(false);
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied'>('idle');
  const [nodes, setNodes] = useState(4);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [logs, setLogs] = useState<string[]>([
    `[SYSTEM] Instance ${model.id} initialized`,
    '[AUTH] Bearer token verified',
    `[MODEL] ${model.name} warm-started`,
  ]);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const logsRef = useRef<HTMLDivElement>(null);

  const endpointUrl = `https://api.adaptive.ai/v1/inference/${model.id}`;

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isThinking]);

  useEffect(() => {
    if (logsRef.current) logsRef.current.scrollTop = logsRef.current.scrollHeight;
  }, [logs]);

  const addLog = (msg: string) => {
    const time = new Date().toLocaleTimeString();
    setLogs(prev => [...prev, `[${time}] ${msg}`]);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(endpointUrl);
    setCopyStatus('copied');
    setTimeout(() => setCopyStatus('idle'), 2000);
  };

  const handleScale = () => {
    setIsScaling(true);
    addLog(`[CLUSTER] Re-scaling nodes to ${nodes + 2}...`);
    setTimeout(() => {
      setNodes(n => n + 2);
      setIsScaling(false);
      addLog(`[CLUSTER] Successfully scaled to ${nodes + 2} nodes. Performance +15%`);
    }, 2000);
  };

  const handleTerminate = () => {
    setIsTerminating(true);
    addLog('[SYSTEM] Terminating edge nodes...');
    setTimeout(() => onTerminate(), 2000);
  };

  const handleExecute = async () => {
    if (!input.trim() || isThinking) return;
    const userText = input;
    setInput('');
    addLog(`[INBOUND] POST /inference - Payload: ${userText.length}b`);

    if (model.category === 'NLP') {
      setMessages(prev => [...prev, { role: 'user', text: userText }]);
      setIsThinking(true);
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const response = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: userText,
          config: {
            systemInstruction: `You are the executive response engine for the "${model.name}" model. 
            Format responses using high-level professional Markdown:
            - Use ### for Section Headers.
            - Use **Text** for emphasis.
            - Use * or - for Bulleted Lists.
            - Use 1. 2. 3. for Numbered Lists.
            Ensure list items are indented for sub-bullets if necessary. Be precise, technical, and professional.`,
          },
        });
        setMessages(prev => [...prev, { role: 'model', text: response.text || "Empty" }]);
        addLog(`[OUTBOUND] 200 OK`);
      } catch (err) {
        addLog('[ERROR] Crash detected');
      } finally {
        setIsThinking(false);
      }
    } else {
      addLog(`[SIGNAL] Processing ${model.category} stream...`);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in zoom-in-95 duration-300 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-6 shrink-0">
        <div className="flex items-center space-x-4">
          <button onClick={onBack} className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
          </button>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-2xl font-black text-white">{model.name}</h2>
              <span className="px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[9px] font-black uppercase rounded">Healthy</span>
            </div>
            <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Active Control Plane • Nodes: {nodes}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button onClick={handleTerminate} disabled={isTerminating} className="bg-red-500/10 text-red-500 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border border-red-500/20 transition-colors">
            {isTerminating ? 'Stopping...' : 'Terminate'}
          </button>
          <button onClick={handleScale} disabled={isScaling} className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-blue-600/20 transition-all active:scale-95">
            {isScaling ? 'Scaling...' : 'Scale Cluster'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 flex-1 overflow-hidden">
        {/* Left Stats/Endpoint Column */}
        <div className="lg:col-span-1 flex flex-col space-y-6 overflow-hidden">
          {/* Production Gateway Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-[2rem] p-6 space-y-5 shadow-2xl shrink-0">
             <div className="flex items-center justify-between">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Production Gateway</p>
                <div className="flex space-x-1">
                  <div className="w-1 h-1 rounded-full bg-emerald-500"></div>
                  <div className="w-1 h-1 rounded-full bg-emerald-500"></div>
                  <div className="w-1 h-1 rounded-full bg-emerald-500"></div>
                </div>
             </div>
             
             <div className="space-y-2">
                <p className="text-[9px] font-bold text-slate-500 uppercase">Endpoint URL</p>
                <div className="flex bg-slate-950 border border-slate-800 rounded-xl p-3 items-center justify-between group">
                   <code className="text-[11px] text-blue-400 truncate pr-2 font-mono">{endpointUrl}</code>
                   <button 
                    onClick={handleCopy}
                    className="text-slate-500 hover:text-white transition-colors"
                   >
                     {copyStatus === 'copied' ? (
                       <span className="text-[9px] font-black text-emerald-500">COPIED</span>
                     ) : (
                       <Icons.Layers className="w-4 h-4" />
                     )}
                   </button>
                </div>
             </div>

             <div className="space-y-2">
                <p className="text-[9px] font-bold text-slate-500 uppercase">Quick Integration (cURL)</p>
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 relative group">
                   <pre className="text-[10px] text-slate-400 font-mono whitespace-pre-wrap leading-relaxed">
                     curl -X POST {endpointUrl} \<br/>
                     -H "Authorization: Bearer $API_KEY" \<br/>
                     -d '{'{"input": "..."}'}'
                   </pre>
                </div>
             </div>

             <button className="w-full py-2.5 bg-slate-800 hover:bg-slate-750 text-[10px] font-black uppercase tracking-widest text-slate-300 rounded-xl border border-slate-700/50 transition-all">
               Manage API Keys
             </button>
          </div>

          {/* Real-time Performance Stats */}
          <div className="bg-slate-900 border border-slate-800 rounded-[2rem] p-6 shrink-0">
             <div className="grid grid-cols-2 gap-4">
               <div className="bg-slate-950/50 border border-slate-800 p-4 rounded-2xl">
                 <p className="text-[9px] text-slate-500 font-bold mb-1 uppercase">P99 Latency</p>
                 <p className="text-xl font-black text-white">{model.latency}</p>
               </div>
               <div className="bg-slate-950/50 border border-slate-800 p-4 rounded-2xl">
                 <p className="text-[9px] text-slate-500 font-bold mb-1 uppercase">Active TPS</p>
                 <p className="text-xl font-black text-white">{(nodes * 1.5).toFixed(1)}k</p>
               </div>
             </div>
          </div>

          {/* Log Stream */}
          <div className="bg-slate-900 border border-slate-800 rounded-[2rem] p-6 flex-1 flex flex-col overflow-hidden shadow-inner">
            <h4 className="text-xs font-black text-slate-400 tracking-widest mb-6 uppercase tracking-widest">System Events</h4>
            <div ref={logsRef} className="bg-slate-950 p-4 rounded-xl font-mono text-[10px] flex-1 overflow-y-auto space-y-2 border border-slate-800 custom-scrollbar">
              {logs.map((log, i) => (
                <p key={i} className={log.includes('[CLUSTER]') ? 'text-blue-400' : log.includes('[MODEL]') ? 'text-emerald-400' : 'text-slate-500'}>
                  {log}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Right Interaction Column */}
        <div className="lg:col-span-2 flex flex-col space-y-6 overflow-hidden">
          <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-8 h-full flex flex-col overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between mb-8 shrink-0">
              <h3 className="text-xl font-black text-white">Inference Playground</h3>
              <div className="flex space-x-2 text-[10px] font-black uppercase tracking-widest">
                <span className="text-slate-500">Session ID:</span>
                <span className="text-blue-400">{Math.random().toString(36).substring(7).toUpperCase()}</span>
              </div>
            </div>

            <div className="flex-1 bg-slate-950/40 border border-slate-800 rounded-[2rem] p-8 mb-6 overflow-hidden flex flex-col relative">
               {model.category === 'NLP' ? (
                 <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-8 p-2 custom-scrollbar">
                    {messages.length === 0 && !isThinking && (
                       <div className="h-full flex flex-col items-center justify-center opacity-40">
                          <Icons.Cpu className="w-12 h-12 mb-4 text-slate-600" />
                          <p className="text-slate-500 italic text-sm">Model standing by for local test...</p>
                       </div>
                    )}
                    {messages.map((m, i) => (
                      <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[92%] px-6 py-4 rounded-3xl text-sm ${
                          m.role === 'user' 
                          ? 'bg-blue-600 text-white shadow-lg' 
                          : 'bg-slate-900/80 text-slate-300 border border-slate-800/80 shadow-inner'
                        }`}>
                          {m.role === 'model' ? <FormattedText text={m.text} /> : m.text}
                        </div>
                      </div>
                    ))}
                    {isThinking && (
                      <div className="flex items-center space-x-3 text-[10px] font-black text-blue-400 uppercase tracking-[0.2em] ml-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
                        <span>Inferencing Cluster...</span>
                      </div>
                    )}
                 </div>
               ) : (
                 <div className="flex-1 flex items-center justify-center">
                    <div className="w-full max-w-lg space-y-4">
                       <div className="h-24 flex items-end space-x-1">
                          {[...Array(40)].map((_, i) => (
                            <div key={i} className="flex-1 bg-blue-500/20 rounded-t h-[30%] animate-pulse" style={{ animationDelay: `${i*50}ms` }}></div>
                          ))}
                       </div>
                       <p className="text-center text-slate-500 text-[10px] font-black uppercase tracking-widest">Streaming {model.category} telemetry</p>
                    </div>
                 </div>
               )}
            </div>

            <div className="flex space-x-4 shrink-0">
               <input 
                 value={input}
                 disabled={isThinking}
                 onChange={(e) => setInput(e.target.value)}
                 onKeyDown={(e) => e.key === 'Enter' && handleExecute()}
                 placeholder="Test local payload..."
                 className="flex-1 bg-slate-950 border border-slate-800 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-blue-500 transition-colors placeholder:text-slate-700"
               />
               <button onClick={handleExecute} disabled={isThinking} className="bg-blue-600 hover:bg-blue-500 text-white px-10 rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-blue-600/20 transition-all active:scale-95 disabled:opacity-50">
                 {isThinking ? '...' : 'Execute'}
               </button>
            </div>
          </div>
        </div>
      </div>
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #334155; }
      `}</style>
    </div>
  );
};

export default ModelDeploymentWorkspace;
