import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export interface ChatRequest {
    question: string;
    farmerId?: string;
    sessionId?: string;
    location?: { lat: number; lng: number };
}

export interface ChatResponse {
    answer: string;
    sessionId: string;
    timestamp: string;
    suggestedQuestions?: string[];
}

const api = axios.create({
    baseURL: API_BASE_URL,
});

export const sendQuestion = async (data: ChatRequest): Promise<ChatResponse> => {
    try {
        const response = await api.post('/chat', data);
        return response.data;
    } catch (error) {
        console.error('Chat API error:', error);
        throw error;
    }
};