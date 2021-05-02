import { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Landing = (props) => {
  useEffect(() => {
    if (props.auth.isAuthenticated) {
      props.history.push("/dashboard");
    }
  }, [props]);

  return <h1>Landing Page</h1>;
};

Landing.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Landing);
