import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getEvents,
  addEvent,
  updateEvent,
  deleteEvent,
} from "../../../actions/eventActions";
import { LinearProgress } from "@material-ui/core";
import useStyles from "./Calendar.styles";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
import CalendarFormModal from "./CalendarForm";

// TODO: recurring event
// TODO: drag and drop ==> need to do timezone set up
const CalendarEvents = (props) => {
  const didMountRef = useRef(false);
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [clickedOnDate, setClickedOnDate] = useState();
  const [clickedOnDateOrWeek, setClickedOnDateOrWeek] = useState(false);
  const [editingEvent, setEditingEvent] = useState();
  const style = useStyles();

  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
      props.getEvents();
    }
  }, [props]);

  const handleAddClick = (e) => {
    if (e.dateStr.length > 10) {
      setClickedOnDate(e.dateStr.substring(0, 19));
      setClickedOnDateOrWeek(true);
    } else {
      setClickedOnDateOrWeek(false);
      setClickedOnDate(e.dateStr);
    }
    setIsAddFormOpen(true);
  };

  const handleEditClick = (e) => {
    const eventClicked = {
      _id: e.event._def.extendedProps._id,
      title: e.event.title,
      description: e.event._def.extendedProps.description,
      startDate: e.event.startStr.substring(0, 19),
      endDate: e.event.endStr.substring(0, 19),
      allDay: e.event.allDay,
    };
    if (eventClicked.allDay) {
      eventClicked.startDate += "T00:00";
    }
    setEditingEvent(eventClicked);
    setIsEditFormOpen(true);
  };

  const handleEventDrop = (eventInfo) => {
    const eventId = eventInfo.event._def.extendedProps._id;
    const startTemp = eventInfo.event._instance.range.start;
    const endTemp = eventInfo.event._instance.range.end;
    if (
      window.confirm(
        `Are you sure you want to move this event to ${startTemp}?`
      )
    ) {
      let startDate = new Date(
        startTemp.getTime() - startTemp.getTimezoneOffset() * 60000
      )
        .toISOString()
        .split(".")[0];
      let endDate = new Date(
        endTemp.getTime() - endTemp.getTimezoneOffset() * 60000
      )
        .toISOString()
        .split(".")[0];

      const updatedEvent = {
        allDay: eventInfo.event._def.allDay,
        title: eventInfo.event._def.title,
        start: startDate,
        end: endDate,
      };

      props.updateEvent(eventId, updatedEvent);
    } else {
      eventInfo.revert();
    }
  };

  const CalendarComponent = () => {
    return (
      <div className={style.root}>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: "prev,today,next",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          contentHeight={600}
          dateClick={handleAddClick}
          eventClick={handleEditClick}
          events={props.event.events}
          // TODO : set editable to true for drag and drop feature (currently buggy).
          editable={false}
          eventDrop={handleEventDrop}
        />
        <CalendarFormModal
          add={props.addEvent}
          open={isAddFormOpen}
          close={setIsAddFormOpen}
          date={clickedOnDate}
          dayWeekFlag={clickedOnDateOrWeek}
        />
        <CalendarFormModal
          edit={props.updateEvent}
          open={isEditFormOpen}
          close={setIsEditFormOpen}
          event={editingEvent}
          delete={props.deleteEvent}
        />
      </div>
    );
  };

  return (
    <>{props.event.loading ? <LinearProgress /> : <CalendarComponent />}</>
  );
};

CalendarEvents.propTypes = {
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
})(CalendarEvents);
