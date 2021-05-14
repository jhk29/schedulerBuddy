import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  BottomNavigation,
  BottomNavigationAction,
  Grid,
  Divider,
  Typography,
  TextField,
  Button,
  Snackbar,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import {
  updatePassword,
  updateUserInfo,
  deleteUser,
} from "../../../actions/userActions";
import LockIcon from "@material-ui/icons/Lock";
import PersonIcon from "@material-ui/icons/Person";
import useStyles from "./Settings.styles";

const Settings = (props) => {
  const didMountRef = useRef(false);
  const styles = useStyles();
  const [value, setValue] = useState(0);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [showAlert, setShowAlert] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
      setName(props.auth.user.name);
      setEmail(props.auth.user.email);
    } else if (Object.keys(props.auth.error).length === 0) {
      setShowSuccess(true);
      setShowAlert(true);
      setName(props.auth.user.name);
      setEmail(props.auth.user.email);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } else {
      setShowSuccess(false);
      setShowAlert(true);
    }
  }, [props]);

  const resetToInitialValues = () => {
    setName(props.auth.user.name);
    setEmail(props.auth.user.email);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setShowError(false);
  };

  const handlePasswordChange = async () => {
    const passwordData = {
      currentPassword: currentPassword,
      newPassword: newPassword,
      confirmPassword: confirmPassword,
    };
    props.updatePassword(passwordData);
  };

  const handleInfoChange = async () => {
    const updatedInfo = {
      name: name,
      email: email,
    };
    props.updateUserInfo(updatedInfo);
  };

  const handleInputChange = (e) => {
    setShowError(false);
    const changedField = e.target.name;
    switch (changedField) {
      case "name":
        setName(e.target.value);
        break;
      case "email":
        setEmail(e.target.value);
        break;
      case "currentPassword":
        setCurrentPassword(e.target.value);
        break;
      case "newPassword":
        setNewPassword(e.target.value);
        break;
      case "confirmPassword":
        setConfirmPassword(e.target.value);
        break;
      default:
        break;
    }
  };

  const handleUserDelete = (e) => {
    e.preventDefault();
    if (window.confirm("Are you sure you want to delete your account?")) {
      props.deleteUser();
    }
  };

  return (
    <Grid container direction="column" className={styles.rootContainer}>
      <Grid item lg={12} md={12} sm={12} xs={12} spacing={2}>
        <BottomNavigation
          value={value}
          onChange={(_, newValue) => {
            setValue(newValue);
            resetToInitialValues();
          }}
          showLabels
        >
          <BottomNavigationAction label="General" icon={<PersonIcon />} />
          <BottomNavigationAction label="Password" icon={<LockIcon />} />
        </BottomNavigation>
        <Divider />
      </Grid>
      <Grid item className={styles.formTitle} lg={12} md={12} sm={12} xs={12}>
        <Typography variant="h5" color="textSecondary">
          {value === 0 ? "General Settings" : "Password Settings"}
        </Typography>
      </Grid>
      <form noValidate>
        {value === 0 ? (
          <Grid container className={styles.formContainer}>
            <Grid item lg={8} md={8} sm={8} xs={8}>
              <TextField
                name="name"
                required
                key={1}
                margin="normal"
                fullWidth
                variant="outlined"
                value={name || ""}
                error={showError && props.auth.error.name}
                helperText={showError && props.auth.error.name}
                id="name"
                onChange={handleInputChange}
                label="Full Name"
              />
            </Grid>
            <Grid item lg={8} md={8} sm={8} xs={8}>
              <TextField
                name="email"
                required
                key={2}
                variant="outlined"
                fullWidth
                className={styles.formInput}
                value={email || ""}
                error={showError && props.auth.error.email}
                helperText={showError && props.auth.error.email}
                onChange={handleInputChange}
                id="email"
                label="Email Address"
              />
            </Grid>
            <Grid item lg={8} md={8} sm={8} xs={8}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                className={styles.formInput}
                disabled={
                  props.auth.user.name === name &&
                  props.auth.user.email === email
                }
                onClick={handleInfoChange}
              >
                Save
              </Button>
              <Button
                variant="outlined"
                color="primary"
                fullWidth
                className={styles.formInput}
                onClick={resetToInitialValues}
              >
                Cancel
              </Button>
            </Grid>
            <Grid item lg={8} md={8} sm={8} xs={8}>
              <Divider />
            </Grid>
            <Grid item lg={8} md={8} sm={8} xs={8}>
              <Button
                variant="outlined"
                color="secondary"
                className={styles.formInput}
                onClick={handleUserDelete}
                fullWidth
              >
                Delete Account
              </Button>
            </Grid>
          </Grid>
        ) : (
          <Grid container className={styles.formContainer}>
            <Grid item lg={8} md={8} sm={8} xs={8}>
              <TextField
                name="currentPassword"
                required
                key={3}
                fullWidth
                className={styles.formInput}
                type="password"
                variant="outlined"
                id="currentPassword"
                error={
                  showError &&
                  (props.auth.error.passwordincorrect ||
                    props.auth.error.currentPassword)
                }
                helperText={
                  showError &&
                  (props.auth.error.passwordincorrect ||
                    props.auth.error.currentPassword)
                }
                label="Current Password"
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item lg={8} md={8} sm={8} xs={8}>
              <TextField
                name="newPassword"
                required
                className={styles.formInput}
                key={4}
                variant="outlined"
                fullWidth
                type="password"
                id="newPassword"
                error={showError && props.auth.error.newPassword}
                helperText={showError && props.auth.error.newPassword}
                label="New Password"
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item lg={8} md={8} sm={8} xs={8}>
              <TextField
                name="confirmPassword"
                required
                key={5}
                variant="outlined"
                fullWidth
                className={styles.formInput}
                error={showError && props.auth.error.confirmPassword}
                helperText={showError && props.auth.error.confirmPassword}
                type="password"
                id="confirmPassword"
                label="Confirmation Password"
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item lg={8} md={8} sm={8} xs={8}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                className={styles.formInput}
                disabled={!currentPassword || !newPassword || !confirmPassword}
                onClick={handlePasswordChange}
              >
                Update Password
              </Button>
              <Button
                variant="outlined"
                color="primary"
                fullWidth
                className={styles.formInput}
                onClick={resetToInitialValues}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        )}
      </form>
      <Snackbar
        open={showAlert}
        autoHideDuration={2000}
        onClose={() => {
          setShowAlert(false);
        }}
        anchorOrigin={{ horizontal: "center", vertical: "top" }}
      >
        {showSuccess ? (
          <Alert
            onClose={() => setShowAlert(false)}
            variant="standard"
            severity="success"
          >
            User has been successfully updated!
          </Alert>
        ) : (
          <Alert
            onClose={() => setShowAlert(false)}
            variant="standard"
            severity="error"
          >
            An error was encountered when trying to update the user! Please try
            again.
          </Alert>
        )}
      </Snackbar>
    </Grid>
  );
};

Settings.propTypes = {
  auth: PropTypes.object.isRequired,
  updatePassword: PropTypes.func.isRequired,
  updateUserInfo: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  updatePassword,
  updateUserInfo,
  deleteUser,
})(Settings);
