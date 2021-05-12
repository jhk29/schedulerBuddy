const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validatePasswordUpdateInput(data) {
  let errors = {};

  data.currentPassword = !isEmpty(data.currentPassword)
    ? data.currentPassword
    : "";
  data.newPassword = !isEmpty(data.newPassword) ? data.newPassword : "";
  data.confirmPassword = !isEmpty(data.confirmPassword)
    ? data.confirmPassword
    : "";

  if (Validator.isEmpty(data.currentPassword)) {
    errors.currentPassword = "Current password field is required.";
  }

  if (Validator.isEmpty(data.newPassword)) {
    errors.newPassword = "New password field is required.";
  }

  if (Validator.isEmpty(data.confirmPassword)) {
    errors.confirmPassword = "Confirmation password field is required.";
  }

  if (!Validator.isLength(data.newPassword, { min: 6, max: 30 })) {
    errors.newPassword = "Password must be at least 6 characters long.";
  }

  if (!Validator.equals(data.newPassword, data.confirmPassword)) {
    errors.confirmPassword = "New and confirmation passwords must match.";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
