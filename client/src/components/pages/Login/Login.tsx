import React, { useState } from "react";
import {
  Button,
  TextField,
  Grid,
  Avatar,
  Typography,
  Container,
  CssBaseline
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { Copyright } from "../../layout/Copyright/Copyright";

import { Link } from "react-router-dom";
import useStyles from "./Login.styles";

const Login = () => {
  const [ email, setEmail ] = useState<string>();
  const [ password, setPassword ] = useState<string>();

  const style= useStyles();

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let changedField = event.target.name;

    switch(changedField){
      case "email":
        setEmail(event.target.value);
        break;
      case "password":
        setPassword(event.target.value);
        break;
      default:
        break;
    }
  }

  const onSubmit = (e: any) => {
    e.preventDefault();
    let user = {
      email: email,
      password: password
    };
    console.log(user);
  }

  return(
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
            onChange={onChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            required
            type="password"
            name="password"
            label="Password"
            onChange={onChange}
            id="password"
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
                Don't have an account? <Link to="/register">Register</Link>
              </Typography>
            </Grid>
          </Grid>
        </form>
      </div>
      <Copyright />
    </Container>
  );
}

export default Login;