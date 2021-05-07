import { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Grid,
  Avatar,
  Typography,
  Container,
  CssBaseline,
} from "@material-ui/core";
import PersonAdd from "@material-ui/icons/PersonAdd";
import { Link, withRouter } from "react-router-dom";
import useStyles from "./Register.styles";
import { Copyright } from "../../layout/Copyright/Copyright";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../../actions/authActions";

// TODO: figure out how to clear error when user leaves register page.

const Register = (props) => {
  const style = useStyles();

  const [newName, setName] = useState("");
  const [newEmail, setEmail] = useState("");
  const [newPassword, setPassword] = useState("");
  const [newConfirmPassword, setConfirmPasssword] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (props.errors) {
      setErrors(props.errors);
    }
  }, [props]);

  const onSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      name: newName,
      email: newEmail,
      password: newPassword,
      confirmPassword: newConfirmPassword,
    };
    props.registerUser(newUser, props.history);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={style.paper}>
        <Avatar className={style.avatar}>
          <PersonAdd />
        </Avatar>
        <Typography
          className={style.registerIconText}
          component="h1"
          variant="h5"
        >
          Register
        </Typography>
        <form className={style.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="name"
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Full Name"
                autoFocus
                error={!!errors.name}
                helperText={errors.name}
                onChange={(e) => {
                  setName(e.target.value);
                  setErrors({
                    name: "",
                    email: errors.email,
                    password: errors.password,
                    confirmPassword: errors.confirmPassword,
                  });
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="email"
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                error={!!errors.email}
                helperText={errors.email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrors({
                    name: errors.name,
                    email: "",
                    password: errors.password,
                    confirmPassword: errors.confirmPassword,
                  });
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="password"
                variant="outlined"
                required
                fullWidth
                type="password"
                id="password"
                label="Password"
                error={!!errors.password}
                helperText={errors.password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrors({
                    name: errors.name,
                    email: errors.email,
                    password: "",
                    confirmPassword: "",
                  });
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="confirmPassword"
                variant="outlined"
                required
                fullWidth
                type="password"
                id="confirmPassword"
                label="Confirmation Password"
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
                onChange={(e) => {
                  setConfirmPasssword(e.target.value);
                  setErrors({
                    name: errors.name,
                    email: errors.email,
                    password: "",
                    confirmPassword: "",
                  });
                }}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={style.submitButton}
            onClick={onSubmit}
          >
            Register
          </Button>
          <Grid container justify="flex-end">
            <Grid item className={style.accountLink}>
              <Typography variant="body2">
                Already have an account?? <Link to="/login">Sign In</Link>
              </Typography>
            </Grid>
          </Grid>
        </form>
      </div>
      <Copyright />
    </Container>
  );
};

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
