import { Box, Avatar, Typography } from '@mui/material';
import type { Message } from '../types/chat';
import MessageBubble from "./MessageBubble";

interface MessageListProps {
    messages: Message[];
}

export const MessageList = ({ messages }: MessageListProps) => {
    const groupedMessages = messages.reduce((groups, message) => {
        const date = message.timestamp.toDateString();
        if (!groups[date]) {
            groups[date] = [];
        }
        groups[date].push(message);
        return groups;
    }, {} as Record<string, Message[]>);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            {Object.entries(groupedMessages).map(([date, dateMessages]) => (
                <Box key={date}>
                    <Typography
                        variant="caption"
                        sx={{ display: 'block', textAlign: 'center', my: 2 }}
                    >
                        {new Date(date).toLocaleDateString(undefined, {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}
                    </Typography>

                    {dateMessages.map((message) => (
                        <Box
                            key={message.id}
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: message.sender === 'user' ? 'flex-end' : 'flex-start',
                                mb: 2
                            }}
                        >
                            {message.sender === 'advisor' && (
                                <Avatar
                                    sx={{ width: 32, height: 32, mb: 0.5 }}
                                    src="/advisor-avatar.png"
                                >
                                    A
                                </Avatar>
                            )}

                            <MessageBubble
                                message={message}
                                isOwnMessage={message.sender === 'user'}
                            />
                        </Box>
                    ))}
                </Box>
            ))}

            {messages.length === 0 && (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                    <Typography variant="h6" color="text.secondary" gutterBottom>
                        👋 Ask me anything about farming!
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Try asking about crop diseases, weather advice, or best practices
                    </Typography>
                </Box>
            )}
        </Box>
    );
};