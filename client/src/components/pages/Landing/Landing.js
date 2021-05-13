import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useEffect } from "react";
import { withRouter } from "react-router-dom";
import useStyles from "./Landing.styles";
import Schedule from "./schedule.png";
import { Copyright } from "../../layout/Copyright/Copyright";
import { Grid, Typography, Divider, Button } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";

const Landing = (props) => {
  const styles = useStyles();
  const history = useHistory();

  useEffect(() => {
    if (props.auth.isAuthenticated) {
      props.history.push("/dashboard");
    }
  }, [props]);

  return (
    <>
      <Grid className={styles.container} container direction="row" spacing={2}>
        <Grid item className={styles.innerContainer} md={6} xs={12}>
          <img
            src={Schedule}
            className={styles.image}
            alt="scheduling-characters"
          />
        </Grid>
        <Grid className={styles.innerContainer} item md={6} xs={12}>
          <Typography
            className={styles.schedulerInfo}
            variant="h4"
            color="textSecondary"
          >
            Work more efficiently with <br /> your own <b>Scheduler Buddy!</b>
            <Divider />
          </Typography>
          <Typography
            className={styles.schedulerInfo}
            variant="h6"
            color="textSecondary"
          >
            Manage your upcoming plans, tasks, and much more!
            <Button
              fullWidth
              className={styles.schedulerButtons}
              onClick={() => {
                history.push("/register");
              }}
              variant="contained"
              color="primary"
            >
              Sign Me Up!
            </Button>
            <Typography variant="body2">
              {" "}
              Already have an account? <Link to="/login">Sign In</Link>
            </Typography>
          </Typography>
        </Grid>
      </Grid>
      <Copyright />
    </>
  );
};

Landing.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(withRouter(Landing));
