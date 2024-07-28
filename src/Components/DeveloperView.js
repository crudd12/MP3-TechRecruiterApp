import React, { useState, useEffect, useRef } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import AppAppBar from './AppAppBar';
import { alpha } from '@mui/material';
import Container from '@mui/material/Container';
import { Button, Chip } from '@mui/material';
import DeveloperEdit from './DeveloperEdit';
import DescriptionEdit from './DescriptionEdit';
import ProjectsEdit from './ProjectsEdit';
import frogProfile from './img/frog-profile.jpg';

export default function DeveloperView() {
    const [mode, setMode] = useState('light');
    const [isEditing, setIsEditing] = useState(false);
    const [isEditingDescription, setIsEditingDescription] = useState(false);
    const [isEditingProjects, setIsEditingProjects] = useState(false);
    const descriptionRef = useRef(null);
    const projectsRef = useRef(null);

    const defaultTheme = createTheme({ palette: { mode } });

    const toggleColorMode = () => {
        setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
    };

    const [developerInfo, setDeveloperInfo] = useState({
        firstName: '',
        lastName: '',
        email: '',
        description: '',
        projects: '',
        languages: []
    });

    useEffect(() => {
        adjustBoxHeight(descriptionRef, developerInfo.description);
        adjustBoxHeight(projectsRef, developerInfo.projects);
    }, [developerInfo.description, developerInfo.projects]);

    const adjustBoxHeight = (ref, content) => {
        if (ref.current) {
            ref.current.style.height = 'auto';
            ref.current.style.height = `${ref.current.scrollHeight}px`;
        }
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleEditDescription = () => {
        setIsEditingDescription(true);
    };

    const handleEditProjects = () => {
        setIsEditingProjects(true);
    };

    const handleSave = (newInfo) => {
        setDeveloperInfo((prev) => ({
            ...prev,
            ...newInfo
        }));
        setIsEditing(false);
    };

    const handleSaveDescription = (newDescription) => {
        setDeveloperInfo((prev) => ({ ...prev, description: newDescription.description }));
        setIsEditingDescription(false);
    };

    const handleSaveProjects = (newProjects) => {
        setDeveloperInfo((prev) => ({ ...prev, projects: newProjects.projects }));
        setIsEditingProjects(false);
    };

    const renderContent = (text) => {
        return typeof text === 'string' ? text.split('\n').map((paragraph, index) => (
            <p key={index} style={{ textAlign: 'left' }}>{paragraph}</p>
        )) : <p>No content available.</p>;
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
                        pt: { xs: 12, sm: 16 },
                        pb: { xs: 6, sm: 8 },
                    }}
                >
                    <Box sx={{ bgcolor: 'background.default' }}>
                        <div>
                            <Box 
                                margin={5}
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
                                        <h2>{developerInfo.firstName} {developerInfo.lastName}</h2>
                                        <p>Contact: {developerInfo.email}</p>
                                    </Box>
                                    <Box
                                        sx={{
                                            border: '2px solid grey',
                                            height: 300,
                                            width: 500,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
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
                                            onClick={handleEditClick}
                                        >
                                            Edit
                                        </Button>
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 1 }}>
                                            {developerInfo.languages.map((lang, index) => (
                                                <Chip key={index} label={lang.name} />
                                            ))}
                                        </Box>
                                    </Box>
                                </Box>
                                <Box
                                    ref={descriptionRef}
                                    sx={{
                                        border: '2px solid grey',
                                        marginTop: 2,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'flex-start',
                                        justifyContent: 'flex-start',
                                        padding: 2,
                                        position: 'relative',
                                        textAlign: 'left',
                                        overflow: 'hidden',
                                    }}
                                >
                                    <Button
                                        variant='contained'
                                        sx={{
                                            position: 'absolute',
                                            top: 10,
                                            right: 10,
                                        }}
                                        onClick={handleEditDescription}
                                    >
                                        Edit
                                    </Button>
                                    <h2>Description</h2>
                                    {renderContent(developerInfo.description)}
                                </Box>
                                <Box
                                    ref={projectsRef}
                                    sx={{
                                        border: '2px solid grey',
                                        marginTop: 2,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'flex-start',
                                        justifyContent: 'flex-start',
                                        padding: 2,
                                        position: 'relative',
                                        textAlign: 'left',
                                        overflow: 'hidden',
                                    }}
                                >
                                    <Button
                                        variant='contained'
                                        sx={{
                                            position: 'absolute',
                                            top: 10,
                                            right: 10,
                                        }}
                                        onClick={handleEditProjects}
                                    >
                                        Edit
                                    </Button>
                                    <h2>Projects</h2>
                                    {renderContent(developerInfo.projects)}
                                </Box>
                            </Box>
                            {isEditing && (
                                <DeveloperEdit
                                    developerInfo={developerInfo}
                                    onSave={handleSave}
                                    onClose={() => setIsEditing(false)}
                                />
                            )}
                            {isEditingDescription && (
                                <DescriptionEdit
                                    descriptionInfo={{ description: developerInfo.description }}
                                    onSave={handleSaveDescription}
                                    onClose={() => setIsEditingDescription(false)}
                                />
                            )}
                            {isEditingProjects && (
                                <ProjectsEdit
                                    projects={developerInfo.projects}
                                    onSave={handleSaveProjects}
                                    onClose={() => setIsEditingProjects(false)}
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
