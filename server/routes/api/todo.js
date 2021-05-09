const express = require("express");
const router = express.Router();
const passport = require("passport");
const moment = require("moment");
const Todo = require("../../models/Todo");

// @route POST api/todo/add
// @desc Add a new todo
// @access Private
router.post(
  "/add",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const newTodo = new Todo({
      userId: req.user.id,
      description: req.body.description,
      deadline: req.body.deadline,
      priority: req.body.priority,
    });

    newTodo
      .save()
      .then((todo) => res.json(todo))
      .catch((err) => console.log(err));
  }
);

// @route GET /api/todo
// @desc Get all user's todos
// @access Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Todo.find({ userId: req.user.id })
      .populate("userId")
      .then((todos) => {
        if (!todos) {
          return res.json({ notodos: "No todo was found" });
        }

        return res.json(todos);
      })
      .catch((err) => console.log(err));
  }
);

// @route GET /api/todo/due
// @desc Get all user's todos due on the current date.
// @access Private
router.get(
  "/due",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Todo.find({ userId: req.user.id })
      .then((todos) => {
        if (!todos) {
          return res.json({ notodos: "No todos are due today" });
        }
        const today = moment().startOf("day").toISOString().substring(0, 10);
        const filteredTodos = todos.filter((todo) => {
          return todo.deadline.toISOString().substring(0, 10) === today;
        });
        return res.json(filteredTodos);
      })
      .catch((err) => console.log(err));
  }
);

// @route DELETE api/todo/:id
// @desc Delete a new todo
// @access Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Todo.findById(req.params.id).then((todo) => {
      todo.remove().then(() => res.json({ success: true }));
    });
  }
);

// @route PUT api/todo/:id
// @desc Update an existing todo
// @access Private
router.post(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (!req.body.description) {
      return res
        .status(400)
        .json({ description: "Description field is required." });
    }

    if (req.body.createdAt > req.body.deadline && req.body.deadline !== null) {
      return res
        .status(400)
        .json({ deadline: "Deadline must be after start date!" });
    }
    Todo.findById(req.params.id, (_, todo) => {
      if (!todo) {
        return res.json({ noTodo: "To-do was not found." });
      } else {
        todo.description = req.body.description;
        todo.priority = req.body.priority;
        todo.deadline = req.body.deadline;
        todo.completed = req.body.completed;

        todo
          .save()
          .then((todo) => {
            return res.json(todo);
          })
          .catch((err) => console.log(err));
      }
    });
  }
);

module.exports = router;
