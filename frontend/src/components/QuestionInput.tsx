import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
    Paper,
    Typography,
    TextField,
    IconButton,
    Box,
    CircularProgress
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';

const questionSchema = z.object({
    question: z.string()
        .min(5, 'Question must be at least 5 characters')
        .max(500, 'Question is too long')
});

type QuestionFormData = z.infer<typeof questionSchema>;

interface QuestionInputProps {
    onSubmit: (question: string) => Promise<void>;
    disabled?: boolean;
}

export const QuestionInput = ({ onSubmit, disabled }: QuestionInputProps) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting }
    } = useForm<QuestionFormData>({
        resolver: zodResolver(questionSchema),
        mode: 'onChange'
    });

    const handleFormSubmit = async (data: QuestionFormData) => {
        await onSubmit(data.question);
        reset();
    };

    return (
        <Paper
            elevation={0}
            sx={{
                p: 2,
                borderTop: 1,
                borderColor: 'divider',
                backgroundColor: 'background.default'
            }}
        >
            <form onSubmit={handleSubmit(handleFormSubmit)}>
                <Box sx={{ display: 'flex', gap: 1 }}>
                    <TextField
                        {...register('question')}
                        fullWidth
                        multiline
                        maxRows={4}
                        placeholder="Type your farming question..."
                        disabled={disabled || isSubmitting}
                        error={!!errors.question}
                        helperText={errors.question?.message}
                        variant="outlined"
                        size="small"
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleSubmit(handleFormSubmit)();
                            }
                        }}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 3,
                            }
                        }}
                    />

                    <IconButton
                        color="primary"
                        disabled={disabled || isSubmitting}
                        sx={{ alignSelf: 'flex-end' }}
                    >
                        <AttachFileIcon />
                    </IconButton>

                    <IconButton
                        type="submit"
                        color="primary"
                        disabled={disabled || isSubmitting}
                        sx={{ alignSelf: 'flex-end' }}
                    >
                        {isSubmitting ? <CircularProgress size={24} /> : <SendIcon />}
                    </IconButton>
                </Box>

                <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ mt: 1, display: 'block' }}
                >
                    Press Enter to send, Shift+Enter for new line
                </Typography>
            </form>
        </Paper>
    );
};