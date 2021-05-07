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
  Divider,
} from "@material-ui/core";
import useStyles from "./ToDo.styles";
import QueueIcon from "@material-ui/icons/Queue";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import { useState } from "react";

// TODO: error handling
const AddToDoModal = (props) => {
  const styles = useStyles();

  const [description, setDescription] = useState();
  const [priority, setPriority] = useState("");
  const [deadline, setDeadline] = useState();
  const [currentDate] = useState(new Date().toISOString().split("T")[0]);

  const clearForm = () => {
    setDescription(null);
    setPriority("");
    setDeadline(null);
  };

  const handleClose = () => {
    props.close(false);
    clearForm();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTodo = {
      description: description,
      priority: priority,
      deadline: deadline,
    };

    props.add(newTodo);
    handleClose();
  };

  return (
    <Dialog fullWidth open={props.open} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">
        <QueueIcon /> Add New To-Do
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
                  <MenuItem value="" style={{ display: "none" }}></MenuItem>
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
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  min: currentDate,
                }}
                fullWidth
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
            Add
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

export default AddToDoModal;
