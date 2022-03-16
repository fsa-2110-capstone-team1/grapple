import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';

import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store';

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const id = useSelector((state) => state.auth.id) || '';
  const user = useSelector((state) => state.auth.username) || [];

  const dispatch = useDispatch();
  let navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const logoutAndCloseMenu = () => {
    dispatch(logout());
    handleCloseUserMenu();
    navigate('/login');
  };

  return (
    <ThemeProvider theme={theme}>
      <AppBar className="nav-bar" position="fixed">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
              }}
            >
              <Link to="/">
                <Button>
                  <img className="nav-logo" src="/logo/navLogo-white.png" />
                </Button>
              </Link>
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                {!!id ? <MenuIcon /> : ''}
              </IconButton>

              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                <Link to={'/challenges'}>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center" color="#C54B7B">
                      Challenges
                    </Typography>
                  </MenuItem>
                </Link>
                <Link to={'/people'}>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center" color="#C54B7B">
                      People
                    </Typography>
                  </MenuItem>
                </Link>
              </Menu>
            </Box>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
            >
              <Link to="/">
                <Button>
                  <img className="nav-logo" src="/logo/navLogo-white.png" />
                </Button>
              </Link>
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {!!id ? (
                <>
                  <Link
                    className="navbar-browse-challenge-link"
                    to={'/challenges'}
                  >
                    <Button
                      onClick={handleCloseNavMenu}
                      sx={{ my: 2, color: 'white', display: 'block' }}
                    >
                      Challenges
                    </Button>
                  </Link>
                  <Link className="navbar-browse-people-link" to={'/people'}>
                    <Button
                      onClick={handleCloseNavMenu}
                      sx={{ my: 2, color: 'white', display: 'block' }}
                    >
                      People
                    </Button>
                  </Link>
                </>
              ) : (
                ''
              )}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                  // src="/broken-image.jpg"
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {!!id ? (
                  <div>
                    <Link to="/user/dashboard" onClick={handleCloseUserMenu}>
                      <MenuItem>
                        <Typography textAlign="center" color="#C54B7B">
                          My Dashboard
                        </Typography>
                      </MenuItem>
                    </Link>
                    <Link to="/user/profile" onClick={handleCloseUserMenu}>
                      <MenuItem>
                        <Typography textAlign="center" color="#C54B7B">
                          Profile
                        </Typography>
                      </MenuItem>
                    </Link>
                    <Link to="/settings" onClick={handleCloseUserMenu}>
                      <MenuItem>
                        <Typography textAlign="center" color="#C54B7B">
                          Settings
                        </Typography>
                      </MenuItem>
                    </Link>
                    <MenuItem onClick={logoutAndCloseMenu}>
                      <Typography textAlign="center" color="#C54B7B">
                        Logout
                      </Typography>
                    </MenuItem>
                  </div>
                ) : (
                  <Link to="/login" onClick={handleCloseUserMenu}>
                    <MenuItem>
                      <Typography textAlign="center" color="#C54B7B">
                        Login
                      </Typography>
                    </MenuItem>
                  </Link>
                )}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};
export default Navbar;
