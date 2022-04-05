const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Transaction = require("../models/transaction");
const SingleTrans = require("../models/singleTrans");

var MongoClient = require('mongodb').MongoClient;
var url = "";

const list = async (req, res, next) => {
  const userId = req.userId;
  try {
    const user = await User.findById(userId);
    const transactions = await User.findById(userId).populate("transactions");
    if (!userId || !user) {
      const err = new Error("User Unauthenticated!");
      err.statusCode = 401;
      throw err;
    }
    res.status(200).json({
      message: "Transactions Fetched!",
      transactions: transactions.trans
    });
  } catch (err) {
    next(err);
  }
};

const add = async (req, res, next) => {
  const userId = req.userId;
  const transactions_type = req.body.transactions_type;
  const transactions_amount = req.body.transactions_amount;
  const transactions_category = req.body.transactions_category;
  try {
    const user = await User.findById(userId);
    if (!userId || !user) {
      const err = new Error("User Unauthenticated!");
      err.statusCode = 401;
      throw err;
    }
    const transactions = await User.findById(userId).populate("transactions");
    if(transactions) {
      const singletrans = new SingleTrans({
        type: transactions_type,
        amount: transactions_amount,
        category: transactions_category
      });
      transactions.trans = singletrans;
    } else {
      const singletrans = new SingleTrans({
        type: transactions_type,
        amount: transactions_amount,
        category: transactions_category
      });
      const transaction = new Transaction({
        ofuser: user,
        trans: [singletrans]
      });
      const savedTransaction = await transaction.save();
    }
    res.status(201).json({
      message: "Transaction Added!",
      goals_categories: goal.categories,
      goals_limits: goal.limits
    });
  } catch (err) {
    next(err);
  }
};

// TODO: FIX UPDATE!

// const update = async (req, res, next) => {
//   const userId = req.userId;
//   const transactions_id = req.body.tid;
//   const transactions_type = req.body.transactions_type;
//   const transactions_amount = req.body.transactions_amount;
//   const transactions_category = req.body.transactions_category;
//   try {
//     const user = await User.findById(userId);
//     const goal = await User.findById(userId).populate("goals");
//     if (!userId || !user) {
//       const err = new Error("User Unauthenticated!");
//       err.statusCode = 401;
//       throw err;
//     }
//     goal.categories = goals_categories;
//     goal.limits = goals_limits;
//     const savedGoal = await goal.save();
//     res.status(201).json({
//       message: "Goals Updated!",
//       goals_categories: goal.categories,
//       goals_limits: goal.limits
//     });
//   } catch (err) {
//     next(err);
//   }
// };

exports.list = list;
exports.add = add;