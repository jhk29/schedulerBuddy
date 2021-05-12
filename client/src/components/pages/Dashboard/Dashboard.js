import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getTodosDue,
  updateDashboardTodo,
  deleteTodo,
  addTodo,
} from "../../../actions/todoActions";
import {
  getTodaysEvents,
  updateDashboardEvent,
  deleteEvent,
  addEvent,
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
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
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
  Button,
} from "@material-ui/core";

const Dashboard = (props) => {
  const didMountRef = useRef(false);
  const [isEditToDoFormOpen, setIsEditToDoFormOpen] = useState(false);
  const [isAddTodoFormOpen, setIsAddTodoFormOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState();
  const [isAddEventFormOpen, setIsAddEventFormOpen] = useState(false);
  const [isEditEventFormOpen, setIsEditEventFormOpen] = useState(false);
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

  const NoTodoFound = () => {
    return (
      <div className={style.noTodoDisplay}>
        <ErrorOutlineIcon />
        <Typography>There is nothing due today!</Typography>
        <Button
          className={style.noDisplayButton}
          variant="outlined"
          color="secondary"
          onClick={() => setIsAddTodoFormOpen(true)}
        >
          Add To-do
        </Button>
      </div>
    );
  };

  const NoEventFound = () => {
    return (
      <div className={style.noEventDisplay}>
        <ErrorOutlineIcon />
        <Typography>There is no event today!</Typography>
        <Button
          className={style.noDisplayButton}
          variant="outlined"
          onClick={() => setIsAddEventFormOpen(true)}
          color="secondary"
        >
          Add Event
        </Button>
      </div>
    );
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
                    <Typography
                      component="span"
                      variant="body2"
                      color="textSecondary"
                      gutterBottom
                    >
                      <FavoriteTwoToneIcon />
                      {`Welcome back, ${props.auth.user.name}`}
                    </Typography>
                    <Typography variant="h5" component="h2">
                      {getTodaysDateInMonthDay()}
                    </Typography>
                    <Typography
                      className={style.wordsToInspireHeader}
                      component="span"
                      variant="body2"
                      color="textSecondary"
                    >
                      Some words to inspire you today:
                    </Typography>
                    {quoteAndAuthor ? (
                      <>
                        {" "}
                        <Typography
                          variant="body2"
                          component="span"
                          className={style.inspireQuote}
                        >
                          {" "}
                          {`"${quoteAndAuthor.quote}"`}
                        </Typography>
                        <Typography
                          component="span"
                          variant="body2"
                          className={style.quoteAuthor}
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
                      {props.event.events.length === 0 ? (
                        <NoEventFound />
                      ) : (
                        Object.entries(props.event.events).map(
                          ([
                            value,
                            { _id, allDay, start, end, title, description },
                          ]) => (
                            <div key={_id}>
                              <ListItem
                                button
                                onClick={() => {
                                  formEditingEvent(
                                    _id,
                                    title,
                                    start,
                                    end,
                                    description,
                                    allDay
                                  );
                                  setIsEditEventFormOpen(true);
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
                                      : `${fetchTime(start)} - ${fetchTime(
                                          end
                                        )}`
                                  }
                                />
                              </ListItem>
                              <Divider />
                            </div>
                          )
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
                  {props.todo.todos.length === 0 ? (
                    <NoTodoFound />
                  ) : (
                    Object.entries(props.todo.todos).map(
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
                          <div key={_id}>
                            <ListItem
                              button
                              onClick={() => {
                                formEditingTodo(
                                  _id,
                                  description,
                                  priority,
                                  deadline,
                                  completed
                                );
                                setIsEditToDoFormOpen(true);
                              }}
                            >
                              <ListItemIcon>
                                <ArrowRightIcon />
                              </ListItemIcon>
                              <ListItemText
                                primary={description}
                                secondary={
                                  <Typography
                                    component="span"
                                    variant="body2"
                                    color="textSecondary"
                                  >
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
                          </div>
                        );
                      }
                    )
                  )}
                </List>
              </CardContent>
            </Card>
          </Grid>
          <ToDoFormModal
            todo={editingTodo}
            open={isEditToDoFormOpen}
            close={setIsEditToDoFormOpen}
            edit={props.updateDashboardTodo}
            delete={props.deleteTodo}
          />
          <ToDoFormModal
            open={isAddTodoFormOpen}
            close={setIsAddTodoFormOpen}
            add={props.addTodo}
          />
          <CalendarFormModal
            event={editingEvent}
            open={isEditEventFormOpen}
            close={setIsEditEventFormOpen}
            edit={props.updateDashboardEvent}
            delete={props.deleteEvent}
          />
          <CalendarFormModal
            add={props.addEvent}
            open={isAddEventFormOpen}
            close={setIsAddEventFormOpen}
          />
        </Grid>
      )}
    </>
  );
};

Dashboard.propTypes = {
  getTodosDue: PropTypes.func.isRequired,
  updateDashboardTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  addTodo: PropTypes.func.isRequired,
  updateDashboardEvent: PropTypes.func.isRequired,
  getTodaysEvents: PropTypes.func.isRequired,
  deleteEvent: PropTypes.func.isRequired,
  addEvent: PropTypes.func.isRequired,
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
  addTodo,
  updateDashboardTodo,
  updateDashboardEvent,
  deleteEvent,
  addEvent,
})(Dashboard);
