const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const TYPES    = require('./product-types');
const TYPES2   = require('./tier-types');
const productSchema = new Schema({
  name          : { type: String, required: true},
  category      : { type: String, enum: TYPES, required: true },
  imageUrl      : String,
  description   : String,
  tier          : { type: String, enum: TYPES2, required: true},
});

module.exports = mongoose.model('Product', productSchema);
