import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import AppAppBar from './AppAppBar'
import { alpha } from '@mui/material';
import Container from '@mui/material/Container';
import DeveloperList from './DeveloperList';


export default function RecruiterView() {
  const [mode, setMode] = React.useState('light');

  const defaultTheme = createTheme({ palette: { mode } });

  const toggleColorMode = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (

    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <AppAppBar mode={mode} toggleColorMode={toggleColorMode} />
      <Box
        id="hero"
        sx={(theme) => ({
          width: '100%',
          backgroundImage:
            theme.palette.mode === 'light'
              ? 'linear-gradient(180deg, #CEE5FD, #FFF)'
              : `linear-gradient(#02294F, ${alpha('#090E10', 0.0)})`,
          backgroundSize: '100% 20%',
          backgroundRepeat: 'no-repeat',
        })}
      >
        <Container
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            pt: { xs: 14, sm: 20 },
            pb: { xs: 8, sm: 12 },
          }}
        >
      <Box sx={{ bgcolor: 'rgba(255,255,255,0)' }}>
        <h2>Search Programming Languages</h2>
        <DeveloperList />
      </Box>
      </Container>
      </Box>
      <Divider />
    </ThemeProvider>
  );
}