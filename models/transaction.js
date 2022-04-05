const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const singleTransSchema = new Schema(
  {
    transType: {   //Debit or Credit
      type: String,
      required: true,
    },
    amount: {     
      type: Number,
      required: true,
    },
    category: {
      type: String,
    }, 
  });

const transactionSchema = new Schema(
  {
    ofuser: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    trans: [singleTransSchema]
  });

var Transaction = mongoose.model('Transaction', transactionSchema);
module.exports = Transaction;
