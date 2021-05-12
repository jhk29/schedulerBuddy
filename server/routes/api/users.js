const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
const validatePasswordUpdateInput = require("../../validation/password");
const validateUserUpdateInput = require("../../validation/userUpdate");

const User = require("../../models/User");
const Todo = require("../../models/Todo");
const Event = require("../../models/Event");

// @route POST api/users/register
// @desc Register User
// @access Public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res.status(400).json({ email: "Email already exists." });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });

      bcrypt.genSalt(10, (_, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => res.json(user))
            .catch((err) => console.log(err));
        });
      });
    }
  });
});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }).then((user) => {
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found." });
    }

    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        const payload = {
          id: user.id,
          name: user.name,
          email: user.email,
        };

        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926, // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token,
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password is incorrect." });
      }
    });
  });
});

// @route POST api/users/password
// @desc Update logged in user's password
// @access Private
router.post(
  "/password",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePasswordUpdateInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const password = req.body.currentPassword;
    const newPassword = req.body.newPassword;

    User.findOne({ _id: req.user.id }).then((user) => {
      if (!user) {
        return res
          .status(404)
          .json({ usernotfound: "User could not be found." });
      }
      bcrypt.compare(password, user.password).then((isMatch) => {
        if (isMatch) {
          bcrypt.genSalt(10, (_, salt) => {
            bcrypt.hash(newPassword, salt, (err, hash) => {
              if (err) throw err;
              user.password = hash;
              user
                .save()
                .then((user) => {
                  return res.json(user);
                })
                .catch((err) => console.log(err));
            });
          });
        } else {
          return res
            .status(400)
            .json({ passwordincorrect: "Current password is incorrect." });
        }
      });
    });
  }
);

// @route POST api/users/update
// @desc Update logged in user's info
// @access Private
router.post(
  "/update",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateUserUpdateInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const name = req.body.name;
    const email = req.body.email;

    User.findOne({ _id: req.user.id }).then((user) => {
      if (!user) {
        return res
          .status(404)
          .json({ usernotfound: "User could not be found." });
      }

      user.name = name;
      user.email = email;
      user
        .save()
        .then((user) => {
          return res.json(user);
        })
        .catch((err) => console.log(err));
    });
  }
);

// @route DELETE api/users
// @desc Delete user and all associated data
// @access Private
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Todo.remove({ userId: req.user.id }).catch((err) => console.log(err));
    Event.remove({ userId: req.user.id }).catch((err) => console.log(err));
    User.remove({ _id: req.user.id })
      .then(() => res.json({ success: true }))
      .catch((err) => console.log(err));
  }
);

module.exports = router;
