const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//const User=require('./users');

var Category = new Schema({
    user_id: { type: Schema.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true }
  });