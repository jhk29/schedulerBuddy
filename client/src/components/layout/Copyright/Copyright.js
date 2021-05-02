import Typography from "@material-ui/core/Typography";
import useStyles from "./Copyright.styles";

export const Copyright = () => {
  const style = useStyles();

  return (
    <Typography
      className={style.copyRight}
      variant="body2"
      color="textSecondary"
      align="center"
    >
      Copyright © Sam (Jin Hyun) Kim {new Date().getFullYear()}
    </Typography>
  );
};
