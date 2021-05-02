const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateToDoInput(data) {
  let errors = {};

  data.description = !isEmpty(data.description) ? data.description : "";
  data.deadline = !isEmpty(data.deadline) ? data.deadline : "";
  data.priority = !isEmpty(data.priority) ? data.priority : "";

  if (Validator.isEmpty(data.description)) {
    errors.description = "To-do description is required.";
  }

  if (Validator.isEmpty(data.deadline)) {
    errors.deadline = "To-do deadline is required.";
  }

  if (Validator.isEmpty(data.priority)) {
    errors.priority = "To-do priority is required.";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
