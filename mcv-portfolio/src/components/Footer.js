import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer = () => {
  return (
    <Box
      sx={{
        py: 3,
        px: 2,
        backgroundColor: 'primary.dark',
        color: 'white',
        textAlign: 'center',
      }}
    >
      <Typography variant="body2">
        © {new Date().getFullYear()} Manuel Cañas Vidaller. Todos los derechos reservados.
      </Typography>
      <Box mt={2}>
        <IconButton aria-label="Facebook" component="a" href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
          <FacebookIcon />
        </IconButton>
        <IconButton aria-label="Twitter" component="a" href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
          <TwitterIcon />
        </IconButton>
        <IconButton aria-label="Instagram" component="a" href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
          <InstagramIcon />
        </IconButton>
        <IconButton aria-label="LinkedIn" component="a" href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">
          <LinkedInIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Footer;
