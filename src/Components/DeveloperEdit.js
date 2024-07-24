import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

function DeveloperEdit({ developerInfo, onSave, onClose }) {
    const [name, setName] = useState(developerInfo.name);
    const [description, setDescription] = useState(developerInfo.description);
    const [projects, setProjects] = useState(developerInfo.projects);
    const [languages, setLanguages] = useState(developerInfo.languages);

    const handleSave = () => {
        onSave({
            name,
            description,
            projects,
            languages
        });
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
                    width: 400,
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                }}
            >
                <h2 id="modal-title">Edit Information</h2>
                <TextField
                    fullWidth
                    margin="normal"
                    label="Edit Name"
                    variant="outlined"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Edit Description"
                    variant="outlined"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Edit Projects"
                    variant="outlined"
                    value={projects}
                    onChange={(e) => setProjects(e.target.value)}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Edit Languages"
                    variant="outlined"
                    value={languages}
                    onChange={(e) => setLanguages(e.target.value)}
                />
                <Button onClick={handleSave} variant="contained" color="primary">
                    Save
                </Button>
                <Button onClick={onClose} variant="contained" color="secondary" sx={{ ml: 2 }}>
                    Cancel
                </Button>
            </Box>
        </Modal>
    );
}

export default DeveloperEdit;