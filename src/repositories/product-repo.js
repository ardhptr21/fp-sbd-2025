import { Product } from "../models/product-model.js";

export const createProduct = async (data) => {
  return await Product.insertOne(data);
};

export const getProducts = async () => {
  return await Product.find().sort({ createdAt: -1 }).populate("category").lean();
};

export const getProductsWithSearch = async (search, filter) => {
  const query = Product.find({
    $or: [
      { name: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
    ],
  }).populate("category");

  if (filter.minPrice || filter.maxPrice) {
    query.where("price").gte(filter.minPrice || 0);
    if (filter.maxPrice > 0) query.lte(filter.maxPrice);
  }

  /**
   * Sort by:
   * 0 - default (newest first by createdAt)
   * 1 - oldest first by createdAt
   * 2 - price low to high
   * 3 - price high to low
   */
  switch (filter.sortBy) {
    case 1:
      query.sort({ createdAt: 1 });
      break;
    case 2:
      query.sort({ price: 1 });
      break;
    case 3:
      query.sort({ price: -1 });
      break;
    default:
      query.sort({ createdAt: -1 });
      break;
  }
  return await query.lean();
};

export const getProductsByCategory = async (categoryId, filter) => {
  const query = Product.find({ category: categoryId });
  if (filter.minPrice || filter.maxPrice) {
    query.where("price").gte(filter.minPrice || 0);
    if (filter.maxPrice > 0) query.lte(filter.maxPrice);
  }

  /**
   * Sort by:
   * 0 - default (newest first by createdAt)
   * 1 - oldest first by createdAt
   * 2 - price low to high
   * 3 - price high to low
   */
  switch (filter.sortBy) {
    case 1:
      query.sort({ createdAt: 1 });
      break;
    case 2:
      query.sort({ price: 1 });
      break;
    case 3:
      query.sort({ price: -1 });
      break;
    default:
      query.sort({ createdAt: -1 });
      break;
  }
  return await query.lean();
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
