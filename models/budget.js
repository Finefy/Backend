const mongoose = require("mongoose");
const User = require("./user");
const Category = require("./category");
const Schema = mongoose.Schema;

const budgetSchema = new Schema(
  {
    ofuser: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    budget: [{
        food: Number,
        foodactive: String,
      },
      {
        transport: Number,
        transportactive: String,
      },
      {
        savings: Number,
        savingsactive: String,
      },
      {
        housing: Number,
        housingactive: String,
      },
      {
        utilities: Number,
        utilitiesactive: String,
      },
      {
        miscellaneous: Number,
        miscellaneousactive: String,
      },
      {
        custom1: Number,
        name1: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Category"
        },
        active1: String,
      },
      {
        custom2: Number,
        name2: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Category"
        },
        active2: String,
      },
      {
        custom3: Number,
        name3: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Category"
        },
        active3: String,
      },
      {
        custom4: Number,
        name4: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Category"
        },
        active4: String,
      },
      {
        custom5: Number,
        name5: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Category"
        },
        active5: String,
      },
    ],
  });

var Budget = mongoose.model('Budget', budgetSchema);
module.exports = Budget;
