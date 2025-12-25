
import React, { useState, useEffect, useRef } from 'react';
import { geminiService } from '../services/geminiService';

const SpeechView: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [analysis, setAnalysis] = useState('');
  const [loadingAnalysis, setLoadingAnalysis] = useState(false);
  
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;

      recognitionRef.current.onresult = (event: any) => {
        let currentTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          currentTranscript += event.results[i][0].transcript;
        }
        setTranscript(currentTranscript);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error("Speech recognition error", event.error);
        setIsRecording(false);
      };
    }
  }, []);

  const toggleRecording = () => {
    if (isRecording) {
      recognitionRef.current?.stop();
      setIsRecording(false);
      if (transcript) handleAnalyze();
    } else {
      setTranscript('');
      setAnalysis('');
      recognitionRef.current?.start();
      setIsRecording(true);
    }
  };

  const handleAnalyze = async () => {
    if (!transcript) return;
    setLoadingAnalysis(true);
    const result = await geminiService.transcribeAndAnalyze(transcript);
    setAnalysis(result || "Analysis complete.");
    setLoadingAnalysis(false);
  };

  return (
    <div className="max-w-3xl space-y-10">
      <div>
        <h2 className="text-3xl font-bold mb-2">Speech-to-Text Studio</h2>
        <p className="text-slate-400">Dictate model instructions or transcribe agent feedback using high-fidelity offline processing.</p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-10 flex flex-col items-center justify-center space-y-8">
        <div className="relative">
          <button 
            onClick={toggleRecording}
            className={`w-24 h-24 rounded-full flex items-center justify-center transition-all ${isRecording ? 'bg-red-500 animate-pulse shadow-2xl shadow-red-500/50' : 'bg-blue-600 hover:bg-blue-500 shadow-2xl shadow-blue-600/30'}`}
          >
            {isRecording ? (
               <div className="w-8 h-8 bg-white rounded-sm"></div>
            ) : (
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path></svg>
            )}
          </button>
          {isRecording && (
            <div className="absolute inset-0 rounded-full border-4 border-red-500/50 scale-125 animate-ping"></div>
          )}
        </div>

        <div className="w-full space-y-4">
          <div className="flex justify-between items-end">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest">Live Transcript</h3>
            {transcript && !isRecording && (
              <button onClick={handleAnalyze} className="text-xs font-bold text-blue-400 hover:underline">Re-Analyze</button>
            )}
          </div>
          <div className="min-h-[160px] w-full bg-slate-950/50 border border-slate-800 rounded-2xl p-6 text-xl leading-relaxed text-slate-300 italic">
            {transcript || (isRecording ? "Listening..." : "Click the mic and start speaking...")}
          </div>
        </div>
      </div>

      { (loadingAnalysis || analysis) && (
        <div className="bg-blue-600/5 border border-blue-500/20 rounded-3xl p-8 space-y-4">
          <h3 className="font-bold text-blue-400 flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
            <span>AI Feedback Insights</span>
          </h3>
          {loadingAnalysis ? (
            <div className="space-y-2 animate-pulse">
              <div className="h-4 bg-slate-800 rounded w-full"></div>
              <div className="h-4 bg-slate-800 rounded w-5/6"></div>
              <div className="h-4 bg-slate-800 rounded w-4/6"></div>
            </div>
          ) : (
            <div className="prose prose-invert prose-sm max-w-none text-slate-300">
              <p className="whitespace-pre-wrap">{analysis}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SpeechView;
