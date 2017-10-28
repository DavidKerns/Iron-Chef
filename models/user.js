const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const Subscription = require('./subscription');
const userSchema = new Schema({
  email      : String,
  username   : String,
  password   : String,
  position   : String,
  address    : String,
  interest   : [],
  nextOrder  : { type: Schema.Types.ObjectId, ref: "Subscription"},
  pendingSubscriptions    : [ {type: Schema.Types.ObjectId, ref: "Subscription"} ]
  });

const User = mongoose.model('User', userSchema);
module.exports = User;
