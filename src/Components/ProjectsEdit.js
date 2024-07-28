import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { styled } from '@mui/material/styles';

const CustomTextField = styled(TextField)({
    '& .MuiInputBase-root': {
        overflow: 'auto',
    },
});

function ProjectsEdit({ projects, onSave, onClose }) {
    const [projectsList, setProjectsList] = useState([]);

    useEffect(() => {
        if (typeof projects === 'string') {
            const projectArray = projects.split('\n\n').map((project, index) => ({
                id: index,
                title: `Project ${index + 1}`,
                description: project,
            }));
            setProjectsList(projectArray);
        } else {
            setProjectsList(projects);
        }
    }, [projects]);

    const handleProjectChange = (id, newDescription) => {
        const updatedProjects = projectsList.map((project) =>
            project.id === id ? { ...project, description: newDescription } : project
        );
        setProjectsList(updatedProjects);
    };

    const handleSave = () => {
        const projectDescriptions = projectsList.map((project) => project.description).join('\n\n');
        onSave({ projects: projectDescriptions });
    };

    const handleAddProject = () => {
        if (projectsList.length >= 3) {
            alert("You can only have a maximum of 3 projects.");
            return;
        }

        const newProject = {
            id: projectsList.length,
            title: `Project ${projectsList.length + 1}`,
            description: '',
        };
        setProjectsList([...projectsList, newProject]);
    };

    const handleRemoveProject = (id) => {
        const updatedProjects = projectsList.filter((project) => project.id !== id);
        setProjectsList(updatedProjects);
    };

    return (
        <Modal
            open={true}
            onClose={onClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '60%',
                    maxHeight: '80vh',
                    overflowY: 'auto',
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                    h2: {
                        textAlign: 'center',
                    },
                }}
            >
                <h2 id="modal-title">Edit Projects</h2>
                {projectsList.map((project) => (
                    <Box key={project.id} sx={{ mb: 2, position: 'relative' }}>
                        <CustomTextField
                            fullWidth
                            multiline
                            margin="normal"
                            label={project.title}
                            variant="outlined"
                            value={project.description}
                            onChange={(e) => handleProjectChange(project.id, e.target.value)}
                            minRows={4}
                            maxRows={10}
                        />
                        <Button
                            variant="contained"
                            color="secondary"
                            sx={{
                                position: 'absolute',
                                top: 10,
                                right: 10,
                            }}
                            onClick={() => handleRemoveProject(project.id)}
                        >
                            Remove
                        </Button>
                    </Box>
                ))}
                <Button onClick={handleAddProject} variant="contained" color="primary" sx={{ mt: 2 }}>
                    Add Project
                </Button>
                <Button onClick={handleSave} variant="contained" color="primary" sx={{ mt: 2, ml: 2 }}>
                    Save
                </Button>
                <Button onClick={onClose} variant="contained" color="secondary" sx={{ mt: 2, ml: 2 }}>
                    Cancel
                </Button>
            </Box>
        </Modal>
    );
}

ProjectsEdit.propTypes = {
    projects: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number,
                title: PropTypes.string,
                description: PropTypes.string,
            })
        ),
    ]),
    onSave: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default ProjectsEdit;
