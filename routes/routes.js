const express = require("express");
const { body } = require("express-validator");

const isAuth = require("../middlewares/auth");
const budgetController = require("../controllers/budget");
const categoriesController = require("../controllers/category");
const coinsController = require("../controllers/coins");
const goalsController = require("../controllers/goal");
const transactionsController = require("../controllers/transaction");
const usersController = require("../controllers/user");
const router = express.Router();

const emailValidator = body("email")
  .isEmail()
  .normalizeEmail()
  .withMessage("Invalid Email Address!");
const passwordValidator = body("password")
  .trim()
  .isLength({ min: 8 })
  .withMessage("Password has to be 8 chars or more!");
const fnameValidator = body("fname")
  .trim()
  .notEmpty()
  .withMessage("First Name is required!");
const lnameValidator = body("lname")
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
  usersController.register
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

// GET /budget/list

router.get("/budget/list", isAuth, budgetController.list);

// POST /budget/add

router.post("/budget/add", isAuth, budgetController.add);

// PUT /budget/update

router.put("/budget/update", isAuth, budgetController.update);

// GET /categories/list

router.get("/categories/list", isAuth, categoriesController.list);

// POST /categories/add

router.post("/categories/add", isAuth, categoriesController.add);

// PUT /categories/update

router.put("/categories/update", isAuth, categoriesController.update);

// GET /coins

router.get("/coins", isAuth, coinsController.list);

// PUT /coins/update

router.put("/coins/update", isAuth, coinsController.update);

// GET /transactions/list

router.get("/transactions/list", isAuth, transactionsController.list);

// POST /transactions/add

router.post("/transactions/add", isAuth, transactionsController.add);

// PUT /transactions/update

router.put("/transactions/update", isAuth, transactionsController.update);

// GET /goals/list

router.get("/goals/list", isAuth, goalsController.list);

// POST /goals/add

router.post("/goals/add", isAuth, goalsController.add);

// PUT /goals/update

router.put("/goals/update", isAuth, goalsController.update);

module.exports = router;