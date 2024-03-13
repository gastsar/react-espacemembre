import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import {Box,Toolbar,Typography, IconButton }from '@mui/material';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { Avatar, Badge } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Navbar() {

  const [anchorEl, setAnchorEl] = React.useState(null);

  const user = JSON.parse(localStorage.getItem('user'));
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const LogOut = () => {
    localStorage.removeItem('user');
    window.location.replace("/connexion")
  }
  return (
    <Box sx={{ flexGrow: 1 }} >

      <AppBar position="static"  sx={{ background: "linear-gradient(300deg, #C7C5F4, #776BCC) " }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: "black", fontWeight:"bold" }}>
           <img src="logo/logo.png" alt="" width={200} />
          </Typography>

          <div>

            <Box sx={{ display: { xs: 'none', md: 'flex' } }} alignItems={"center"}>


              <Link to="/">
                <IconButton size="large" aria-label=" home" color="inherit">
                <Badge badgeContent={4} color="error">
                   <HomeRoundedIcon />
                </Badge>
              </IconButton>
              </Link>

              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={"menuId"}
                aria-haspopup="true"
               
                color="inherit"
              >

              </IconButton>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <Avatar src={user.imgProfil} />
              </IconButton>

            </Box>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >

              {location.pathname !== '/profil' && (
                <MenuItem ><Link to={"/profil"}>Profile</Link></MenuItem>
              )}

              <MenuItem onClick={LogOut}>Déconnexion</MenuItem>
            </Menu>
          </div>

        </Toolbar>
      </AppBar>
    </Box>
  );
}