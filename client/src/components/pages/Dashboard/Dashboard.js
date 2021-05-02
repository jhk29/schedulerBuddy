import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../../actions/authActions";
import { Button } from "@material-ui/core";

const Dashboard = (prop) => {
  const handleLogout = (e) => {
    e.preventDefault();
    prop.logoutUser();
  };

  return (
    <>
      <h1>Dashboard Page</h1>
      <Button onClick={handleLogout}> Logout </Button>
    </>
  );
};

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(Dashboard);
