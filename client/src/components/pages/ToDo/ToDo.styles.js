import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(
  {
    todoTable: {
      margin: "auto",
      width: "90%",
      marginTop: "5rem",
    },
    addToDoDivider: {
      marginTop: "2rem",
      marginBottom: "1rem",
    },
    formButtonContainer: {
      flex: "1 0 0",
    },
    formButton: {
      marginLeft: 7,
      float: "right",
    },
  },
  { index: 1 }
);

export default useStyles;
