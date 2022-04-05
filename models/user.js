const mongoose = require("mongoose");
const Transaction = require("./transaction");
const Budget = require("./budget");
const Category = require("./category");
const Coins = require("./coins");
const Goal = require("./goal");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    fname: {
      type: String,
      required: true,
    },
    lname: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    coins: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Coins"
    },
    transactions: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Transaction"
    }],
    budget: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Budget",
    },
    customcategories: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    }],
    goals: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Goal",
    }]
  });

var User = mongoose.model('User', userSchema);
module.exports = User;
