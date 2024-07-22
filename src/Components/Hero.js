import * as React from 'react';
import { alpha } from '@mui/material';
import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
// import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
// import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

export default function Hero() {
  return (
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
        <Stack spacing={2} useFlexGap sx={{ width: { xs: '100%', sm: '70%' } }}>
          <Typography
            variant="h1"
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignSelf: 'center',
              textAlign: 'center',
              fontSize: 'clamp(3.5rem, 10vw, 4rem)',
            }}
          >
            Find your ideal&nbsp;
            <Typography
              component="span"
              variant="h1"
              sx={{
                fontSize: 'clamp(3rem, 10vw, 4rem)',
                color: (theme) =>
                  theme.palette.mode === 'light' ? 'primary.main' : 'primary.light',
              }}
            >
              developer
            </Typography>
          </Typography>
          <Typography
            textAlign="center"
            color="text.secondary"
            sx={{ alignSelf: 'center', width: { sm: '100%', md: '80%' } }}
          >
            Introducing JEDC Recruiting, the ultimate search engine for IT recruiters seeking top developer talent.
            Our platform empowers you to effortlessly locate and evaluate highly qualified developers with unmatched precision.
            Leveraging advanced search algorithms and real-time data, JEDC Recruiting provides a comprehensive and intuitive search experience,
            helping you quickly find candidates who match your specific requirements and preferences.
            Transform your hiring strategy and connect with the best developers faster with JEDC Recruiting.
          </Typography>
          {/* <Stack
            direction={{ xs: 'column', sm: 'row' }}
            alignSelf="center"
            spacing={1}
            useFlexGap
            sx={{ pt: 2, width: { xs: '100%', sm: 'auto' } }}
          > */}
          {/* <TextField
              id="outlined-basic"
              hiddenLabel
              size="small"
              variant="outlined"
              aria-label="Enter your email address"
              placeholder="Your email address"
              inputProps={{
                autoComplete: 'off',
                'aria-label': 'Enter your email address',
              }}
            /> */}
          {/* <Button variant="contained" color="primary">
              Start now
            </Button> */}
          {/* </Stack> */}
          {/* <Typography variant="caption" textAlign="center" sx={{ opacity: 0.8 }}>
            By clicking &quot;Start now&quot; you agree to our&nbsp;
            <Link href="#" color="primary">
              Terms & Conditions
            </Link>
            .
          </Typography> */}
        </Stack>
        <Box
          id="image"
          sx={(theme) => ({
            mt: { xs: 8, sm: 10 },
            alignSelf: 'center',
            height: { xs: 200, sm: 700 },
            width: '100%',
            backgroundImage:
              theme.palette.mode === 'light'
                ? 'url("https://media.istockphoto.com/id/1061305620/vector/human-resources-concept-target-market-and-audience-focus-group-public-relations-vector-icon.jpg?s=612x612&w=0&k=20&c=Jhtkyf_iNwd68YSLjZniIIaUNfqd9nkM24fWhX-Valg=")'
                : 'url("https://media.istockphoto.com/id/1061305620/vector/human-resources-concept-target-market-and-audience-focus-group-public-relations-vector-icon.jpg?s=612x612&w=0&k=20&c=Jhtkyf_iNwd68YSLjZniIIaUNfqd9nkM24fWhX-Valg=")',
            backgroundSize: 'cover',
            borderRadius: '10px',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            outline: '1px solid',
            outlineColor:
              theme.palette.mode === 'light'
                ? alpha('#BFCCD9', 0.5)
                : alpha('#9CCCFC', 0.1),
            boxShadow:
              theme.palette.mode === 'light'
                ? `0 0 12px 8px ${alpha('#9CCCFC', 0.2)}`
                : `0 0 24px 12px ${alpha('#033363', 0.2)}`,
          })}
        />
      </Container>
    </Box>
  );
}