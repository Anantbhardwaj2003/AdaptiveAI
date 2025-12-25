
export type ServiceContext = 'hub' | 'ready-intel' | 'adaptive-ai' | 'annotation-engine';

export enum ModelTier {
  SLM = 'Small Language Model',
  LLM = 'Open-weight LLM',
}

export type DeploymentStatus = 'Idle' | 'Deploying' | 'Active' | 'Failed';

export interface ModelConfig {
  id: string;
  name: string;
  tier: ModelTier | string;
  parameters?: string;
  baseModel?: string;
  category: 'NLP' | 'Vision' | 'Audio' | 'Anomaly' | 'Logic' | 'Image';
  status: DeploymentStatus;
  latency?: string;
  desc?: string;
}

export interface TrainingJob {
  id: string;
  modelName: string;
  status: 'Idle' | 'Preprocessing' | 'Training' | 'Completed' | 'Failed';
  progress: number;
  startTime?: string;
}

export interface Dataset {
  id: string;
  name: string;
  size: string;
  format: 'JSONL' | 'CSV' | 'TXT' | 'JPG' | 'WAV';
  rows: number;
}
