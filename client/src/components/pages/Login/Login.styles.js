import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(
  {
    paper: {
      marginTop: "8.5rem",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    avatar: {
      margin: 1,
      backgroundColor: "#F08080",
    },
    form: {
      width: "100%",
      marginTop: 3,
    },
    submitButton: {
      marginTop: "1rem",
    },
    copyRight: {
      marginTop: "1rem",
    },
    accountLink: {
      marginTop: "1rem",
    },
  },
  { index: 1 }
);

export default useStyles;
