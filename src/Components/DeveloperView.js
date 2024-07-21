// import AppAppBar from "./AppAppBar";

// function DeveloperView() {

//  return (
//   <div>
//    <AppAppBar />
//    <h1> this is the developer page</h1>
//   </div>
//  )
// }

// export default DeveloperView;


import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import AppAppBar from './AppAppBar'

const headerStyle = {
 paddingTop: '110px'
};

export default function DeveloperView() {
  const [mode, setMode] = React.useState('light');

  const defaultTheme = createTheme({ palette: { mode } });

  const toggleColorMode = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (

    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <AppAppBar mode={mode} toggleColorMode={toggleColorMode} />
      <Box sx={{ bgcolor: 'background.default' }}> 
       <h1 style={headerStyle}>this is the developer view page</h1>
      </Box>
    </ThemeProvider>
  );
}