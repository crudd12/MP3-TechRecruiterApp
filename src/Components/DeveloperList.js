import * as React from 'react';
// import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';


function DeveloperList(props) {
  // const { post } = props;

  return (
    <Grid item xs={12} md={6} sx={{ mt: 8 }}>
      <CardActionArea component="a" href="/developer">
        <Card sx={{ display: 'flex', mt: 4  }}>
          <CardContent sx={{ flex: 1 }}>
            <Typography component="h2" variant="h5">
              {/* {post.title} */}
              Courtney Rudd
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {/* {post.date} */}
            </Typography>
            <Typography variant="subtitle1" paragraph>
              {/* {post.description} */}
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Typography>
            {/* <Typography variant="subtitle1" color="primary">
              Continue reading...
            </Typography> */}
          </CardContent>
          <CardMedia
            component="img"
            sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
            image='https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-600nw-1677509740.jpg'
            // image={post.image}
            // alt={post.imageLabel}
          />
        </Card>
      </CardActionArea>
      <CardActionArea component="a" href="/developer">
        <Card sx={{ display: 'flex', mt: 4  }}>
          <CardContent sx={{ flex: 1 }}>
            <Typography component="h2" variant="h5">
              {/* {post.title} */}
              Courtney Rudd
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {/* {post.date} */}
            </Typography>
            <Typography variant="subtitle1" paragraph>
              {/* {post.description} */}
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Typography>
            {/* <Typography variant="subtitle1" color="primary">
              Continue reading...
            </Typography> */}
          </CardContent>
          <CardMedia
            component="img"
            sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
            image='https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-600nw-1677509740.jpg'
            // image={post.image}
            // alt={post.imageLabel}
          />
        </Card>
      </CardActionArea>
    </Grid>
  );
}

// DeveloperList.propTypes = {
//   post: PropTypes.shape({
//     date: PropTypes.string.isRequired,
//     description: PropTypes.string.isRequired,
//     image: PropTypes.string.isRequired,
//     imageLabel: PropTypes.string.isRequired,
//     title: PropTypes.string.isRequired,
//   }).isRequired,
// };

export default DeveloperList;