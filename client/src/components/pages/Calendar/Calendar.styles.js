import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(
  {
    root: {
      margin: "auto",
      marginTop: "4em",
      width: "80%",
      "& .fc-daygrid-day-frame": {
        cursor: "pointer",
      },
    },
    formButtonContainer: {
      flex: "1 0 0",
    },
    formButton: {
      marginLeft: 7,
      float: "right",
    },
    "@media(max-width: 650px)": {
      root: {
        "& .fc-toolbar, .fc-header-toolbar": {
          flexDirection: "column",
        },
      },
    },
  },
  { index: 1 }
);

export default useStyles;
