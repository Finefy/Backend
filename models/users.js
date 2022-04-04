const mongoose = require("mongoose");
const Transaction = require("./transaction");
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
    transactions: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Transaction"
    }]
  });

var User = mongoose.model('User', userSchema);
module.exports = User;
