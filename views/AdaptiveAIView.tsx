
import React from 'react';
import DashboardView from './DashboardView';
// Fixed case sensitivity of the import to match the filename DatasetsView.tsx
import DatasetsView from './DatasetsView';
import FineTuneView from './FineTuneView';
import PlaygroundView from './PlaygroundView';
import SpeechView from './SpeechView';

interface AdaptiveAIViewProps {
  activeTab: string;
  setActiveTab: (t: string) => void;
}

const AdaptiveAIView: React.FC<AdaptiveAIViewProps> = ({ activeTab, setActiveTab }) => {
  const renderSubTab = () => {
    switch (activeTab) {
      case 'dashboard': return <DashboardView />;
      case 'datasets': return <DatasetsView />;
      case 'finetune': return <FineTuneView />;
      case 'playground': return <PlaygroundView />;
      case 'speech': return <SpeechView />;
      default: return <DashboardView />;
    }
  };

  return (
    <div className="space-y-2">
      {renderSubTab()}
    </div>
  );
};

export default AdaptiveAIView;
