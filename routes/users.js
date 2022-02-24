const express = require("express");
const { body } = require("express-validator");

const isAuth = require("../middlewares/auth");
const usersController = require("../controllers/users");

const router = express.Router();

const emailValidator = body("email")
  .isEmail()
  .normalizeEmail()
  .withMessage("Invalid Email Address!");
const passwordValidator = body("password")
  .trim()
  .isLength({ min: 8 })
  .withMessage("Password has to be 8 chars or more!");
const nameValidator = body("fname")
  .trim()
  .notEmpty()
  .withMessage("First Name is required!");
const nameValidator = body("lname")
  .trim()
  .notEmpty()
  .withMessage("Last Name is required!");
const phoneNoValidator = body("phone")
  .trim()
  .notEmpty()
  .withMessage("Mobile number is required!");

// POST /users/signup
router.post(
  "/signup",
  [emailValidator, passwordValidator, nameValidator, phoneNoValidator],
  usersController.signup
);

// POST /users/login
router.post(
  "/login",
  [emailValidator, passwordValidator],
  usersController.login
);

// POST /users/logout
router.post("/logout", isAuth, usersController.logout);

// GET /users/account
router.get("/account", isAuth, usersController.getUser);

// PUT /users/account
router.put("/account", isAuth, usersController.updateUser);

// POST /users/resetToken
router.post("/resetToken", [emailValidator], usersController.getResetToken);

// POST /users/resetPassword
router.post(
  "/resetPassword",
  [passwordValidator],
  usersController.resetPassword
);

module.exports = router;