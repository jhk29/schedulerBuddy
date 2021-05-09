import { makeStyles } from "@material-ui/core/styles";
import BackgroundImage from "./background.svg";

const useStyles = makeStyles(
  {
    container: {
      height: "89vh",
      width: "100%",
      backgroundRepeat: "no-repeat",
      backgroundImage: `url(${BackgroundImage})`,
      backgroundSize: "100% auto",
      backgroundPosition: "center bottom",
      overflow: "hidden",
    },
    image: {
      height: "30rem",
      borderRadius: 1000,
      float: "right",
      marginRight: "5rem",
      marginTop: "2rem",
      marginBottom: "2rem",
    },
    innerContainer: {
      margin: "auto",
    },
    schedulerInfo: {
      margin: "auto",
      width: "500px",
      textAlign: "center",
      backgroundColor: "white",
    },
    schedulerButtons: {
      marginTop: "1rem",
      marginBottom: "0.5rem",
    },
  },
  { index: 1 }
);

export default useStyles;
