import React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import LogoutIcon from "@mui/icons-material/Logout";
import { AccountCircle, Movie } from "@mui/icons-material";

function Navbar() {
  const navigate = useNavigate();
  const { context, logout } = useContext(AuthContext);

  const onLogout = () => {
    logout();
    navigate("/movies");
  };

  const onLogin = () => {
    navigate("/login");
  };

  const onRegister = () => {
    navigate("/register");
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <IconButton
            color="inherit"
            onClick={() => navigate("/movies")}
            sx={{ marginRight: 1 }}
          >
            <Movie />
          </IconButton>
          gastroMovie
        </Typography>

        <Box>
          {context ? (
            <Box display="flex" alignItems="center">
              <Typography
                variant="subtitle1"
                color="inherit"
                sx={{ marginRight: 1 }}
              >
                {context.username}
              </Typography>
              <IconButton color="inherit" onClick={onLogout}>
                <LogoutIcon />
              </IconButton>
            </Box>
          ) : (
            <Box display="flex" alignItems="center">
              <IconButton color="inherit" onClick={onLogin}>
                <AccountCircle />
              </IconButton>
              <Button
                color="secondary"
                variant="contained"
                onClick={onRegister}
              >
                Sign up
              </Button>
            </Box>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
