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

const Login = (props) => {
  const style = useStyles();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (props.auth.isAuthenticated) {
      props.history.push("/dashboard");
    }
  }, [props]);

  const onChange = (event) => {
    let changedField = event.target.name;
    setShowError(false);

    switch (changedField) {
      case "email":
        setEmail(event.target.value);
        break;
      case "password":
        setPassword(event.target.value);
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
    setShowError(true);
    console.log(props);
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
            error={
              showError &&
              (props.auth.error.email || props.auth.error.emailnotfound)
            }
            helperText={
              showError &&
              (props.auth.error.email || props.auth.error.emailnotfound)
            }
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
            error={
              showError &&
              (props.auth.error.password || props.auth.error.passwordincorrect)
            }
            helperText={
              showError &&
              (props.auth.error.password || props.auth.error.passwordincorrect)
            }
            label="Password"
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
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { loginUser })(Login);
