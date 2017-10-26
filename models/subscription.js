const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const INTEREST = require('./interest-types');
const subSchema = new Schema({
  title         : { type: String, required: true},
  description   : String,
  subImageUrl   : String,
  interest      : [{ type:String, enum: INTEREST, required: true}],
  
});

module.exports = mongoose.model('Subscription', subSchema);
