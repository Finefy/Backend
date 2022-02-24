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
const phoneValidator = body("phone")
  .trim()
  .notEmpty()
  .withMessage("Phone number is required!");

// POST /users/signup
router.post(
  "/users/register",
  [emailValidator, passwordValidator, fnameValidator, lnameValidator, phoneValidator],
  usersController.signup
);

// POST /users/login
router.post(
  "/users/login",
  [emailValidator, passwordValidator],
  usersController.login
);

// POST /users/logout
router.post("/users/logout", isAuth, usersController.logout);

// GET /users/settings
router.get("/users/settings", isAuth, usersController.getUser);

// PUT /users/settings
router.put("/users/settings", isAuth, usersController.updateUser);

// POST /users/reset/token
router.post("/users/reset/token", [emailValidator], usersController.getResetToken);

// POST /users/reset/password
router.post(
  "/users/reset/password",
  [passwordValidator],
  usersController.resetPassword
);

// TODO: /budget/*

// router.get("/budget/list", isAuth, budgetController.list);
// router.post("/budget/add", isAuth, budgetController.add);
// router.put("/budget/update", isAuth, budgetController.update);

// TODO: /categories/*

// router.get("/categories/list", isAuth, categoriesController.list);
// router.post("/categories/add", isAuth, categoriesController.add);
// router.put("/categories/update", isAuth, categoriesController.update);

module.exports = router;