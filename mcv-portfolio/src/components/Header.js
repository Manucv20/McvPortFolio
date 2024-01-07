import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Grid, useMediaQuery, Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import Link from 'next/link';
import HomeIcon from '@mui/icons-material/Home';
import WorkIcon from '@mui/icons-material/Work';
import InfoIcon from '@mui/icons-material/Info';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import MenuIcon from '@mui/icons-material/Menu';

const Header = () => {
  const isMobileOrNarrow = useMediaQuery('(max-width:900px)');
  const [mobileMenuAnchorEl, setMobileMenuAnchorEl] = useState(null);

  const handleMobileMenuOpen = (event) => {
    setMobileMenuAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuAnchorEl(null);
  };

  const menuItems = [
    { text: 'Home', icon: <HomeIcon />, link: '/' },
    { text: 'Proyectos', icon: <WorkIcon />, link: '/Projects' },
    { text: 'Sobre Mí', icon: <InfoIcon />, link: '/About' },
    { text: 'Contacto', icon: <ContactMailIcon />, link: '/Contact' }
  ];

  const renderMenuItems = () => (
    menuItems.map((item) => (
      <Link key={item.text} href={item.link} passHref>
        <MenuItem onClick={handleMobileMenuClose}>
          <ListItemIcon sx={{ minWidth: 30, marginRight: '4px' }}>{item.icon}</ListItemIcon>
          <ListItemText primary={item.text} />
        </MenuItem>
      </Link>
    ))
  );

  const renderDesktopMenuButtons = () => (
    menuItems.map((item) => (
      <Link key={item.text} href={item.link} passHref>
        <Button color="inherit" sx={{
          fontWeight: 'normal',
          '&:hover': { backgroundColor: '#hoverColor', color: '#fff' },
          color: '#000', // Change the text color to black (#000)
          display: 'flex',
          alignItems: 'center',
        }}
        >
          <ListItemIcon sx={{ marginRight: '-25px' }}>{item.icon}</ListItemIcon>
          {item.text}
        </Button>
      </Link>
    ))
  );



  return (
    <AppBar position="static">
      <Toolbar>
        <Grid container alignItems="center">
          <Grid item xs={6} md={4}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
              Mi Portfolio
            </Typography>
          </Grid>
          <Grid item xs={6} md={8} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            {isMobileOrNarrow ? (
              <>
                <MenuIcon onClick={handleMobileMenuOpen} />
                <Menu
                  anchorEl={mobileMenuAnchorEl}
                  open={Boolean(mobileMenuAnchorEl)}
                  onClose={handleMobileMenuClose}
                >
                  {renderMenuItems()}
                </Menu>
              </>
            ) : (
              renderDesktopMenuButtons()
            )}
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
