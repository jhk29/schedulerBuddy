// import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getEvents,
  addEvent,
  updateEvent,
  deleteEvent,
} from "../../../actions/eventActions";

const Calendar = (props) => {
  return <h1>Calendar Page</h1>;
};

Calendar.propTypes = {
  addEvent: PropTypes.func.isRequired,
  getEvents: PropTypes.func.isRequired,
  updateEvent: PropTypes.func.isRequired,
  deleteEvent: PropTypes.func.isRequired,
  event: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  event: state.event,
});

export default connect(mapStateToProps, {
  getEvents,
  addEvent,
  updateEvent,
  deleteEvent,
})(Calendar);
