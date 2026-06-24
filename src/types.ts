export interface Service {
  id: string;
  title: string;
  iconName: string;
  description: string;
  highlights: string[];
  color: string;
  badge: string;
}

export interface AMAEvent {
  id: string;
  projectName: string;
  platform: 'Telegram' | 'Discord' | 'Twitter Spaces';
  duration: string;
  attendees: number;
  topics: string[];
  date: string;
  summary: string;
}

export interface ContractSample {
  name: string;
  code: string;
  explanation: string;
  simulatedState: Record<string, any>;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}
