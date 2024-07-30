import React, { useState, useEffect, useRef, useContext } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import AppAppBar from "./AppAppBar";
import { alpha } from "@mui/material";
import Container from "@mui/material/Container";
import { Button, Chip } from "@mui/material";
import DeveloperEdit from "./DeveloperEdit";
import DescriptionEdit from "./DescriptionEdit";
import ProjectsEdit from "./ProjectsEdit";
import { CurrentUser } from "../Contexts/CurrentUser";

export default function DeveloperView() {
  const { currentUser } = useContext(CurrentUser);
  const [mode, setMode] = useState("light");
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [isEditingProjects, setIsEditingProjects] = useState(false);
  const descriptionRef = useRef(null);
  const projectsRef = useRef(null);

  const defaultTheme = createTheme({ palette: { mode } });

  const toggleColorMode = () => {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const [developerInfo, setDeveloperInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    profileImage: "",
    description: "",
    projects: "",
    languages: [],
  });

  useEffect(() => {
    if (currentUser) {
      // Assuming currentUser contains developerInfo
      setDeveloperInfo({
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        email: currentUser.email,
        profileImage: currentUser.profile.profileImage,
        description: currentUser.profile.description,
        projects: currentUser.profile.projects,
        languages: currentUser.profile.languages || [],
      });
    }
  }, [currentUser]);

  useEffect(() => {
    adjustBoxHeight(descriptionRef, developerInfo.description);
    adjustBoxHeight(projectsRef, developerInfo.projects);
  }, [developerInfo]);

  const adjustBoxHeight = (ref, content) => {
    if (ref.current) {
      ref.current.style.height = "auto";
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

  const handleSave = (updatedUser) => {
    setDeveloperInfo((prev) => ({
      ...prev,
      firstName: updatedUser.firstName || prev.firstName,
      lastName: updatedUser.lastName || prev.lastName,
      email: updatedUser.email || prev.email,
      profileImage: updatedUser.profileImage || prev.profileImage,
      description: updatedUser.description || prev.description,
      projects: updatedUser.projects || prev.projects,
      languages: updatedUser.profile?.languages || prev.languages,
    }));
  };

  const handleSaveDescription = (updatedUser) => {
    setDeveloperInfo((prev) => ({
      ...prev,
      description: updatedUser.profile.description || prev.description,
    }));
    setIsEditingDescription(false);
  };

  const handleSaveProjects = (updatedUser) => {
    setDeveloperInfo((prev) => ({
      ...prev,
      projects: updatedUser.profile.projects || prev.projects,
    }));
    setIsEditingProjects(false);
  };

  const renderContent = (text) => {
    return typeof text === "string" ? (
      text.split("\n").map((paragraph, index) => (
        <p key={index} style={{ textAlign: "left" }}>
          {paragraph}
        </p>
      ))
    ) : (
      <p>No content available.</p>
    );
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <AppAppBar mode={mode} toggleColorMode={toggleColorMode} />
      <Box
        id="hero"
        sx={(theme) => ({
          width: "100%",
          backgroundImage:
            theme.palette.mode === "light"
              ? "linear-gradient(180deg, #CEE5FD, #FFF)"
              : `linear-gradient(#02294F, ${alpha("#090E10", 0.0)})`,
          backgroundSize: "100% 20%",
          backgroundRepeat: "no-repeat",
        })}
      >
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            pt: { xs: 12, sm: 16 },
            pb: { xs: 6, sm: 8 },
          }}
        >
          <Box sx={{ bgcolor: "background.default" }}>
            <div>
              <Box
                margin={5}
                sx={{
                  border: "2px solid red",
                  padding: 2,
                  position: "relative",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                  }}
                >
                  <Box
                    sx={{
                      border: "2px solid grey",
                      height: 400,
                      width: 500,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <img
                      src={`http://localhost:3001/${developerInfo.profileImage}`}
                      alt="Frog Profile"
                      style={{ width: "100%", height: "auto" }}
                    />
                    <h2>
                      {developerInfo.firstName} {developerInfo.lastName}
                    </h2>
                    <p>Contact: {developerInfo.email}</p>
                  </Box>
                  <Box
                    sx={{
                      border: "2px solid grey",
                      height: 300,
                      width: 500,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      position: "relative",
                      marginLeft: "auto",
                    }}
                  >
                    <Button
                      variant="contained"
                      sx={{
                        position: "absolute",
                        top: 10,
                        right: 10,
                      }}
                      onClick={handleEditClick}
                    >
                      Edit
                    </Button>
                    <Box
                      sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "center",
                        gap: 1,
                      }}
                    >
                      {developerInfo.languages.map((lang, index) => (
                        <Chip key={index} label={lang} />
                      ))}
                    </Box>
                  </Box>
                </Box>
                <Box
                  ref={descriptionRef}
                  sx={{
                    border: "2px solid grey",
                    marginTop: 2,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                    padding: 2,
                    position: "relative",
                    textAlign: "left",
                    overflow: "hidden",
                  }}
                >
                  <Button
                    variant="contained"
                    sx={{
                      position: "absolute",
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
                    border: "2px solid grey",
                    marginTop: 2,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                    padding: 2,
                    position: "relative",
                    textAlign: "left",
                    overflow: "hidden",
                  }}
                >
                  <Button
                    variant="contained"
                    sx={{
                      position: "absolute",
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
                  currentUser={currentUser}
                />
              )}
              {isEditingDescription && (
                <DescriptionEdit
                  descriptionInfo={{ description: developerInfo.description }}
                  onSave={handleSaveDescription}
                  onClose={() => setIsEditingDescription(false)}
                  currentUser={currentUser}
                />
              )}
              {isEditingProjects && (
                <ProjectsEdit
                  projects={developerInfo.projects}
                  onSave={handleSaveProjects}
                  onClose={() => setIsEditingProjects(false)}
                  currentUser={currentUser}
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
