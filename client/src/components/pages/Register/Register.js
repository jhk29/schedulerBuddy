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
import { registerUser } from "../../../actions/userActions";

const Register = (props) => {
  const style = useStyles();

  const [newName, setName] = useState("");
  const [newEmail, setEmail] = useState("");
  const [newPassword, setPassword] = useState("");
  const [newConfirmPassword, setConfirmPasssword] = useState("");
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (props.auth.isAuthenticated) {
      props.history.push("/dashboard");
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
    setShowError(true);
  };

  const handleChange = (event) => {
    let changedField = event.target.name;
    setShowError(false);
    switch (changedField) {
      case "name":
        setName(event.target.value);
        break;
      case "email":
        setEmail(event.target.value);
        break;
      case "password":
        setPassword(event.target.value);
        break;
      case "confirmPassword":
        setConfirmPasssword(event.target.value);
        break;
      default:
        break;
    }
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
                error={showError && props.auth.error.name}
                helperText={showError && props.auth.error.name}
                label="Full Name"
                autoFocus
                onChange={handleChange}
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
                error={showError && props.auth.error.email}
                helperText={showError && props.auth.error.email}
                onChange={handleChange}
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
                error={showError && props.auth.error.password}
                helperText={showError && props.auth.error.password}
                label="Password"
                onChange={handleChange}
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
                error={showError && props.auth.error.confirmPassword}
                helperText={showError && props.auth.error.confirmPassword}
                label="Confirmation Password"
                onChange={handleChange}
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
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
