import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { Box } from '@mui/material';
import { useEffect, useState } from 'react';


function DeveloperList() {


  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState(''); // state for search input
  const [searchTerm, setSearchTerm] = useState(''); // state for search term that triggers data fetch

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // fetch all developers if no search input or filter by language
        const url = searchTerm
          ? `https://techrecruiterapi.onrender.com/recruiter/languages?language=${searchTerm}`
          : 'https://techrecruiterapi.onrender.com/recruiter/languages';
          
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchTerm]); // update data whenever searchTerm changes

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      setSearchTerm(query); // sets searchTerm to trigger data fetch
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <Box display="flex" justifyContent="center" mb={2}>
        <TextField
          variant="outlined"
          placeholder="find your ideal developer match..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          fullWidth
        />
      </Box>

      {data.map((dev) => (
        <Grid item xs={12} md={6} sx={{ mt: 8 }} key={dev._id}>
          <CardActionArea component="a" href="/developer">
            <Card sx={{ display: 'flex', mt: 4, backgroundColor: '#f2f9ff' }}>
              <CardMedia
                component="img"
                sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
                // image='https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-600nw-1677509740.jpg'
                image={dev.profileImage}
              // alt={dev.imageLabel}
              />
              <CardContent sx={{ flex: 1 }}>
                <Typography component="h2" variant="h6" align='right'>
                  {dev.firstName} {dev.lastName}
                </Typography>
                <Typography variant="subtitle1" paragraph>
                  {dev.profile.description}
                </Typography>
              </CardContent>
            </Card>
          </CardActionArea>
        </Grid>
      ))}
    </div>
  );
}


export default DeveloperList;

