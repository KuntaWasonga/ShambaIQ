// shared/utils/dateUtils.ts
import { format, formatDistance, isToday, isYesterday, differenceInDays } from 'date-fns';

// Format message time (e.g., "10:30 AM")
export const formatMessageTime = (date: Date | string): string => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return format(dateObj, 'h:mm a');
};

// Get relative time (e.g., "2 hours ago", "yesterday")
export const getRelativeTime = (date: Date | string): string => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return formatDistance(dateObj, new Date(), { addSuffix: true });
};

// Smart date display for messages
export const formatMessageDate = (date: Date | string): string => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;

    if (isToday(dateObj)) {
        return 'Today';
    } else if (isYesterday(dateObj)) {
        return 'Yesterday';
    } else {
        return format(dateObj, 'MMMM d, yyyy');
    }
};

// For grouping messages by date
export const getMessageGroupKey = (date: Date | string): string => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return format(dateObj, 'yyyy-MM-dd'); // Returns "2024-01-15"
};

// Check if message is from today
export const isFromToday = (date: Date | string): boolean => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return isToday(dateObj);
};

// Format for chat timestamps
export const formatChatTimestamp = (date: Date | string): string => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;

    if (isToday(dateObj)) {
        return format(dateObj, 'h:mm a'); // "10:30 AM"
    } else if (isYesterday(dateObj)) {
        return `Yesterday at ${format(dateObj, 'h:mm a')}`; // "Yesterday at 10:30 AM"
    } else {
        return format(dateObj, 'MMM d, h:mm a'); // "Jan 15, 10:30 AM"
    }
};

// Get duration between dates (e.g., for response time tracking)
export const getResponseTime = (sentDate: Date, responseDate: Date): string => {
    const minutes = differenceInDays(responseDate, sentDate) * 24 * 60;

    if (minutes < 1) return 'just now';
    if (minutes === 1) return '1 minute';
    if (minutes < 60) return `${minutes} minutes`;
    if (minutes < 120) return '1 hour';
    return `${Math.floor(minutes / 60)} hours`;
};