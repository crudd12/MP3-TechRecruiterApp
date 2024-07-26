import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';

function DescriptionEdit({ descriptionInfo, onSave, onClose }) {
    const [description, setDescription] = useState(descriptionInfo.description || '');

    const handleSave = () => {
        onSave({ description });
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
                <h2 id="modal-title">Edit Description</h2>
                <TextField
                    fullWidth
                    multiline
                    margin="normal"
                    label="Edit Description"
                    variant="outlined"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
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
};

export default DescriptionEdit;
