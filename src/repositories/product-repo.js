import { Product } from "../models/product-model.js";

export const createProduct = async (data) => {
  return await Product.insertOne(data);
};

export const getProducts = async () => {
  return await Product.find().sort({ createdAt: -1 }).populate("category").lean();
};

export const getProductsWithSearch = async (search) => {
  return await Product.find({
    $or: [
      { name: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
    ],
  })
    .sort({ createdAt: -1 })
    .populate("category")
    .lean();
};

export const getProductsByCategory = async (categoryId) => {
  return await Product.find({ category: categoryId }).sort({ createdAt: -1 }).lean();
};

export const getProductById = async (id) => {
  return await Product.findById(id).lean();
};

export const getProductByIdWithCategory = async (id) => {
  return await Product.findById(id).populate("category").lean();
};

export const updateProduct = async (id, data) => {
  return await Product.updateOne({ _id: id }, data, { runValidators: true });
};
