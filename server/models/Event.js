const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  start: {
    type: String,
    required: true,
  },
  end: {
    type: String,
  },
  allDay: {
    type: Boolean,
    default: false,
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Event = mongoose.model("event", EventSchema);
