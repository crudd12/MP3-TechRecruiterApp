import * as React from "react";
import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import CircularProgress from "@mui/material/CircularProgress";
// import ToggleColorMode from './ToggleColorMode';
import ScreenSearchDesktopRoundedIcon from "@mui/icons-material/ScreenSearchDesktopRounded";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CurrentUser } from "../Contexts/CurrentUser";

// const logoStyle = {
//   width: '140px',
//   height: 'auto',
//   cursor: 'pointer',
//   color: '#1976D2',
//   fontWeight: 'bold',
//   textDecoration: 'none'
// };

function AppAppBar({ mode, toggleColorMode }) {
  const { currentUser, setCurrentUser, loading } = useContext(CurrentUser);
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  // const scrollToSection = (sectionId) => {
  //   const sectionElement = document.getElementById(sectionId);
  //   const offset = 128;
  //   if (sectionElement) {
  //     const targetScroll = sectionElement.offsetTop - offset;
  //     sectionElement.scrollIntoView({ behavior: 'smooth' });
  //     window.scrollTo({
  //       top: targetScroll,
  //       behavior: 'smooth',
  //     });
  //     setOpen(false);
  //   }
  // };
  // const Navigation = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the token from local storage
    localStorage.removeItem("authToken");
    // Clear the current user context
    setCurrentUser(null);
    navigate("/");
  };

  const buttonStyles = {
    color: "primary",
    size: "small",
    sx: { mx: 1 },
  };

  const signinActions = currentUser ? (
    <Button
      color="primary"
      variant="contained"
      size="small"
      onClick={handleLogout}
      sx={buttonStyles.sx}
    >
      Logout
    </Button>
  ) : (
    <>
      <Button
        color="primary"
        variant="text"
        size="small"
        component="a"
        href="/signin"
        sx={buttonStyles.sx}
      >
        Sign in
      </Button>
      <Button
        color="primary"
        variant="contained"
        size="small"
        component="a"
        href="/signup"
        sx={buttonStyles.sx}
      >
        Sign up
      </Button>
    </>
  );

  const roleBasedLink = currentUser ? (
    currentUser.role === "Recruiter" ? (
      <Button
        color="primary"
        variant="text"
        onClick={() => navigate("/recruiter")}
        sx={buttonStyles.sx}
      >
        Recruiter
      </Button>
    ) : (
      <Button
        color="primary"
        variant="text"
        onClick={() => navigate("/developer")}
        sx={buttonStyles.sx}
      >
        Developer
      </Button>
    )
  ) : null;

  return (
    <div>
      <AppBar
        position="fixed"
        sx={{
          boxShadow: 0,
          bgcolor: "transparent",
          backgroundImage: "none",
          mt: 2,
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            variant="regular"
            sx={(theme) => ({
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexShrink: 0,
              borderRadius: "999px",
              bgcolor:
                theme.palette.mode === "light"
                  ? "rgba(255, 255, 255, 0.4)"
                  : "rgba(0, 0, 0, 0.4)",
              backdropFilter: "blur(24px)",
              maxHeight: 40,
              border: "1px solid",
              borderColor: "divider",
              boxShadow:
                theme.palette.mode === "light"
                  ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
                  : "0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)",
            })}
          >
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                alignItems: "center",
                ml: "-18px",
                px: 0,
              }}
            >
              <a href="/">
                <ScreenSearchDesktopRoundedIcon
                  fontSize="large"
                  sx={{ color: "#1976d2", marginLeft: "25px" }}
                />
              </a>
              <Box sx={{ display: { xs: "none", md: "flex" } }}>
                <MenuItem
                  onClick={() => navigate("/")}
                  sx={{ py: "6px", px: "12px" }}
                >
                  <Typography variant="body2" color="text.primary">
                    JEDC Recruiting
                  </Typography>
                </MenuItem>
                {/* {roleBasedLink} */}
              </Box>
            </Box>
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                gap: 0.5,
                alignItems: "center",
              }}
            >
              {loading ? (
                <CircularProgress size={24} />
              ) : (
                <>
                  {roleBasedLink}
                  {signinActions}
                </>
              )}
            </Box>
            <Box sx={{ display: { sm: "", md: "none" } }}>
              <Button
                variant="text"
                color="primary"
                aria-label="menu"
                onClick={toggleDrawer(true)}
                sx={{ minWidth: "30px", p: "4px" }}
              >
                <MenuIcon />
              </Button>
              <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
                <Box
                  sx={{
                    minWidth: "60dvw",
                    p: 2,
                    backgroundColor: "background.paper",
                    flexGrow: 1,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "end",
                      flexGrow: 1,
                    }}
                  >
                    {/* <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} /> */}
                  </Box>
                  <Divider />
                  {!currentUser ? (
                    <>
                      <MenuItem sx={{ width: "100%" }}>
                        <Button
                          color="primary"
                          variant="contained"
                          component="a"
                          href="/signup"
                          sx={{ width: "100%" }}
                        >
                          Sign up
                        </Button>
                      </MenuItem>
                      <MenuItem sx={{ width: "100%" }}>
                        <Button
                          color="primary"
                          variant="outlined"
                          component="a"
                          href="/signin"
                          sx={{ width: "100%" }}
                        >
                          Sign in
                        </Button>
                      </MenuItem>
                    </>
                  ) : (
                    <>
                      <MenuItem sx={{ width: "100%" }}>
                        <Button
                          color="primary"
                          variant="contained"
                          onClick={handleLogout}
                          sx={{ width: "100%" }}
                        >
                          Logout
                        </Button>
                      </MenuItem>
                      {roleBasedLink && (
                        <MenuItem sx={{ width: "100%" }}>
                          <Button
                            color="primary"
                            variant="outlined"
                            onClick={() =>
                              navigate(
                                currentUser.role === "Recruiter"
                                  ? "/recruiter"
                                  : "/developer"
                              )
                            }
                            sx={{ width: "100%" }}
                          >
                            {currentUser.role === "Recruiter"
                              ? "Recruiter"
                              : "Developer"}
                          </Button>
                        </MenuItem>
                      )}
                    </>
                  )}
                </Box>
              </Drawer>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}

AppAppBar.propTypes = {
  mode: PropTypes.oneOf(["dark", "light"]).isRequired,
  toggleColorMode: PropTypes.func.isRequired,
};

export default AppAppBar;
