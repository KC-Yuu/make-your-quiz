export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface QuizResult {
  score: number;
  total: number;
  details: {
    questionIndex: number;
    isCorrect: boolean;
    userAnswerIndex: number;
  }[];
}

export enum AppState {
  API_KEY_INPUT = 'API_KEY_INPUT',
  UPLOAD = 'UPLOAD',
  PROCESSING = 'PROCESSING',
  QUIZ = 'QUIZ',
  RESULTS = 'RESULTS',
  ERROR = 'ERROR'
}

export type FileType = 'application/pdf' | 'text/markdown' | 'text/plain';
