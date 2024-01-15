import React from 'react';
import { Box, Typography, IconButton, Grid } from '@mui/material';
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
      <Grid container justifyContent="center" mt={2}>
        <IconButton
          aria-label="LinkedIn"
          component="a"
          href="https://www.linkedin.com/"
          target="_blank"
          rel="noopener noreferrer"
          sx={{ color: 'white' }}
        >
          <LinkedInIcon />
        </IconButton>
      </Grid>
    </Box>
  );
};

export default Footer;
