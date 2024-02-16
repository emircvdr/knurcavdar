import Product from "../models/product.js";

export const createProduct = async (req, res) => {
  const product = req.body;
  const newProduct = new Product(product);
  try {
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(409).json({
      message: "Product already exists",
      error,
    });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(404).json({
      message: "Products not found",
      error,
    });
  }
};

export const getProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findOne({ productNumber: id });
    res.status(200).json(product);
  } catch (error) {
    res.status(404).json({
      message: "Product not found",
      error,
    });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const product = req.body;
  try {
    const updatedProduct = await Product.findOneAndUpdate(
      { productNumber: id },
      product,
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(404).json({
      message: "Product not found",
      error,
    });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await Product.findOneAndDelete({ productNumber: id });
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(404).json({
      message: "Product not found",
      error,
    });
  }
};
