import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import AppAppBar from "./AppAppBar";
import { alpha } from "@mui/material";
import Container from "@mui/material/Container";
import { Chip } from "@mui/material";

export default function RecruiterDeveloperView() {
  const { id } = useParams();
  const [mode, setMode] = useState("light");
  const descriptionRef = useRef(null);
  const projectsRef = useRef(null);
  const [developerInfo, setDeveloperInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    profileImage: "",
    description: "",
    projects: "",
    languages: [],
  });

  const defaultTheme = createTheme({ palette: { mode } });

  const toggleColorMode = () => {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
  };

  useEffect(() => {
    const fetchDeveloperInfo = async () => {
      try {
        const response = await fetch(`https://techrecruiterapi.onrender.com/developer/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        console.log(result)
        setDeveloperInfo({
            firstName: result.firstName,
            lastName: result.lastName,
            email: result.email,
            profileImage: result.profile.profileImage,
            description: result.profile.description,
            projects: result.profile.projects,
            languages: result.profile.languages || [],
          });
      } catch (error) {
        console.error("Error fetching developer info:", error);
      }
    };

    fetchDeveloperInfo();
  }, [id]);

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
                      src={developerInfo.profileImage}
                      alt="Profile"
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
                    <Box
                      sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "center",
                        gap: 1,
                      }}
                    >
                      {Array.isArray(developerInfo.languages) && developerInfo.languages.length > 0 ? (
                        developerInfo.languages.map((lang, index) => (
                          <Chip key={index} label={lang} />
                        ))
                      ) : (
                        <p>No languages available.</p>
                      )}
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
                  <h2>Projects</h2>
                  {renderContent(developerInfo.projects)}
                </Box>
              </Box>
            </div>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}