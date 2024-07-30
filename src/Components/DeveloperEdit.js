import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

function DeveloperEdit({ developerInfo, onSave, onClose, currentUser }) {
  const [firstName, setFirstName] = useState(developerInfo.firstName);
  const [lastName, setLastName] = useState(developerInfo.lastName);
  const [email, setEmail] = useState(developerInfo.email);
  const [languages, setLanguages] = useState(developerInfo.languages || []);

  useEffect(() => {
    setLanguages(developerInfo.languages || []);
  }, [developerInfo.languages]);

  const handleSave = async () => {
    try {
      // Construct the updatedInfo object with all fields
      const updatedInfo = {
        id: currentUser._id,
        firstName,
        lastName,
        email,
        profile: {
          languages: languages.map((lang) =>
            typeof lang === "string" ? lang : lang.name
          ),
        },
      };

      const response = await fetch("http://localhost:3001/developer/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(updatedInfo),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `HTTP error! Status: ${response.status}, Details: ${errorText}`
        );
      }

      const data = await response.json()
      onSave(data);
      onClose(); // Closes the modal
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const programmingLanguages = [
    "HTML",
    "CSS",
    "JavaScript",
    "Java",
    "Python",
    "C++",
    "C",
    "Swift",
    "Ruby",
    "Rust",
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
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}
      >
        <h2 id="modal-title">Edit Information</h2>
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
          getOptionLabel={(option) => option}
          value={languages} // Ensure this is an array of strings
          onChange={(event, newValue) => setLanguages(newValue)}
          isOptionEqualToValue={(option, value) => option === value}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="Programming Languages" />
          )}
        />
        <Button onClick={handleSave} variant="contained" color="primary">
          Save
        </Button>
        <Button
          onClick={onClose}
          variant="contained"
          color="secondary"
          sx={{ ml: 2 }}
        >
          Cancel
        </Button>
      </Box>
    </Modal>
  );
}

export default DeveloperEdit;
