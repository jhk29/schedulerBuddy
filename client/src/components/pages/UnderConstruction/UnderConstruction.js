import { Typography, Divider } from "@material-ui/core";
import { Copyright } from "../../layout/Copyright/Copyright";

const UnderConstruction = () => {
  return (
    <div
      style={{ textAlign: "center", alignItems: "center", padding: "15rem" }}
    >
      <img
        style={{ width: 200, borderRadius: "50%" }}
        src="/lloid.gif"
        alt="construction-cone-icon"
      />
      <Typography variant="h5">
        {" "}
        Woops! This page is under construction.
      </Typography>
      <Typography variant="body2">Please check again later!</Typography>
      <Divider style={{ marginTop: "1.5rem" }} />
      <Copyright />
    </div>
  );
};

export default UnderConstruction;
