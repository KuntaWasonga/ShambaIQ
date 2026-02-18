import { useRef, useEffect } from 'react';
import {
    Container,
    Paper,
    Box,
    Alert,
    Snackbar
} from '@mui/material';
import { useChat } from '../hooks/useChat';
import { MessageList } from './MessageList';
import { QuestionInput } from './QuestionInput';
import { ChatHeader } from './ChatHeader';
import { LoadingIndicator } from "./LoadingIndicator";

export const ChatInterface = () => {
    const { messages, isLoading, error, askQuestion, clearError } = useChat();
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <Container maxWidth="md" sx={{ height: '100vh', py: 2 }}>
            <Paper
                elevation={3}
                sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden'
                }}
            >
                <ChatHeader />

                <Box sx={{ flex: 1, overflow: 'auto', p: 2 }}>
                    <MessageList messages={messages} />
                    {isLoading && <LoadingIndicator />}
                    <div ref={messagesEndRef} />
                </Box>

                <QuestionInput
                    onSubmit={askQuestion}
                    disabled={isLoading}
                />
            </Paper>

            <Snackbar
                open={!!error}
                autoHideDuration={6000}
                onClose={clearError}
            >
                <Alert severity="error" onClose={clearError}>
                    {error}
                </Alert>
            </Snackbar>
        </Container>
    );
};