
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import HubView from './views/HubView';
import ReadyIntelligenceView from './views/ReadyIntelligenceView';
import AdaptiveAIView from './views/AdaptiveAIView';
import AnnotationEngineView from './views/AnnotationEngineView';
import { ServiceContext } from './types';

const App: React.FC = () => {
  const [context, setContext] = useState<ServiceContext>('hub');
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    if (context === 'hub') return <HubView onSelectService={(s) => { setContext(s); setActiveTab('dashboard'); }} />;
    
    switch (context) {
      case 'ready-intel': return <ReadyIntelligenceView activeTab={activeTab} />;
      case 'adaptive-ai': return <AdaptiveAIView activeTab={activeTab} setActiveTab={setActiveTab} />;
      case 'annotation-engine': return <AnnotationEngineView activeTab={activeTab} />;
      default: return <HubView onSelectService={setContext} />;
    }
  };

  return (
    <div className="flex h-screen w-full bg-slate-950 overflow-hidden">
      <Sidebar 
        context={context} 
        setContext={setContext} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
      />
      <main className="flex-1 overflow-y-auto overflow-x-hidden bg-[#020617] relative">
        <div className="max-w-7xl mx-auto p-4 md:p-8">
          {renderContent()}
        </div>
        
        {/* Glow Effects - Properly contained */}
        <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none -z-10"></div>
        <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/5 blur-[120px] rounded-full pointer-events-none -z-10"></div>
      </main>
    </div>
  );
};

export default App;
