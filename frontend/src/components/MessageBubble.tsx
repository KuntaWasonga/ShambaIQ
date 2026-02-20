import React from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import type { Message } from '../types/chat';

interface MessageBubbleProps {
    message: Message;
    isOwnMessage: boolean;
}

interface StyledBubbleProps {
    isOwnMessage: boolean;
    message: Message;
}

const StyledBubble = styled(Paper, {
    shouldForwardProp: (prop) => prop !== 'isOwnMessage',
})<StyledBubbleProps>(({ theme, isOwnMessage, message }) => ({
    backgroundColor: isOwnMessage
        ? theme.palette.primary.main
        : theme.palette.grey[100],
    color: isOwnMessage
        ? theme.palette.primary.contrastText
        : theme.palette.text.primary,
    padding: theme.spacing(1.5, 2),
    borderRadius: theme.spacing(2),
    maxWidth: isOwnMessage ? '85%' : '85%',
    [theme.breakpoints.up('sm')]: {
        maxWidth: '70%',
    },
    alignSelf: isOwnMessage ? 'flex-end' : 'flex-start',
    marginBottom: theme.spacing(1),
    wordBreak: 'break-word',
    opacity: message.status === 'sending' ? 0.7 : 1,
    border: message.status === 'error' ? `1px solid ${theme.palette.error.main}` : 'none',
}));

const MessageBubble: React.FC<MessageBubbleProps> = ({
                                                         message,
                                                         isOwnMessage,
                                                     }) => {
    const formattedTime = message.timestamp.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
    });

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: isOwnMessage ? 'flex-end' : 'flex-start',
            }}
        >
            <StyledBubble elevation={1} isOwnMessage={isOwnMessage} message={message}>
                <Typography variant="body2">{message.content}</Typography>

                <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 0.5 }}>
                    <Typography
                        variant="caption"
                        sx={{ opacity: 0.7 }}
                    >
                        {formattedTime}
                    </Typography>
                    {message.status === 'sending' && (
                        <Typography variant="caption" sx={{ opacity: 0.7 }}>
                            • Sending
                        </Typography>
                    )}
                    {message.status === 'error' && (
                        <Typography variant="caption" color="error">
                            • Failed
                        </Typography>
                    )}
                </Box>
            </StyledBubble>
        </Box>
    );
};

export default MessageBubble;