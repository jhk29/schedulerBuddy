import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Grid,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormControlLabel,
  Checkbox,
  Divider,
  FormHelperText,
} from "@material-ui/core";
import useStyles from "./ToDo.styles";
import QueueIcon from "@material-ui/icons/Queue";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import { priorityLevels } from "../../../utils/priority";
import { getTodaysDate } from "../../../utils/dates";
import { useState, useEffect } from "react";

const ToDoFormModal = (props) => {
  const styles = useStyles();

  const [todoId, setTodoId] = useState();
  const [description, setDescription] = useState();
  const [priority, setPriority] = useState(0);
  const [deadline, setDeadline] = useState();
  const [completed, setCompleted] = useState();
  const [isDescriptionValid, setIsDescriptionValid] = useState(true);
  const [isPriorityValid, setIsPriorityValid] = useState(true);
  const [isDeadlineValid, setIsDeadlineValid] = useState(true);
  const currentDate = getTodaysDate();

  useEffect(() => {
    if (props.todo) {
      setTodoId(props.todo[0]);
      setDescription(props.todo[2]);
      setPriority(props.todo[3]);
      setDeadline(props.todo[4].split("T")[0]);
      setCompleted(props.todo[5]);
    }
  }, [props]);

  const clearForm = () => {
    setTodoId("");
    setDescription("");
    setPriority(0);
    setDeadline("");
    setCompleted(false);

    setIsDescriptionValid(true);
    setIsPriorityValid(true);
    setIsDeadlineValid(true);
  };

  const validateForm = () => {
    description ? setIsDescriptionValid(true) : setIsDescriptionValid(false);
    priority !== 0 ? setIsPriorityValid(true) : setIsPriorityValid(false);
    deadline ? setIsDeadlineValid(true) : setIsDeadlineValid(false);
  };

  const handleClose = () => {
    props.close(false);
    clearForm();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validateForm();
    if (isDescriptionValid && isPriorityValid && isDeadlineValid) {
      const todoData = {
        description: description,
        priority: priority,
        deadline: deadline,
        completed: completed,
      };
      props.add ? props.add(todoData) : props.edit(todoId, todoData);
      handleClose();
    }
  };

  const handleDelete = (e) => {
    e.preventDefault();
    if (window.confirm("Are you sure you want to delete this to-do?")) {
      props.delete(todoId);
      handleClose();
    }
  };

  return (
    <Dialog fullWidth open={props.open} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">
        {props.add ? (
          <>
            <QueueIcon /> Add New To-Do
          </>
        ) : (
          <>
            <BorderColorIcon /> Edit To-Do
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
                value={description}
                name="description"
                error={!isDescriptionValid}
                label="Description"
                helperText={
                  !isDescriptionValid && "Description field is required"
                }
                onChange={(e) => {
                  setDescription(e.target.value);
                  setIsDescriptionValid(true);
                }}
              />
            </Grid>
            <Grid item>
              <FormControl variant="outlined" fullWidth>
                <InputLabel htmlFor="priority">Priority *</InputLabel>
                <Select
                  label="Priority"
                  inputProps={{
                    name: "priority",
                  }}
                  required
                  value={priority}
                  error={!isPriorityValid}
                  onChange={(e) => {
                    setPriority(e.target.value);
                    setIsPriorityValid(true);
                  }}
                >
                  <MenuItem value={0} style={{ display: "none" }}>
                    N/A
                  </MenuItem>
                  {Object.entries(priorityLevels).map(
                    ([value, { level, name, color }]) => (
                      <MenuItem value={level} key={value}>
                        <FiberManualRecordIcon style={{ color: color }} />
                        {name}
                      </MenuItem>
                    )
                  )}
                </Select>
                {!isPriorityValid && (
                  <FormHelperText style={{ color: "red" }}>
                    Priority field is required
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item>
              <TextField
                name="deadline"
                type="date"
                required
                label="Deadline"
                variant="outlined"
                value={deadline}
                error={!isDeadlineValid}
                helperText={!isDeadlineValid && "Deadline field is required"}
                onChange={(e) => {
                  setDeadline(e.target.value);
                  setIsDeadlineValid(true);
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  min: currentDate,
                }}
                fullWidth
              />
            </Grid>
            {props.add ? (
              <></>
            ) : (
              <Grid item>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={completed}
                      onChange={(e) => setCompleted(e.target.checked)}
                      color="primary"
                    />
                  }
                  label="Completed"
                />
              </Grid>
            )}
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

export default ToDoFormModal;
