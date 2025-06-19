import { Category } from "../models/category-model.js";
import { addToTrash } from "./trash-repo.js";

export const createCategory = async (data) => {
  return await Category.insertOne(data);
};

export const isCategoryExistById = async (id) => {
  const count = await Category.countDocuments({ _id: id });
  return count > 0;
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

export const getCategoriesForSelect = async () => {
  return await Category.find().sort({ name: 1 }).select("name slug").lean();
};

export const deleteCategory = async (id) => {
  const category = await Category.findOneAndDelete({ _id: id });
  await addToTrash("category", category);
  return category;
};
