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

function ProjectsEdit({ projects, files: initialFiles, onSave, onClose }) {
    const [projectsList, setProjectsList] = useState([]);
    const [files, setFiles] = useState(initialFiles || []);
    const [errors, setErrors] = useState({});
    const [charCounts, setCharCounts] = useState({}); // Track character counts for each project
    const maxCharacters = 1000; // Set your character limit here

    useEffect(() => {
        if (typeof projects === 'string') {
            const projectArray = projects.split('\n\n').map((project, index) => ({
                id: index,
                title: `Project ${index + 1}`,
                description: project,
            }));
            setProjectsList(projectArray);
            setCharCounts(projectArray.reduce((acc, project) => ({ ...acc, [project.id]: project.description.length }), {}));
        } else {
            const reIndexedProjects = projects.map((project, index) => ({
                ...project,
                id: index,
                title: `Project ${index + 1}`,
            }));
            setProjectsList(reIndexedProjects);
            setCharCounts(reIndexedProjects.reduce((acc, project) => ({ ...acc, [project.id]: project.description.length }), {}));
        }
    }, [projects]);

    const handleProjectChange = (id, newDescription) => {
        if (newDescription.length <= maxCharacters) {
            const updatedProjects = projectsList.map((project) =>
                project.id === id ? { ...project, description: newDescription } : project
            );
            setProjectsList(updatedProjects);
            setCharCounts((prev) => ({ ...prev, [id]: newDescription.length }));
            setErrors((prev) => ({ ...prev, [id]: null }));
        } else {
            setErrors((prev) => ({ ...prev, [id]: `Description exceeds the maximum length of ${maxCharacters} characters.` }));
        }
    };

    const handleFileChange = (id, newFile) => {
        if (newFile && (newFile.type.startsWith('image/') || newFile.type.startsWith('application/'))) {
            const updatedFiles = [...files];
            updatedFiles[id] = newFile;
            setFiles(updatedFiles);
        } else {
            alert('Invalid file type. Please select an image or document.');
        }
    };

    const handleSave = () => {
        const projectDescriptions = projectsList.map((project) => project.description).join('\n\n');
        onSave({ projects: projectDescriptions, files });
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
        setFiles([...files, null]); // Add a placeholder for the new project's file
        setCharCounts((prev) => ({ ...prev, [newProject.id]: 0 })); // Initialize character count for new project
    };

    const handleRemoveProject = (id) => {
        const updatedProjects = projectsList.filter((project) => project.id !== id);
        const reIndexedProjects = updatedProjects.map((project, index) => ({
            ...project,
            id: index,
            title: `Project ${index + 1}`,
        }));
        setProjectsList(reIndexedProjects);
        setFiles(files.filter((_, index) => index !== id)); // Remove the file associated with the deleted project
        setCharCounts((prev) => {
            const { [id]: _, ...rest } = prev;
            return rest;
        }); // Remove the character count for the deleted project
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
                            helperText={errors[project.id] || `${maxCharacters - charCounts[project.id]} characters remaining`}
                            error={Boolean(errors[project.id])}
                        />
                        <input
                            type="file"
                            onChange={(e) => handleFileChange(project.id, e.target.files[0])}
                            style={{ marginTop: '10px' }}
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
    files: PropTypes.arrayOf(PropTypes.object),
    onSave: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default ProjectsEdit;
