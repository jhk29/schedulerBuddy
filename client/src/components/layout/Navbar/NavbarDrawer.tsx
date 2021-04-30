import React from "react"
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Drawer
} from "@material-ui/core";
import Dashboard from "@material-ui/icons/Dashboard";
import ListAlt from "@material-ui/icons/ListAlt";
import DateRange from "@material-ui/icons/DateRange";
import Settings from "@material-ui/icons/Settings";
import ExitToApp from "@material-ui/icons/ExitToApp";
import useStyles from "./Navbar.styles";

interface IProps {
  isOpen: boolean,
  close: () => void,
}

const NavbarDrawer = (props: IProps) => {
  const styles = useStyles();

  const SideNav= () => {
    return (
      <div className={styles.list} role="presentation" onClick={props.close} onKeyDown={props.close}>
        <List>
          <ListItem button key="Dashboard">
            <ListItemIcon>
              <Dashboard />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button key="To-Dos">
            <ListItemIcon>
              <ListAlt />
            </ListItemIcon>
            <ListItemText primary="To-Dos" />
          </ListItem>
          <ListItem button key="Calendar">
            <ListItemIcon>
              <DateRange />
            </ListItemIcon>
            <ListItemText primary="Calendar" />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button key="Settings">
            <ListItemIcon>
              <Settings />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItem>
          <ListItem button key="Log Out">
            <ListItemIcon>
              <ExitToApp />
            </ListItemIcon>
            <ListItemText primary="Log Out" />
          </ListItem>
        </List>
      </div>
    );
  }

  return (
    <Drawer open={props.isOpen} onClose={props.close}>
      <SideNav />
    </Drawer>
  )
}

export default NavbarDrawer;