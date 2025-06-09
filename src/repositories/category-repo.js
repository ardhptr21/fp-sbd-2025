import { Category } from "../models/category-model.js";

export const createCategory = async (data) => {
  return await Category.insertOne(data);
};

export const getCategories = async () => {
  return await Category.find().sort({ createdAt: -1 }).lean();
};

export const getCategoryBySlug = async (slug) => {
  return await Category.findOne({ slug }).lean();
};

export const checkCategoryExists = async (slug) => {
  const count = await Category.countDocuments({ slug });
  return count > 0;
};

export const updateCategory = async (slug, data) => {
  return await Category.updateOne({ slug }, data, { runValidators: true });
};
