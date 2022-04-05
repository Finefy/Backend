const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

var MongoClient = require('mongodb').MongoClient;
var url = "";

const list = async (req, res, next) => {
  const userId = req.userId;
  try {
    const user = await User.findById(userId);
    const coin = await User.findById(userId).populate("coins");
    if (!userId || !user) {
      const err = new Error("User Unauthenticated!");
      err.statusCode = 401;
      throw err;
    }
    res.status(200).json({
      message: "Coins Fetched!",
      coins: coin.coins,
    });
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  const userId = req.userId;
  const coins = req.body.coins;
  try {
    const user = await User.findById(userId);
    const coin = await User.findById(userId).populate("coins");
    if (!userId || !user) {
      const err = new Error("User Unauthenticated!");
      err.statusCode = 401;
      throw err;
    }
    coin.coins = coins;
    const savedCoin = await coin.save();
    res.status(201).json({
      message: "Coins Updated!",
      coins: savedCoin.coins,
    });
  } catch (err) {
    next(err);
  }
};

exports.list = list;
exports.update = update;