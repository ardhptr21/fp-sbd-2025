import { Product } from "../models/product-model.js";

export const createProduct = async (data) => {
  return await Product.insertOne(data);
};

export const getProducts = async () => {
  return await Product.find().sort({ createdAt: -1 }).lean();
};