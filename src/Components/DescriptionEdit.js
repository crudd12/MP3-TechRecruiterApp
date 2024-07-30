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

function DescriptionEdit({ descriptionInfo, onSave, onClose, currentUser }) {
    const [description, setDescription] = useState(descriptionInfo.description || '');

    useEffect(() => {
        setDescription(descriptionInfo.description || '');
    }, [descriptionInfo.description]);

    const handleSave = async () => {
        try {
            const response = await fetch(`http://localhost:3001/developer/update/description`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify({
                    id: currentUser._id,
                    description,
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            onSave(data); // Update the parent component with the new data
            onClose();
        } catch (error) {
            console.error('Failed to update description:', error);
        }
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
                <h2 id="modal-title">Edit Description</h2>
                <CustomTextField
                    fullWidth
                    multiline
                    margin="normal"
                    label="Edit Description"
                    variant="outlined"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    minRows={4}
                    maxRows={20}
                />
                <Button onClick={handleSave} variant="contained" color="primary" sx={{ mt: 2 }}>
                    Save
                </Button>
                <Button onClick={onClose} variant="contained" color="secondary" sx={{ mt: 2, ml: 2 }}>
                    Cancel
                </Button>
            </Box>
        </Modal>
    );
}

DescriptionEdit.propTypes = {
    descriptionInfo: PropTypes.shape({
        description: PropTypes.string
    }).isRequired,
    onSave: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    currentUser: PropTypes.shape({
        _id: PropTypes.string.isRequired,
    }).isRequired,
};

export default DescriptionEdit;
