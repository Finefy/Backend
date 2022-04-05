const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Goal = require("../models/goal");

var MongoClient = require('mongodb').MongoClient;
var url = "";

const list = async (req, res, next) => {
  const userId = req.userId;
  try {
    const user = await User.findById(userId);
    const goal = await User.findById(userId).populate("goals");
    if (!userId || !user) {
      const err = new Error("User Unauthenticated!");
      err.statusCode = 401;
      throw err;
    }
    res.status(200).json({
      message: "Goals Fetched!",
      goals_categories: goal.categories,
      goals_limits: goal.limits
    });
  } catch (err) {
    next(err);
  }
};

const add = async (req, res, next) => {
  const userId = req.userId;
  const goals_categories = req.body.goals_categories;
  const goals_limits = req.body.goals_limits;
  try {
    const user = await User.findById(userId);
    if (!userId || !user) {
      const err = new Error("User Unauthenticated!");
      err.statusCode = 401;
      throw err;
    }
    const goal = new Goal({
      ofuser: user,
      categories: goals_categories,
      limits: goals_limits
    });
    const savedGoal = await goal.save();
    res.status(201).json({
      message: "Goals Added!",
      goals_categories: goal.categories,
      goals_limits: goal.limits
    });
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  const userId = req.userId;
  const goals_categories = req.body.goals_categories;
  const goals_limits = req.body.goals_limits;
  try {
    const user = await User.findById(userId);
    const goal = await User.findById(userId).populate("goals");
    if (!userId || !user) {
      const err = new Error("User Unauthenticated!");
      err.statusCode = 401;
      throw err;
    }
    goal.categories = goals_categories;
    goal.limits = goals_limits;
    const savedGoal = await goal.save();
    res.status(201).json({
      message: "Goals Updated!",
      goals_categories: goal.categories,
      goals_limits: goal.limits
    });
  } catch (err) {
    next(err);
  }
};