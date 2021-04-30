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
import PersonAdd from "@material-ui/icons/PersonAdd";
import { Link } from "react-router-dom";
import useStyles from "./Register.styles";
import { Copyright } from "../../layout/Copyright/Copyright";

interface INewUser {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  errors: object;
}

const Register = () => {
  const [newUser, setNewUser] = useState<INewUser>();
  const styles= useStyles();

  return(
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={styles.paper}>
        <Avatar className={styles.avatar}>
          <PersonAdd />
        </Avatar>
        <Typography className={styles.registerIconText} component="h1" variant="h5">
          Register
        </Typography>
        <form className={styles.form} noValidate>
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
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField 
                name="password"
                variant="outlined"
                required
                fullWidth
                id="password"
                label="Password"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField 
                name="confirmPassword"
                variant="outlined"
                required
                fullWidth
                id="confirmPassword"
                label="Confirmation Password"
                autoFocus
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={styles.submitButton}
          >
            Register
          </Button>
          <Grid container justify="flex-end">
            <Grid item className={styles.accountLink}>
              <Typography variant="body2">Already have an account? <Link to="/login">
                Sign In
              </Link> </Typography>
              
            </Grid>
          </Grid>
        </form>
      </div>
      <Copyright />
    </Container>
  );
};

export default Register;
