const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateUserUpdateInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";

  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field cannot be empty.";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required.";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid.";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
