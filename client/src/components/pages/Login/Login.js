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
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { Copyright } from "../../layout/Copyright/Copyright";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../../actions/userActions";
import { Link } from "react-router-dom";
import useStyles from "./Login.styles";

// TODO: Clear prop errors when user leaves the page.
const Login = (props) => {
  const style = useStyles();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (props.auth.isAuthenticated) {
      props.history.push("/dashboard");
    }
    if (props.errors) {
      setErrors(props.errors);
    }
  }, [props]);

  const onChange = (event) => {
    let changedField = event.target.name;

    switch (changedField) {
      case "email":
        setEmail(event.target.value);
        setErrors({ email: "", password: errors.password });
        break;
      case "password":
        setPassword(event.target.value);
        setErrors({ email: errors.email, password: "" });
        break;
      default:
        break;
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let user = {
      email: email,
      password: password,
    };
    props.loginUser(user);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={style.paper}>
        <Avatar className={style.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Log In
        </Typography>
        <form className={style.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            error={!!errors.email}
            helperText={errors.email}
            onChange={onChange}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            type="password"
            name="password"
            id="password"
            label="Password"
            error={!!errors.password || !!errors.passwordincorrect}
            helperText={errors.password || errors.passwordincorrect}
            onChange={onChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={style.submitButton}
            onClick={onSubmit}
          >
            Log In
          </Button>
          <Grid container>
            <Grid item xs>
              <Typography className={style.accountLink} variant="body2">
                Don't have an account? <Link to="register">Register</Link>
              </Typography>
            </Grid>
          </Grid>
        </form>
      </div>
      <Copyright />
    </Container>
  );
};

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { loginUser })(Login);
