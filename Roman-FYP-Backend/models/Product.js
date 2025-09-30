const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    model: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      min: 0,
    },
    specification: {
      type: String, 
    },
    category: {
      type: String,
      trim: true,
    },
    brand: {
      type: String,
      trim: true,
    },
    instock: {
      type: Number,
      min: 0,
      default: 0,
    },
    description: {
      type: String,
      maxlength: 2000,
    },
    memory: {
      type: String,
    },
    productImage: {
      type: String, // multer will save file path or URL here
    },
    type: {
      type: String,
    },              // laptop, desktop, server, tablet, phone
  },
  {
    timestamps: true, // adds createdAt & updatedAt
  }
);

module.exports = mongoose.model("Product", productSchema);
