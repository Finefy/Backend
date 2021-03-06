const mongoose = require("mongoose");
const User = require("./user");
const Category = require("./category");
const Schema = mongoose.Schema;

const goalSchema = new Schema(
{
  ofuser: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  categories: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  }],
  limits: [{
    upper: Number,
    lower: Number
  }]
});

var Goal = mongoose.model('Goal', goalSchema);
module.exports = Goal;
