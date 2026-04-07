export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface ResearchSession {
  id: number;
  userId: number;
  title: string;
  description?: string;
  provider: 'openai' | 'gemini' | 'ollama';
  embeddingModel: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  result?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ResearchJob {
  id: number;
  sessionId: number;
  pgBossJobId: string;
  query: string;
  status: 'queued' | 'running' | 'completed' | 'failed';
  result?: string;
  createdAt: string;
}

export interface JobProgressEvent {
  jobId: string;
  step: 'decompose' | 'search' | 'summarize' | 'synthesize' | 'agent';
  status: 'started' | 'progress' | 'completed' | 'failed';
  message: string;
  data?: {
    subQuestions?: string;
    searchQueries?: string;
    summaries?: string;
    report?: string;
  };
}
