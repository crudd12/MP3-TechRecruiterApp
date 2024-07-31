import React, { useState, useEffect, useRef, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import { Grid } from "@mui/material";

export default function DeveloperView() {
  const navigate = useNavigate();
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
      if (currentUser.role !== "Developer") {
        // Redirect to developer list or display a message if not a developer
        return;
      }

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

  const handleDelete = async () => {
    if (!currentUser || !currentUser._id) {
      console.error("No user ID available");
      return;
    }

    try {
      const response = await fetch(
        `https://techrecruiterapi.onrender.com/developer/delete`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ id: currentUser._id }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `HTTP error! Status: ${response.status}, Details: ${errorText}`
        );
      }

      localStorage.removeItem("authToken");
      navigate("/signin");
    } catch (error) {
      console.error("Error deleting profile:", error);
    }
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

  if (!currentUser) {
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
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            textAlign: "center",
          })}
        >
          <Box>
            <h2>You are not signed in</h2>
            <Button variant="contained" component={Link} to="/signin">
              Sign In
            </Button>
          </Box>
        </Box>
      </ThemeProvider>
    );
  }

  if (currentUser.role !== "Developer") {
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
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            textAlign: "center",
          })}
        >
          <Box>
            <h2>You are not a developer</h2>
            <p>
              As a recruiter, you are not authorized to view this page. Please
              go back to the{" "}
              <Button variant="contained" component={Link} to="/recruiter">
                Developer Search
              </Button>
              .
            </p>
          </Box>
        </Box>
      </ThemeProvider>
    );
  }

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
                  padding: 2,
                  position: "relative",
                }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Box
                      sx={{
                        height: { xs: "auto", md: 400 },
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "flex-start",
                      }}
                    >
                      <img
                        src={
                          developerInfo.profileImage ||
                          "https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-600nw-1677509740.jpg"
                        }
                        alt="Profile"
                        style={{
                          width: "100%",
                          position: "relative",
                          overflow: "hidden",
                        }}
                      />
                    </Box>
                    <Box
                      sx={{
                        height: { xs: "auto", md: "30%" },
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        textAlign: "center",
                        marginTop: 2,
                      }}
                    >
                      <h2>
                        {developerInfo.firstName} {developerInfo.lastName}
                      </h2>
                      <p>Contact: {developerInfo.email}</p>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box
                      sx={{
                        height: 300,
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
                  </Grid>
                </Grid>
                <Box
                  ref={descriptionRef}
                  sx={{
                    border: "2px solid lightgrey",
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
                    border: "2px solid lightgrey",
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
              <Button
                onClick={() => handleDelete(currentUser._id)}
                variant="contained"
                color="error"
              >
                Delete Profile
              </Button>
            </div>
          </Box>
        </Container>
      </Box>
      <Divider />
    </ThemeProvider>
  );
}
