import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import AppAppBar from './AppAppBar';
import { alpha } from '@mui/material';
import Container from '@mui/material/Container';
import { Button } from '@mui/material';
import DeveloperEdit from './DeveloperEdit';
import frogProfile from './img/frog-profile.jpg';
import { useState } from 'react';

export default function DeveloperView() {
    const [mode, setMode] = React.useState('light');

    const defaultTheme = createTheme({ palette: { mode } });

    const toggleColorMode = () => {
      setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
    };

    const [isEditing, setIsEditing] = useState(false);

    const [developerInfo, setDeveloperInfo] = useState({
        name: '',
        description: '',
        projects: '',
        languages: []
    });

    const handleButtonClick = () => {
        setIsEditing(true);
    };

    const handleSave = (newInfo) => {
        setDeveloperInfo(newInfo);
        setIsEditing(false);
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <AppAppBar mode={mode} toggleColorMode={toggleColorMode} />
            <Box
                id="hero"
                sx={(theme) => ({
                    width: '100%',
                    backgroundImage:
                        theme.palette.mode === 'light'
                            ? 'linear-gradient(180deg, #CEE5FD, #FFF)'
                            : `linear-gradient(#02294F, ${alpha('#090E10', 0.0)})`,
                    backgroundSize: '100% 20%',
                    backgroundRepeat: 'no-repeat',
                })}
            >
                <Container
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        pt: { xs: 14, sm: 20 },
                        pb: { xs: 8, sm: 12 },
                    }}
                >
                    <Box sx={{ bgcolor: 'background.default' }}>
                        <div>
                            <Box 
                                margin={10}
                                sx={{ 
                                    border: '2px solid red', 
                                    padding: 2,
                                    position: 'relative',
                                }}
                            >
                                <Box
                                    sx={{ 
                                        display: 'flex', 
                                        gap: 2,
                                    }}
                                >
                                    <Box
                                        sx={{
                                            border: '2px solid grey',
                                            height: 400,
                                            width: 500,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <img src={frogProfile} alt="Frog Profile" style={{ width: '100%', height: 'auto' }} />
                                        <h2>{developerInfo.name}</h2>
                                    </Box>
                                    <Box
                                        sx={{
                                            border: '2px solid grey',
                                            height: 300,
                                            width: 500,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'flex-start',
                                            justifyContent: 'center',
                                            position: 'relative',
                                            marginLeft: 'auto',
                                        }}
                                    >
                                        <Button
                                            variant='contained'
                                            sx={{
                                                position: 'absolute',
                                                top: 10,
                                                right: 10,
                                            }}
                                            onClick={handleButtonClick}
                                        >
                                            Edit
                                        </Button>
                                        <h2>
                                            {developerInfo.languages.map(lang => lang.name).join(', ')}
                                        </h2>
                                    </Box>
                                </Box>
                                <Box
                                    sx={{
                                        border: '2px solid grey',
                                        height: 400,
                                        marginTop: 2,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <h2>Description</h2>
                                    <p>{developerInfo.description}</p>
                                </Box>
                                <Box
                                    sx={{
                                        border: '2px solid grey',
                                        height: 400,
                                        marginTop: 2,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <h2>Projects</h2>
                                    <p>{developerInfo.projects}</p>
                                </Box>
                            </Box>
                            {isEditing && (
                                <DeveloperEdit
                                    developerInfo={developerInfo}
                                    onSave={handleSave}
                                    onClose={() => setIsEditing(false)}
                                />
                            )}
                        </div>
                    </Box>
                </Container>
            </Box>
            <Divider />
        </ThemeProvider>
    );
}