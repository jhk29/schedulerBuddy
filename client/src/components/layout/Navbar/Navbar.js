import React, { useState } from "react";
import NavbarDrawer from "./NavbarDrawer";
import {
  AppBar,
  Toolbar,
  IconButton,
  Tab,
  Button,
  Menu,
  MenuItem,
} from "@material-ui/core";
import { Settings, ExitToApp } from "@material-ui/icons";
import useStyles from "./Navbar.styles";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import MenuIcon from "@material-ui/icons/Menu";
import { Today, AccountCircle } from "@material-ui/icons";
import { logoutUser } from "../../../actions/userActions";

const Navbar = (props) => {
  const styles = useStyles();
  const history = useHistory();

  const [toggleDrawer, setToggleDrawer] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleLogout = () => {
    props.logoutUser();
  };

  const openDrawer = () => {
    setToggleDrawer(true);
  };
  const closeDrawer = () => {
    setToggleDrawer(false);
  };

  const openMenu = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const closeMenu = () => {
    setAnchorEl(null);
  };

  const LoginRegisterButtons = () => {
    return (
      <div style={{ float: "right" }}>
        <Tab
          className={styles.navButton}
          label="Register"
          value="register"
          onClick={() => {
            history.push("/register");
          }}
        />
        <Tab
          className={styles.navButton}
          label="Login"
          value="login"
          onClick={() => {
            history.push("/login");
          }}
        />
      </div>
    );
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          {props.auth.isAuthenticated ? (
            <IconButton
              className={styles.menuButton}
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={openDrawer}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <Today className={styles.logo} />
          )}
          <div className={styles.title}>
            <Tab
              className={styles.appName}
              label="Scheduler Buddy"
              onClick={() => {
                props.auth.isAuthenticated
                  ? history.push("/dashboard")
                  : history.push("/");
              }}
            />
          </div>
          {props.auth.isAuthenticated ? (
            <Button
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={openMenu}
              style={{ color: "white" }}
            >
              <AccountCircle />
            </Button>
          ) : (
            <LoginRegisterButtons />
          )}
        </Toolbar>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={closeMenu}
        >
          <MenuItem
            onClick={() => {
              closeMenu();
              history.push("/settings");
            }}
          >
            <Settings /> Settings
          </MenuItem>
          <MenuItem
            onClick={() => {
              closeMenu();
              handleLogout();
            }}
          >
            <ExitToApp /> Logout
          </MenuItem>
        </Menu>
      </AppBar>
      <NavbarDrawer isOpen={toggleDrawer} close={closeDrawer} />
    </>
  );
};

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(Navbar);
