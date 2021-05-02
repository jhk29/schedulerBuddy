import React, { useState } from "react";
import NavbarDrawer from "./NavbarDrawer";
import { AppBar, Toolbar, IconButton, Tab } from "@material-ui/core";
import useStyles from "./Navbar.styles";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import MenuIcon from "@material-ui/icons/Menu";
import { Today, AccountCircle } from "@material-ui/icons";

const Navbar = (props) => {
  const styles = useStyles();
  const history = useHistory();

  const [toggleDrawer, setToggleDrawer] = useState(false);

  const openDrawer = () => {
    setToggleDrawer(true);
  };
  const closeDrawer = () => {
    setToggleDrawer(false);
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
            <AccountCircle />
          ) : (
            <LoginRegisterButtons />
          )}
        </Toolbar>
      </AppBar>
      <NavbarDrawer isOpen={toggleDrawer} close={closeDrawer} />
    </>
  );
};

Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Navbar);
