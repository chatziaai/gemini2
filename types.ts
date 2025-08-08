
export interface FAQItem {
  question: string;
  answer: string;
}

export interface TrainingFile {
  name: string;
  content: string;
  size: number;
}

export interface QAItem {
  id: string;
  title: string;
  question: string;
  answer: string;
}

export interface Agent {
  id: string;
  name: string;
  files: TrainingFile[];
  qas: QAItem[];
}

export interface ChatMessage {
    role: 'user' | 'model';
    text: string;
}
