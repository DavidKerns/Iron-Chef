const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  email      : String,
  username   : String,
  password   : String,
  position   : String,
  address    : String,
  interest   : [],
  subscriptions: {
    nextOrder  : {type: {}, defaul: {}},
    pending    : [Schema.Types.ObjectId],
    prevOrder  : [Schema.Types.ObjectId]
  }
  });

const User = mongoose.model('User', userSchema);
module.exports = User;
