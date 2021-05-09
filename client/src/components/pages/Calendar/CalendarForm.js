import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Grid,
  TextField,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
} from "@material-ui/core";
import useStyles from "./Calendar.styles";
import TodayIcon from "@material-ui/icons/Today";
import EventAvailableIcon from "@material-ui/icons/EventAvailable";
import { useState, useEffect } from "react";

const CalendarFormModal = (props) => {
  const styles = useStyles();

  const [eventId, setEventId] = useState();
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState(null);
  const [allDay, setAllDay] = useState(false);
  const [description, setDescription] = useState();

  const [isTitleInvalid, setIsTitleInvalid] = useState(false);
  const [isEndDateInvalid, setIsEndDateInvalid] = useState(false);

  useEffect(() => {
    if (props.edit && props.event) {
      setEventId(props.event._id);
      setTitle(props.event.title);
      setStartDate(props.event.startDate);
      setEndDate(props.event.endDate);
      setAllDay(props.event.allDay);
      setDescription(props.event.description);
    } else {
      setStartDate(props.date);
      if (props.dayWeekFlag) {
        let endDate = new Date(props.date);
        endDate.setMinutes(endDate.getMinutes() + 30);
        endDate = new Date(
          endDate.getTime() - endDate.getTimezoneOffset() * 60000
        );
        setEndDate(endDate.toISOString().split(".")[0]);
      } else {
        setStartDate(props.date + "T00:00");
        setEndDate(props.date + "T01:00");
      }
    }
  }, [props]);

  const clearForm = () => {
    setEventId();
    setTitle("");
    setStartDate();
    setEndDate(null);
    setAllDay(false);
    setDescription("");
  };

  const handleClose = () => {
    props.close(false);
    clearForm();
  };

  const validateForm = () => {
    if (title.length === 0) {
      setIsTitleInvalid(true);
      return false;
    }
    if (!allDay) {
      if (!endDate) {
        setIsEndDateInvalid(true);
        return false;
      } else if (endDate && endDate <= startDate) {
        setIsEndDateInvalid(true);
        return false;
      }
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const eventData = {
        title: title,
        start: startDate,
        end: endDate,
        description: description,
        allDay: allDay,
      };
      props.add ? props.add(eventData) : props.edit(eventId, eventData);
      handleClose();
    }
  };

  const handleDelete = (e) => {
    e.preventDefault();
    if (window.confirm("Are you sure you want to delete this event?")) {
      props.delete(eventId);
      handleClose();
    }
  };

  return (
    <Dialog fullWidth open={props.open} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">
        {props.add ? (
          <>
            <TodayIcon />
            Add Event
          </>
        ) : (
          <>
            <EventAvailableIcon />
            Edit Event
          </>
        )}
      </DialogTitle>
      <Divider />
      <form>
        <DialogContent>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                value={title}
                error={isTitleInvalid}
                helperText={isTitleInvalid && "Title field is required."}
                name="title"
                label="Title"
                onChange={(e) => {
                  setTitle(e.target.value);
                  setIsTitleInvalid(false);
                }}
              />
            </Grid>
            <Grid item>
              {allDay ? (
                <TextField
                  name="startDate"
                  type="date"
                  required
                  label="Start Date"
                  variant="outlined"
                  value={startDate.substring(0, 10)}
                  onChange={(e) => {
                    setStartDate(e.target.value);
                    setIsEndDateInvalid(false);
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
                />
              ) : (
                <TextField
                  name="startDate"
                  type="datetime-local"
                  required
                  label="Start Date"
                  variant="outlined"
                  value={startDate}
                  onChange={(e) => {
                    setStartDate(e.target.value);
                    setIsEndDateInvalid(false);
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
                />
              )}
            </Grid>
            <Grid item>
              <TextField
                name="endDate"
                type="datetime-local"
                required
                label="End Date"
                variant="outlined"
                value={endDate}
                error={isEndDateInvalid}
                helperText={
                  isEndDateInvalid &&
                  "End Date field is required and must be after start date."
                }
                disabled={allDay}
                onChange={(e) => {
                  setEndDate(e.target.value);
                  setIsEndDateInvalid(false);
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
              />
            </Grid>
            <Grid item>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                multiline
                value={description}
                name="description"
                label="Description"
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </Grid>
            <Grid item>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={allDay}
                    onChange={(e) => setAllDay(e.target.checked)}
                    color="primary"
                  />
                }
                label="All Day?"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <Divider className={styles.addToDoDivider} />
        <DialogActions>
          {props.edit ? (
            <Button color="secondary" variant="outlined" onClick={handleDelete}>
              Delete
            </Button>
          ) : (
            <></>
          )}
          <div className={styles.formButtonContainer}>
            <Button
              color="primary"
              variant="outlined"
              type="reset"
              className={styles.formButton}
              onClick={handleClose}
            >
              {" "}
              Cancel
            </Button>
            <Button
              color="primary"
              variant="contained"
              className={styles.formButton}
              onClick={handleSubmit}
            >
              {" "}
              {props.add ? "Add" : "Save"}
            </Button>
          </div>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CalendarFormModal;
