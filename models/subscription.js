const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const subSchema = new Schema({
  title         : { type: String, required: true},
  description   : String,
  tier          : { type: String, enum: ["One Star", "Two Star", "Three Star"], required:true},
});

module.exports = mongoose.model('Subscription', subSchema);
