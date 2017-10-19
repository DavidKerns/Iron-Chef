const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const TYPES    = require('./product-types');
const INTEREST = require('./interest-types');
const productSchema = new Schema({
  name          : { type: String, required: true},
  category      : { type: String, enum: TYPES, required: true },
  imageUrl      : String,
  description   : String,
  interest      : [{ type: String, enum: INTEREST , required: true}]
});

module.exports = mongoose.model('Product', productSchema);
