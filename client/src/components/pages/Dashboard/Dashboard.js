import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getTodosDue,
  updateTodo,
  deleteTodo,
} from "../../../actions/todoActions";
import {
  getTodaysEvents,
  updateEvent,
  deleteEvent,
} from "../../../actions/eventActions";
import { fetchRandomQuote } from "../../../utils/quotes";
import useStyles from "./Dashboard.style";
import { priorityLevels } from "../../../utils/priority";
import { getTodaysDateInMonthDay } from "../../../utils/dates";
import PlaylistAddCheckIcon from "@material-ui/icons/PlaylistAddCheck";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import FavoriteTwoToneIcon from "@material-ui/icons/FavoriteTwoTone";
import TodayIcon from "@material-ui/icons/Today";
import ToDoFormModal from "../ToDo/ToDoFormModal";
import CalendarFormModal from "../Calendar/CalendarForm";
import {
  List,
  ListItem,
  ListSubheader,
  ListItemText,
  ListItemIcon,
  Grid,
  Card,
  CardContent,
  Divider,
  LinearProgress,
  Chip,
  Typography,
} from "@material-ui/core";

const Dashboard = (props) => {
  const didMountRef = useRef(false);
  const [isToDoFormOpen, setIsToDoFormOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState();
  const [isEventFormOpen, setIsEventFormOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState();
  const [quoteAndAuthor, setQuoteAndAuthor] = useState();
  const style = useStyles();

  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
      props.getTodosDue();
      props.getTodaysEvents();
      setQuoteAndAuthor(fetchRandomQuote());
    }
  }, [props]);

  const fetchTime = (date) => {
    let result = date.match(/\d\d:\d\d/);
    return result[0];
  };

  const formEditingTodo = (id, description, priority, deadline, completed) => {
    setEditingTodo([id, "", description, priority, deadline, completed]);
  };

  const formEditingEvent = (id, title, start, end, description, allDay) => {
    let event = {
      _id: id,
      title: title,
      startDate: start.substring(0, 19),
      description: description,
      allDay: allDay,
    };
    if (!allDay) {
      event.endDate = end.substring(0, 19);
    }
    setEditingEvent(event);
  };

  return (
    <>
      {props.todo.loading || props.event.loading ? (
        <LinearProgress color="secondary" />
      ) : (
        <Grid container className={style.root} direction="row" spacing={3}>
          <Grid item lg={4} md={12} sm={12} xs={12}>
            <Grid container direction="column" spacing={2}>
              <Grid item lg={12}>
                <Card className={style.smallerCard} variant="outlined">
                  <CardContent>
                    <Typography color="textSecondary" gutterBottom>
                      <FavoriteTwoToneIcon />
                      {`Welcome back, ${props.auth.user.name}`}
                    </Typography>
                    <Typography variant="h5" component="h2">
                      {getTodaysDateInMonthDay()}
                    </Typography>
                    <Typography
                      className={style.wordsToInspireHeader}
                      color="textSecondary"
                    >
                      Some words to inspire you today:
                    </Typography>
                    {quoteAndAuthor ? (
                      <>
                        {" "}
                        <Typography
                          variant="body2"
                          component="p"
                          className={style.inspireQuote}
                        >
                          {" "}
                          {`"${quoteAndAuthor.quote}"`}
                        </Typography>
                        <Typography
                          variant="body2"
                          className={style.quoteAuthor}
                          component="p"
                        >
                          {`- ${quoteAndAuthor.author}`}
                        </Typography>{" "}
                      </>
                    ) : (
                      <Typography className={style.inspireQuote}>
                        Failed to load an expiring quote!
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              </Grid>
              <Grid item lg={12}>
                <Card className={style.smallCard} variant="outlined">
                  <CardContent>
                    <List>
                      <ListSubheader>
                        <TodayIcon /> Today's Events:
                      </ListSubheader>
                      <Divider />
                      {Object.entries(props.event.events).map(
                        ([
                          value,
                          { _id, allDay, start, end, title, description },
                        ]) => (
                          <>
                            <ListItem
                              button
                              key={value}
                              onClick={() => {
                                formEditingEvent(
                                  _id,
                                  title,
                                  start,
                                  end,
                                  description,
                                  allDay
                                );
                                setIsEventFormOpen(true);
                              }}
                            >
                              <ListItemIcon>
                                <ArrowRightIcon />
                              </ListItemIcon>
                              <ListItemText
                                primary={title}
                                secondary={
                                  allDay
                                    ? "All Day"
                                    : `${fetchTime(start)} - ${fetchTime(end)}`
                                }
                              />
                            </ListItem>
                            <Divider />
                          </>
                        )
                      )}
                    </List>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={8} md={12} sm={12}>
            <Card className={style.card} variant="outlined">
              <CardContent>
                <List>
                  <ListSubheader>
                    <PlaylistAddCheckIcon /> Due Today:
                  </ListSubheader>
                  <Divider />
                  {Object.entries(props.todo.todos).map(
                    ([
                      value,
                      { _id, completed, description, priority, deadline },
                    ]) => {
                      let chipColor = "";
                      let name = "";
                      switch (priority) {
                        case priorityLevels.HI.level:
                          chipColor = priorityLevels.HI.color;
                          name = priorityLevels.HI.name;
                          break;
                        case priorityLevels.ME.level:
                          chipColor = priorityLevels.ME.color;
                          name = priorityLevels.ME.name;
                          break;
                        case priorityLevels.LO.level:
                          chipColor = priorityLevels.LO.color;
                          name = priorityLevels.LO.name;
                          break;
                        default:
                          break;
                      }
                      return (
                        <>
                          <ListItem
                            button
                            key={value}
                            onClick={() => {
                              formEditingTodo(
                                _id,
                                description,
                                priority,
                                deadline,
                                completed
                              );
                              setIsToDoFormOpen(true);
                            }}
                          >
                            <ListItemIcon>
                              <ArrowRightIcon />
                            </ListItemIcon>
                            <ListItemText
                              primary={description}
                              secondary={
                                <Typography color="textSecondary">
                                  <Chip
                                    label={name}
                                    style={{
                                      backgroundColor: chipColor,
                                      color: "white",
                                    }}
                                  />
                                  {completed
                                    ? " • Completed"
                                    : " • Not Completed"}
                                </Typography>
                              }
                            />
                          </ListItem>
                          <Divider />
                        </>
                      );
                    }
                  )}
                </List>
              </CardContent>
            </Card>
          </Grid>
          <ToDoFormModal
            todo={editingTodo}
            open={isToDoFormOpen}
            close={setIsToDoFormOpen}
            edit={props.updateTodo}
            delete={props.deleteTodo}
          />
          <CalendarFormModal
            event={editingEvent}
            open={isEventFormOpen}
            close={setIsEventFormOpen}
            edit={props.updateEvent}
            delete={props.deleteEvent}
          />
        </Grid>
      )}
    </>
  );
};

Dashboard.propTypes = {
  getTodosDue: PropTypes.func.isRequired,
  updateTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  updateEvent: PropTypes.func.isRequired,
  getTodaysEvents: PropTypes.func.isRequired,
  deleteEvent: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  todo: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  todo: state.todo,
  event: state.event,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getTodosDue,
  getTodaysEvents,
  deleteTodo,
  updateTodo,
  updateEvent,
  deleteEvent,
})(Dashboard);
