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
  },
  { index: 1 }
);

export default useStyles;
