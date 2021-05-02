import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(
  {
    list: {
      width: 250,
    },
    fullList: {
      width: "auto",
    },
    navButton: {
      opacity: 1,
      "&:hover": {
        opacity: 0.7,
      },
    },
    appName: {
      opacity: 1,
      fontWeight: "bold",
    },
    menuButton: {
      marginRight: 2,
    },
    logo: {
      marginRight: 12,
      color: "white",
    },
    title: {
      flexGrow: 1,
    },
    link: {
      textDecoration: "none",
      color: "white",
    },
  },
  { index: 1 }
);

export default useStyles;
