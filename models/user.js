const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  email      : String,
  username   : String,
  password   : String,
  position   : String,
  address    : String,
  interest   : []
  });

const User = mongoose.model('User', userSchema);
module.exports = User;
