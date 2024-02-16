import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  productNumber: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: String,
    default: new Date().toISOString(),
  },
  updatedAt: String,
});

const Product = mongoose.model("Product", productSchema);

export default Product;
