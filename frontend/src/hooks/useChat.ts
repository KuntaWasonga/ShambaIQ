import { useState, useCallback } from 'react';
import axios from 'axios';
import { v4 as uuidV4 } from 'uuid';
import type {ChatResponse, Message} from '../types/chat';

export const useChat = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const askQuestion = useCallback(async (question: string) => {
        const userMessageId = uuidV4();

        const userMessage: Message = {
            id: userMessageId,
            content: question,
            sender: 'user',
            timestamp: new Date(),
            status: 'sending'
        };

        setMessages(prev => [
            ...prev, userMessage
        ]);

        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.post<ChatResponse>('/api/chat', {
                question,
                sessionId: localStorage.getItem('chatSessionId'),
                timestamp: new Date().toISOString()
            });

            // Update user message status
            setMessages(prev =>
                prev.map(msg =>
                    msg.id === userMessageId
                        ? { ...msg, status: 'sent' }
                        : msg
                )
            );

            const advisorMessage: Message = {
                id: uuidV4(),
                content: response.data.answer,
                sender: 'advisor',
                timestamp: new Date(response.data.timestamp),
            };

            setMessages(prev => [
                ...prev,
                advisorMessage
            ]);

            if (response.data.sessionId) {
                localStorage.setItem('chatSessionId', response.data.sessionId);
            }

        } catch (err: unknown) {
            setMessages(prev =>
                prev.map(msg =>
                    msg.id === userMessageId
                        ? { ...msg, status: 'error' }
                        : msg
                )
            );

            if (axios.isAxiosError(err)) {
                setError(err.response?.data?.message || 'Failed to get response');
            } else {
                setError('An unexpected error occurred');
            }
        } finally {
            setIsLoading(false);
        }
    }, []);

    const clearHistory = useCallback(() => {
        setMessages([]);
        localStorage.removeItem('chatSessionId');
    }, []);

    const clearError = useCallback(() => {
        setError(null);
    }, []);

    const retryLastQuestion = useCallback(async () => {
        const lastUserMessage = [...messages]
            .reverse()
            .find(m => m.sender === 'user');

        if (lastUserMessage) {
            await askQuestion(lastUserMessage.content);
        }
    }, [messages, askQuestion]);

    return {
        messages,
        isLoading,
        error,
        askQuestion,
        clearHistory,
        clearError,
        retryLastQuestion,
        messageCount: messages.length
    };
};