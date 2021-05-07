import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getTodos,
  addTodo,
  updateTodo,
  setCompleted,
  deleteTodo,
} from "../../../actions/todoActions";
import {
  Tooltip,
  IconButton,
  Checkbox,
  Typography,
  Chip,
  LinearProgress,
} from "@material-ui/core";

import AddIcon from "@material-ui/icons/Add";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import MUIDataTable from "mui-datatables";
import useStyles from "./ToDo.styles";
import AddToDoModal from "./AddToDoModal";
import EditToDoModal from "./EditToDoModal";

const ToDo = (props) => {
  const styles = useStyles();
  const didMountRef = useRef(false);
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState();

  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
      props.getTodos();
    }
  }, [props]);

  const handleAdd = (newToDo) => {
    props.addTodo(newToDo);
  };

  const handleEdit = (todoId, updatedToDo) => {
    props.updateTodo(todoId, updatedToDo);
  };

  const handleDelete = (todoId) => {
    if (window.confirm("Are you sure you want to delete this to-do?")) {
      props.deleteTodo(todoId);
    }
  };

  const handleSetComplete = (toUpdate, completedValue) => {
    let id = toUpdate[0];
    let updatedToDo = {
      description: toUpdate[2],
      priority: toUpdate[3],
      deadline: toUpdate[4],
      completed: completedValue,
    };
    props.setCompleted(id, updatedToDo);
  };

  const columns = [
    {
      name: "_id",
      options: {
        filter: false,
        sort: false,
        display: "excluded",
        download: false,
      },
    },
    {
      name: "actions",
      label: "Actions",
      options: {
        sort: false,
        filter: false,
        empty: true,
        download: false,
        customBodyRender: (_, tableMeta) => {
          return (
            <>
              <Tooltip title={"Edit To-Do"}>
                <IconButton
                  onClick={() => {
                    setEditingTodo(tableMeta.rowData);
                    setIsEditFormOpen(true);
                  }}
                >
                  <EditOutlinedIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title={"Delete To-Do"}>
                <IconButton
                  onClick={() => {
                    handleDelete(tableMeta.rowData[0]);
                  }}
                >
                  <DeleteOutlineIcon />
                </IconButton>
              </Tooltip>
            </>
          );
        },
      },
    },
    {
      name: "description",
      label: "Description",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "priority",
      label: "Priority",
      options: {
        filter: true,
        sort: true,
        filterOptions: {
          names: ["Low", "Medium", "High"],
        },
        customBodyRender: (value) => {
          let chipColor = "";
          switch (value) {
            case "High":
              chipColor = "#ff3300";
              break;
            case "Medium":
              chipColor = "#ff9933";
              break;
            case "Low":
              chipColor = "#a6a6a6";
              break;
            default:
              break;
          }
          return (
            <Chip
              style={{ backgroundColor: chipColor, color: "white" }}
              label={value}
            />
          );
        },
      },
    },
    {
      name: "deadline",
      label: "Deadline",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value) => (
          <Typography>{value.split("T")[0]}</Typography>
        ),
      },
    },
    {
      name: "completed",
      label: "Completed?",
      options: {
        filter: false,
        sort: true,
        customBodyRender: (value, tableMeta) => (
          <Checkbox
            color="primary"
            onChange={() => {
              handleSetComplete(tableMeta.rowData, !value);
            }}
            checked={value}
          />
        ),
      },
    },
  ];

  const options = {
    search: false,
    download: true,
    print: false,
    viewColumns: true,
    filterType: "multiselect",
    responsive: "simple",
    tableBodyHeight: "40rem",
    selectableRows: "none",
    sortOrder: {
      name: "deadline",
      direction: "asc",
    },
    customToolbar: () => {
      return <CustomToolbar />;
    },
  };

  const CustomToolbar = () => {
    const handleAddClick = () => {
      setIsAddFormOpen(true);
    };

    return (
      <Tooltip title={"Add To-Do"}>
        <IconButton onClick={handleAddClick}>
          <AddIcon />
        </IconButton>
      </Tooltip>
    );
  };

  return (
    <>
      ``{" "}
      {props.todo.loading ? (
        <LinearProgress color="secondary" />
      ) : (
        <>
          <MUIDataTable
            className={styles.todoTable}
            title={"To-Dos"}
            data={props.todo.todos}
            columns={columns}
            options={options}
          />
          <AddToDoModal
            open={isAddFormOpen}
            close={setIsAddFormOpen}
            add={handleAdd}
          />
          <EditToDoModal
            open={isEditFormOpen}
            close={setIsEditFormOpen}
            edit={handleEdit}
            todo={editingTodo}
          />
        </>
      )}
    </>
  );
};

ToDo.propTypes = {
  addTodo: PropTypes.func.isRequired,
  getTodos: PropTypes.func.isRequired,
  updateTodo: PropTypes.func.isRequired,
  setCompleted: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  todo: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  todo: state.todo,
});

export default connect(mapStateToProps, {
  getTodos,
  addTodo,
  updateTodo,
  setCompleted,
  deleteTodo,
})(ToDo);
