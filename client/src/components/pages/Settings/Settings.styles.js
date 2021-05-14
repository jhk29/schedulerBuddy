import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(
  {
    rootContainer: {
      marginTop: "1.5rem",
      justifyContent: "center",
    },
    formContainer: {
      margin: "auto",
      justifyContent: "center",
    },
    formInput: {
      marginTop: "0.5rem",
    },
    formTitle: {
      textAlign: "center",
      marginTop: "1.5rem",
    },
  },
  { index: 1 }
);

export default useStyles;
