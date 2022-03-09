const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Budget = require("../models/budget");

const list = async (req, res, next) => {
    const email = req.email;
  
    try {
      const budget = await Budget.findOne({ email: email })
  
      if (!email) {
        const err = new Error("User not found!");
        err.statusCode = 401;
        throw err;
      }
  
      res.status(200).json({
        message: "Budget Fetched!",
        email: budget.email,
        budget:budget.budget
      });
    } catch (err) {
      next(err);
    }
  };
/*
  const add = async (req, res, next) => {
    const email = req.email;
  
    try {
      const budget = await Budget.findOne({ email: email })
  
      if (!email) {
        const err = new Error("User not found!");
        err.statusCode = 401;
        throw err;
      }
  
      res.status(200).json({
        message: "Added!",
        email: budget.email,
        budget:budget.budget
      });
    } catch (err) {
      next(err);
    }
  };
  // router.post("/budget/add", isAuth, budgetController.add);
// router.put("/budget/update", isAuth, budgetController.update);
*/