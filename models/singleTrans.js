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

var SingleTrans = mongoose.model('SingleTrans', singleTransSchema);
module.exports = SingleTrans;
  