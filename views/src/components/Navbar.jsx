import React, { useState } from "react";

import { Link } from "react-router-dom";

import { useAuth } from "../providers/AuthProvider";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import AccountCircle from "@mui/icons-material/AccountCircle";

const Navbar = () => {
  const { signOutUser, userDoc } = useAuth();

  const [anchorEl, setAnchorEl] = useState(null);

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Box sx={{ flexGrow: 1, "& a": { textDecoration: "none" } }}>
          <Link to="/">
            <Typography variant="h4" color="common.white">
              WeCare
            </Typography>
          </Link>
        </Box>

        <div>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            sx={{ "& a": { textDecoration: "none", color: "inherit" } }}
          >
            <Link to={`/profile/${userDoc.username}`}>
              <MenuItem onClick={handleClose}>Profile</MenuItem>
            </Link>

            <Link to="/update-profile">
              <MenuItem onClick={handleClose}>Update Profile</MenuItem>
            </Link>
            <MenuItem onClick={signOutUser}>Logout</MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );

  function handleMenu(e) {
    setAnchorEl(e.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  function handleLogout() {}
};

export default Navbar;
