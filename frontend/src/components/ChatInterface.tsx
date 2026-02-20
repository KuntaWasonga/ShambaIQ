import { useRef, useEffect } from 'react';
import {
    Container,
    Paper,
    Box,
    Alert,
    Snackbar,
    useTheme as useMuiTheme,
    useMediaQuery
} from '@mui/material';
import { useChat } from '../hooks/useChat';
import { MessageList } from './MessageList';
import { QuestionInput } from './QuestionInput';
import { ChatHeader } from './ChatHeader';
import { LoadingIndicator } from "./LoadingIndicator";

export const ChatInterface = () => {
    const { messages, isLoading, error, askQuestion, clearError } = useChat();
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const muiTheme = useMuiTheme();
    const isMobile = useMediaQuery(muiTheme.breakpoints.down('sm'));

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <Container
            maxWidth="md"
            sx={{
                height: '100vh',
                py: isMobile ? 1 : 2,
                px: isMobile ? 1 : 2
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    borderRadius: isMobile ? 1 : 2
                }}
            >
                <ChatHeader />

                <Box sx={{
                    flex: 1,
                    overflow: 'auto',
                    p: isMobile ? 1 : 2
                }}>
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
                anchorOrigin={{
                    vertical: isMobile ? 'top' : 'bottom',
                    horizontal: 'center'
                }}
            >
                <Alert severity="error" onClose={clearError}>
                    {error}
                </Alert>
            </Snackbar>
        </Container>
    );
};