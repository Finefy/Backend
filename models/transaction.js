const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transactionSchema = new Schema(
  {
    ofuser: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    trans: [{
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
    }]
  });

var Transaction = mongoose.model('Transaction', transactionSchema);
module.exports = Transaction;
