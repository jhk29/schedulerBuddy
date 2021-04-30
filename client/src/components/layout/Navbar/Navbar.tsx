import React, { useState } from "react";
import NavbarDrawer from "./NavbarDrawer";
import { AppBar, Toolbar, IconButton, Typography, Tabs, Tab } from "@material-ui/core";
import useStyles from "./Navbar.styles";
import { Link, useHistory } from "react-router-dom";

import MenuIcon from '@material-ui/icons/Menu';
import Today from '@material-ui/icons/Today';
import AccountCircle from '@material-ui/icons/AccountCircle';


interface IProps {
  isLoggedIn: boolean
};


const Navbar = (props: IProps) => {
  const styles = useStyles();
  const history = useHistory();
  
  const [toggleDrawer, setToggleDrawer] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");

  const openDrawer = () => {
    setToggleDrawer(true);
  }
  const closeDrawer = () => {
    setToggleDrawer(false);
  }
  const changeNavigation = (event: React.ChangeEvent<{}>, newValue: string) => {
    setValue(newValue);
  }

  const LoginRegisterButtons = () => {
    return (
        <Tabs
          value={value}
          onChange= {changeNavigation}
          TabIndicatorProps={{ style: { background: "white" }}}
        >
          <Tab className={styles.navButton} label="Register" onClick={() => {history.push("/register")}} />
          <Tab className={styles.navButton} label="Login" onClick= {() => {history.push("/login")}} />
        </Tabs>
    );
  }

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          {props.isLoggedIn? <IconButton className={styles.menuButton} edge="start" color="inherit" aria-label="menu" onClick={openDrawer}>
            <MenuIcon />
          </IconButton> : <Today className={styles.logo} />}
     
            <Typography variant="h6" className={styles.title}>
              <Link className={styles.link} to="/" onClick={() => setValue("")}>Scheduler Buddy</Link>
            </Typography>
      
          {props.isLoggedIn? <AccountCircle />  : <LoginRegisterButtons />}
        </Toolbar>
      </AppBar>
      <NavbarDrawer isOpen={toggleDrawer} close={closeDrawer} />
    </>
  );
};

export default Navbar;