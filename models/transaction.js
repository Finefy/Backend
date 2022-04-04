const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transactionSchema = new Schema(
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
    ofuser: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
  });

var Transaction = mongoose.model('Transaction', transactionSchema);
module.exports = Transaction;
