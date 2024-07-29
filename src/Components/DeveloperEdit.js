import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Avatar from '@mui/material/Avatar';

function DeveloperEdit({ developerInfo, onSave, onClose }) {
    const [firstName, setFirstName] = useState(developerInfo.firstName);
    const [lastName, setLastName] = useState(developerInfo.lastName);
    const [email, setEmail] = useState(developerInfo.email);
    const [languages, setLanguages] = useState(developerInfo.languages || []);
    const [profilePicture, setProfilePicture] = useState(developerInfo.profilePicture || '');

    // Function to handle file input change
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePicture(reader.result); // Update state with image URL
            };
            reader.readAsDataURL(file); // Read the file as a data URL
        }
    };

    const handleSave = () => {
        onSave({
            firstName,
            lastName,
            email,
            languages,
            profilePicture, // Include profile picture in the saved data
        });
    };

    const programmingLanguages = [
        { name: "HTML" },
        { name: "CSS" },
        { name: "JavaScript" },
        { name: "Java" },
        { name: "Python" },
        { name: "C++" },
        { name: "C" },
        { name: "Swift" },
        { name: "Ruby" },
        { name: "Rust" },
    ];

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
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <h2 id="modal-title">Edit Information</h2>
                <Avatar
                    src={profilePicture}
                    sx={{
                        width: 100,
                        height: 100,
                        borderRadius: '50%',
                        mb: 2,
                    }}
                />
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    style={{ marginBottom: '16px' }}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Edit First Name"
                    variant="outlined"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Edit Last Name"
                    variant="outlined"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Edit Email"
                    variant="outlined"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Autocomplete
                    multiple
                    limitTags={3}
                    disablePortal
                    id="combo-box-demo"
                    options={programmingLanguages}
                    getOptionLabel={(option) => option.name}
                    value={languages}
                    onChange={(event, newValue) => setLanguages(newValue)}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Programming Languages" />}
                />
                <Button onClick={handleSave} variant="contained" color="primary" sx={{ mt: 2 }}>
                    Save
                </Button>
                <Button onClick={onClose} variant="contained" color="secondary" sx={{ ml: 2, mt: 2 }}>
                    Cancel
                </Button>
            </Box>
        </Modal>
    );
}

export default DeveloperEdit;
