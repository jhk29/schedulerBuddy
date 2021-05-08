const express = require("express");
const router = express.Router();
const passport = require("passport");

const Event = require("../../models/Event");

// @route POST api/event/add
// @desc Add a new event
// @access Private
router.post(
  "/add",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const newEvent = new Event({
      userId: req.user.id,
      title: req.body.title,
      description: req.body.description,
      start: req.body.start,
      end: req.body.end,
      allDay: req.body.allDay,
    });

    if (newEvent.allDay) {
      newEvent.end = "";
    }

    newEvent
      .save()
      .then((event) => res.json(event))
      .catch((err) => console.log(err));
  }
);

// @route GET /api/event
// @desc Get all user's events
// @access Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Event.find({ userId: req.user.id })
      .populate("userId")
      .then((events) => {
        if (!events) {
          return res.json({ noevents: "No event was found" });
        }

        return res.json(events);
      })
      .catch((err) => console.log(err));
  }
);

// @route DELETE api/event/:id
// @desc Delete a new event
// @access Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Event.findById(req.params.id).then((event) => {
      event.remove().then(() => res.json({ success: true }));
    });
  }
);

// @route PUT api/event/:id
// @desc Update an existing event
// @access Private
router.post(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (!req.body.title) {
      return res.status(400).json({ description: "Title field is required." });
    }

    if (req.body.end && req.body.start >= req.body.end) {
      return res
        .status(400)
        .json({ date: "End date must be after start date." });
    }

    Event.findById(req.params.id, (_, event) => {
      if (!event) {
        return res.json({ noEvent: "Event was not found." });
      } else {
        event.title = req.body.title;
        event.description = req.body.description;
        event.start = req.body.start;
        event.allDay = req.body.allDay;
        if (event.allDay) {
          event.end = "";
        }

        event
          .save()
          .then((event) => {
            return res.json(event);
          })
          .catch((err) => console.log(err));
      }
    });
  }
);

module.exports = router;
