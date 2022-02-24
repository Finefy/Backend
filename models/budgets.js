const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const budgetSchema = new Schema(
  {
    email: {
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
    needs: {
        type: Number,
        required: true,
      },
    wants: {
        type: Number,
        required: true,
      },
    savings: {
        type: Number,
        required: true,
      },
  
  });

var Budget = mongoose.model('Budget', budgetSchema);
module.exports = Budget;
