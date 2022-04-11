const mongoose = require("mongoose");
const User = require("./user");
const Schema = mongoose.Schema;

const categorySchema = new Schema(
{
  ofuser: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  name: { 
    type: String, 
    required: true 
  }
});

var Category = mongoose.model('Category', categorySchema);
module.exports = Category;
