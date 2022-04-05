const mongoose = require("mongoose");
const User = require("./user");
const Schema = mongoose.Schema;

const coinsSchema = new Schema(
  {
    ofuser: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    coins: {
      amount: Number,
    },
  });

var Coins = mongoose.model('Coins', coinsSchema);
module.exports = Coins;
