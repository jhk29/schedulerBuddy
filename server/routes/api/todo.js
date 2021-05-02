const express = require("express");
const router = express.Router();
const passport = require("passport");
const mongoose = require("mongoose");

const Todo = require("../../models/Todo");
const validateTodoInput = require("../../validation/todo");

// @route POST api/todo/add
// @desc Add a new todo
// @access Private
router.post(
  "/todo/add",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateTodoInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

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

// @route GET /api/todos
// @desc Get all user's todos
// @access Private
router.get(
  "/todo",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Todo.find({ userId: req.user.id })
      .populate("userId")
      .then((todos) => {
        if (!todos) {
          return res.json({ notodos: "No todo was found" });
        }

        return res.json(todo);
      })
      .catch((err) => console.log(err));
  }
);

// @route DELETE api/todo/:id
// @desc Delete a new todo
// @access Private
router.delete(
  "/todo/:id",
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
router.put(
  "/todo/:id",
  passport.authenticate("jwt", { session: flase }),
  (req, res) => {
    const updatedFields = _.pick(req.body, [
      "description",
      "completed",
      "deadline",
      "priority",
      "createdAt",
    ]);
    if (!updatedFields.description) {
      return res
        .status(400)
        .json({ description: "Description field is required." });
    }

    if (
      updatedFields.createdAt > updatedFields.deadline &&
      updatedFields.deadline !== null
    ) {
      return res
        .status(400)
        .json({ deadline: "Deadline must be after start date!" });
    }

    Todo.findOneAndUpdate(req.params.id, updatedFields)
      .then((todo) => {
        if (!todo) {
          return res.json({ noTodo: "To-do was not found." });
        }
        return res.json(todo);
      })
      .catch((err) => console.log(err));
  }
);

module.exports = router;
