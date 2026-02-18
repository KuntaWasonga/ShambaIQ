import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useTheme } from '../contexts/ThemeContext';

export const ChatHeader = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <AppBar position="static" color="default" elevation={1}>
            <Toolbar>
                <IconButton edge="start" color="inherit" sx={{ mr: 2 }}>
                    <MenuIcon />
                </IconButton>

                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Farming Advisor
                </Typography>

                <IconButton onClick={toggleTheme} color="inherit">
                    {theme === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};