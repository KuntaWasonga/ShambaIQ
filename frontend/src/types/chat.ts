export type Sender = 'user' | 'advisor' | 'system';

export interface Message {
    id: string;
    content: string;
    sender: Sender;
    timestamp: Date;
    status?: 'sending' | 'sent' | 'error';
}

export interface ChatResponse {
    answer: string;
    sessionId: string;
    timestamp: Date;
    suggestedQuestions?: string[];
}