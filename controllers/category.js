const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Category = require("../models/category");

var MongoClient = require('mongodb').MongoClient;
var url = "";

const list = async (req, res, next) => {
  const userId = req.userId;
  try {
    const user = await User.findById(userId);
    const category = await User.findById(userId).populate("category");
    if (!userId || !user) {
      const err = new Error("User Unauthenticated!");
      err.statusCode = 401;
      throw err;
    }
    res.status(200).json({
      message: "Categories Fetched!",
      name: category.name
    });
  } catch (err) {
    next(err);
  }
};

const add = async (req, res, next) => {
  const userId = req.userId;
  const name = req.body.name;
  try {
    const user = await User.findById(userId);
    if (!userId || !user) {
      const err = new Error("User Unauthenticated!");
      err.statusCode = 401;
      throw err;
    }
    const category = new Category({
      ofuser: user,
      name: name
    });
    const savedCategory = await category.save();
    res.status(201).json({
      message: "Category Added!",
      name: category.name
    });
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  const userId = req.userId;
  const name = req.body.name;
  try {
    const user = await User.findById(userId);
    const category = await User.findById(userId).populate("category");
    if (!userId || !user) {
      const err = new Error("User Unauthenticated!");
      err.statusCode = 401;
      throw err;
    }
    category.name = name;
    const savedCategory = await category.save();
    res.status(201).json({
      message: "Category Updated!",
      name: category.name
    });
  } catch (err) {
    next(err);
  }
};