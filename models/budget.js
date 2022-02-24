const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const budgetSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
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
        name1: String,
        active1: String,
      },
      {
        custom2: Number,
        name2: String,
        active2: String,
      },
      {
        custom3: Number,
        name3: String,
        active3: String,
      },
      {
        custom4: Number,
        name4: String,
        active4: String,
      },
      {
        custom5: Number,
        name5: String,
        active5: String,
      },
    ],
  });

var Budget = mongoose.model('Budget', budgetSchema);
module.exports = Budget;
