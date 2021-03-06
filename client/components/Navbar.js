import React, { useState, useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import Divider from "@mui/material/Divider";
import MoreIcon from "@mui/icons-material/MoreVert";
import Notifications from "./Notifications";
import theme from "../theme";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { useGoogleLogout } from "react-google-login";
import ListItemIcon from "@mui/material/ListItemIcon";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store";
import BarChartIcon from "@mui/icons-material/BarChart";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import {LanguageContext} from '../App';
import { FormattedMessage } from "react-intl";
import { LOCALES, I18nProvider } from "./i18n";

const Navbar = () => {
  const clientId = `${process.env.CLIENT_ID_GOOGLE}`;

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const id = useSelector((state) => state.auth.id) || "";
  const user = useSelector((state) => state.auth) || {};

  const { signOut } = useGoogleLogout({ clientId });

  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    if (user.googleId) {
      signOut();
    }
    dispatch(logout());
    handleCloseUserMenu();
    navigate("/login");
  };

  const language = useContext(LanguageContext)

  return (
    <I18nProvider locale={language.locale}>
    <AppBar
      className="nav-bar"
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h5"
            noWrap
            component="div"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
            }}
          >
            <Button
              onClick={() => {
                navigate(`/`);
              }}
            >
              <img className="nav-logo" src="/logo/navLogo-white.png" />
            </Button>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              {!!id ? <MenuIcon /> : ""}
            </IconButton>

            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem
                onClick={() => {
                  navigate(`/challenges`);
                  handleCloseNavMenu();
                }}
              >
                <Typography textAlign="center" color="white">
                <FormattedMessage id="challenges" />
                </Typography>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  navigate(`/users`);
                  handleCloseNavMenu();
                }}
              >
                <Typography textAlign="center" color="white">
                <FormattedMessage id="users" />
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
            <Button
              onClick={() => {
                navigate(`/`);
              }}
            >
              <img className="nav-logo" src="/logo/navLogo-white.png" />
            </Button>
          </Typography>
          <Box sx={{ flexGrow: 5, display: { xs: "none", md: "flex" } }}>
            {!!id ? (
              <>
                <Link
                  className="navbar-browse-challenge-link"
                  to={"/challenges"}
                >
                  <Button
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: "white.main", display: "block" }}
                  >
                      <FormattedMessage id="challenges" />
                  </Button>
                </Link>
                <Link className="navbar-browse-people-link" to={"/users"}>
                  <Button
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: "white.main", display: "block" }}
                  >
                         <FormattedMessage id="users" />
                  </Button>
                </Link>
              </>
            ) : (
              ""
            )}
          </Box>

          <Box sx={{ flexGrow: 0.25, textAlign: "end" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Notifications />
              <Box>
                <IconButton
                  onClick={handleOpenUserMenu}
                  sx={[
                    {
                      p: 0,
                      width: "-webkit-fill-available",
                      my: 2,
                      color: "white.main",
                      display: "block",
                    },
                    {
                      "&:hover": {
                        backgroundColor: "transparent",
                        textDecoration: "underline",
                      },
                    },
                    {
                      "&:focus": {
                        backgroundColor: "transparent",
                        textDecoration: "underline",
                      },
                    },
                  ]}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-around",
                      width: "-webkit-fill-available",
                    }}
                  >
                    <Typography
                      sx={{
                        flex: 2,
                        my: 2,
                        color: "white.main",
                        display: "block",
                        margin: "20px",
                      }}
                    >
                      {user.username ? `Hi, ${user.username}` : ""}
                    </Typography>
                    <Avatar src={user.image} />
                  </Box>
                </IconButton>
                <Menu
                  sx={{ mt: "45px", color: "white.main" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {!!id ? (
                    <div>
                      <MenuItem
                        onClick={() => {
                          navigate(`/user/dashboard`);
                          handleCloseUserMenu();
                        }}
                        sx={{ color: "white.main" }}
                      >
                        <ListItemIcon>
                          <BarChartIcon fontSize="medium" />
                        </ListItemIcon>
                        <Typography textAlign="center" color="white.main">
                          My Dashboard
                        </Typography>
                      </MenuItem>

                      <MenuItem
                        onClick={() => {
                          navigate(`/users/profile/${user.username}`);
                          handleCloseUserMenu();
                        }}
                        sx={{ color: "white.main" }}
                      >
                        <ListItemIcon>
                          <AccountCircleIcon fontSize="medium" />
                        </ListItemIcon>
                        <Typography textAlign="center" color="white.main">
                          My Profile
                        </Typography>
                      </MenuItem>

                      <MenuItem
                        onClick={() => {
                          navigate("/user/settings");
                          handleCloseUserMenu();
                        }}
                        sx={{ color: "white.main" }}
                      >
                        <ListItemIcon>
                          <SettingsIcon fontSize="medium" />
                        </ListItemIcon>
                        <Typography textAlign="center" color="white.main">
                          Settings
                        </Typography>
                      </MenuItem>

                      {user.isAdmin ? (
                        <MenuItem
                          onClick={() => {
                            navigate("/admin-hub");
                            handleCloseUserMenu();
                          }}
                          sx={{ color: "white.main" }}
                        >
                          <ListItemIcon>
                            <AdminPanelSettingsIcon fontSize="medium" />
                          </ListItemIcon>
                          <Typography
                            sx={{
                              fontFamily: "raleway",
                              marginLeft: 0.5,
                            }}
                          >
                            Admin Hub
                          </Typography>
                        </MenuItem>
                      ) : null}

                      <MenuItem
                        onClick={logoutAndCloseMenu}
                        sx={{ color: "white.main" }}
                      >
                        <ListItemIcon>
                          <LogoutIcon fontSize="medium" />
                        </ListItemIcon>
                        <Typography textAlign="center" color="white.main">
                          Logout
                        </Typography>
                      </MenuItem>
                    </div>
                  ) : (
                    <MenuItem
                      onClick={() => {
                        navigate("/login");
                        handleCloseUserMenu();
                      }}
                      sx={{ color: "white.main" }}
                    >
                      <ListItemIcon>
                        <AccountCircleIcon fontSize="medium" />
                      </ListItemIcon>
                      <Typography textAlign="center" color="white.main">
                        Login
                      </Typography>
                    </MenuItem>
                  )}
                </Menu>
              </Box>
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    </I18nProvider>
  );
};
export default Navbar;
