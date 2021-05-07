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
} from "@material-ui/core";
import useStyles from "./ToDo.styles";
import QueueIcon from "@material-ui/icons/Queue";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import { useState, useEffect } from "react";

// TODO: error handling
const EditToDoModal = (props) => {
  const styles = useStyles();

  const [todoId, setTodoId] = useState();
  const [description, setDescription] = useState();
  const [priority, setPriority] = useState();
  const [deadline, setDeadline] = useState();
  const [completed, setCompleted] = useState();
  const [currentDate] = useState(new Date().toISOString().split("T")[0]);

  useEffect(() => {
    if (props.todo) {
      setTodoId(props.todo[0]);
      setDescription(props.todo[2]);
      setPriority(props.todo[3]);
      setDeadline(props.todo[4].split("T")[0]);
      setCompleted(props.todo[5]);
    }
  }, [props]);

  const handleClose = () => {
    props.close(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedToDo = {
      description: description,
      priority: priority,
      deadline: deadline,
      completed: completed,
    };

    props.edit(todoId, updatedToDo);
    handleClose();
  };

  return (
    <Dialog fullWidth open={props.open} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">
        <QueueIcon /> Edit To-Do
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
                InputLabelProps={{
                  shrink: true,
                }}
                id="description"
                name="description"
                label="Description"
                onChange={(e) => setDescription(e.target.value)}
              />
            </Grid>
            <Grid item>
              <FormControl variant="outlined" fullWidth>
                <InputLabel htmlFor="priority">Priority *</InputLabel>
                <Select
                  label="Priority"
                  inputProps={{
                    id: "priority",
                    name: "priority",
                  }}
                  required
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                >
                  <MenuItem value={"High"}>
                    <FiberManualRecordIcon style={{ color: "#ff3300" }} />
                    High
                  </MenuItem>
                  <MenuItem value={"Medium"}>
                    <FiberManualRecordIcon style={{ color: "#ff9933" }} />
                    Medium
                  </MenuItem>
                  <MenuItem value={"Low"}>
                    <FiberManualRecordIcon style={{ color: "#a6a6a6" }} />
                    Low
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item>
              <TextField
                id="deadline"
                name="deadline"
                type="date"
                required
                label="Deadline"
                onChange={(e) => setDeadline(e.target.value)}
                defaultValue={deadline}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  min: currentDate,
                }}
                fullWidth
              />
            </Grid>
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
          </Grid>
        </DialogContent>
        <Divider className={styles.addToDoDivider} />
        <DialogActions>
          <Button
            color="primary"
            variant="contained"
            type="submit"
            onClick={handleSubmit}
          >
            {" "}
            Save
          </Button>
          <Button
            color="primary"
            variant="outlined"
            type="reset"
            onClick={handleClose}
          >
            {" "}
            Cancel
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EditToDoModal;
