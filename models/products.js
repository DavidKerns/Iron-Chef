const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const TYPES    = require('./product-types');
const productSchema = new Schema({
  name          : { type: String, required: true},
  category      : { type: String, enum: TYPES, required: true },
  imageUrl      : String,
  description   : String,
  tier          : { type: String, enum: ["One Star", "Two Star", "Three Star"], required: true},
});

module.exports = mongoose.model('Product', productSchema);
