// src/validations/authValidation.js

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateRegister = (data) => {
  const errors = {};

  if (!data.firstName.trim()) {
    errors.firstName = "First name is required";
  }

  if (!data.lastName.trim()) {
    errors.lastName = "Last name is required";
  }

  if (!emailRegex.test(data.email)) {
    errors.email = "Enter a valid email address";
  }

  if (!data.phone.trim()) {
    errors.phone = "Contact number is required";
  } else if (!/^\d{10}$/.test(data.phone)) {
    errors.phone = "Contact number must be 10 digits";
  }

  if (!data.password) {
    errors.password = "Password is required";
  } else if (data.password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }

  if (data.confirmPassword !== data.password) {
    errors.confirmPassword = "Passwords do not match";
  }

  return errors;
};

export const validateLogin = (data) => {
  const errors = {};

  if (!emailRegex.test(data.email)) {
    errors.email = "Enter a valid email";
  }

  if (!data.password) {
    errors.password = "Password is required";
  }

  return errors;
};
