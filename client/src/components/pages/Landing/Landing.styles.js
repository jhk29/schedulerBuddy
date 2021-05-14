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
    },
    summary: {
      margin: "auto",
    },
    innerContainer: {
      margin: "auto",
      textAlign: "center",
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
    "@media(max-width: 955px)": {
      image: {
        height: "24rem",
      },
      innerContainer: {
        display: "flex",
        justifyContent: "center",
      },
      summary: {
        margin: 0,
      },
      schedulerInfo: {
        width: "auto",
      },
    },
    "@media (max-width:510px)": {
      image: {
        height: "17rem",
      },
      summary: {
        marginTop: "-5rem",
      },
      innerContainer: {
        marginBottom: "6.5rem",
      },
      schedulerInfo: {
        fontSize: "1rem",
      },
    },
  },
  { index: 1 }
);

export default useStyles;
