const mongoose = require('mongoose');

const filterSchema = new mongoose.Schema({
  size: String,
  finish: String,
  // Include any other properties specific to the filter object
});

const productSchema = new mongoose.Schema({
  plyid: String,
  category:  {
    type: mongoose.Schema.Types.String,
    required: true,
    ref: 'category' // Reference to another Mongoose model if needed
  },
  subcategory:  {
    type: mongoose.Schema.Types.String,
    required: true,
    ref: 'subcategory' 
  },
  group:  {
    type: mongoose.Schema.Types.String,
    required: true,
    ref: 'group' 
  },
  subgroup: {
    type: mongoose.Schema.Types.String,
    ref: 'subgroup' 
  },
  brand: {
    type: mongoose.Schema.Types.String,
    required: true,
    ref: 'brand' 
  },
  product_id: String,
  product_name: String,
  desc: {
    type: mongoose.Schema.Types.Object,
  },
  product_description: String,
  attrs: {
    imgs: {
        type: mongoose.Schema.Types.Array,
    }
  },
  filter: [filterSchema], // Array of filter objects
  price: Number,
  discounted_price: Number,
  discounted_percent: Number,
  applicability: {
    type: Number,
    min: 0,
    max: 4
  },
  plyUnit: Number,
  laborPerFloor: Number,
  loadingUnloadingPrice: Number,
  rating_and_review: [{
    name: String,
    timestamp: Date,
    rating: Number,
    review: String,
  }],
  tags: [String],
  vars: [{
    var_type: [{
      product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product' // Reference to another Mongoose model if needed
      },
      product_name: String,
      desc: {
        keys: [String],
        values: [String]
      },
      product_description: String,
      attributes: {
        var: String,
        color: String,
        images: String
      },
      filters: [filterSchema], // Array of filter objects
      laborPerFloor: Number,
      price: Number,
      discounted_price: Number,
      discounted_percent: Number
    }]
  }]
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
