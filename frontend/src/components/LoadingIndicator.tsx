import { Box, CircularProgress, Typography, Skeleton } from '@mui/material';

interface LoadingIndicatorProps {
    type?: 'spinner' | 'dots' | 'skeleton' | 'pulse';
    message?: string;
    fullScreen?: boolean;
}

export const LoadingIndicator = ({
                                     type = 'spinner',
                                     message = 'Loading...',
                                     fullScreen = false
                                 }: LoadingIndicatorProps) => {

    const content = {
        spinner: (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                <CircularProgress />
                {message && <Typography color="text.secondary">{message}</Typography>}
            </Box>
        ),

        dots: (
            <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                {[1, 2, 3].map((dot) => (
                    <Box
                        key={dot}
                        sx={{
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            bgColor: 'primary.main',
                            animation: 'pulse 1.5s ease-in-out infinite',
                            animationDelay: `${dot * 0.2}s`,
                            '@keyframes pulse': {
                                '0%, 100%': { opacity: 0.3, transform: 'scale(0.8)' },
                                '50%': { opacity: 1, transform: 'scale(1.2)' },
                            },
                        }}
                    />
                ))}
            </Box>
        ),

        skeleton: (
            <Box sx={{ width: '100%' }}>
                <Skeleton variant="text" height={40} />
                <Skeleton variant="text" height={40} />
                <Skeleton variant="rectangular" height={118} sx={{ my: 2 }} />
                <Box sx={{ display: 'flex', gap: 1 }}>
                    <Skeleton variant="circular" width={40} height={40} />
                    <Skeleton variant="circular" width={40} height={40} />
                </Box>
            </Box>
        ),

        pulse: (
            <Box sx={{
                width: '100%',
                height: 4,
                bgcolor: 'grey.200',
                overflow: 'hidden',
                borderRadius: 2
            }}>
                <Box sx={{
                    width: '30%',
                    height: '100%',
                    bgcolor: 'primary.main',
                    animation: 'slide 1.5s ease-in-out infinite',
                    '@keyframes slide': {
                        '0%': { transform: 'translateX(-100%)' },
                        '100%': { transform: 'translateX(400%)' },
                    },
                }} />
            </Box>
        ),
    };

    if (fullScreen) {
        return (
            <Box sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'rgba(255, 255, 255, 0.8)',
                zIndex: 9999
            }}>
                {content[type]}
            </Box>
        );
    }

    return content[type];
};