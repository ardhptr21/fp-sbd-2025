import { Category } from "../models/category-model.js";
import { Product } from "../models/product-model.js";
import { Trash } from "../models/trash-model.js";

export const addToTrash = async (type, meta) => {
  return await Trash.create({ type, meta });
};

export const getTrashItems = async () => {
  return await Trash.find().sort({ createdAt: -1 }).lean();
};

export const deleteTrash = async (id) => {
  return await Trash.findByIdAndDelete(id);
};

export const restoreTrash = async (id) => {
  const trashItem = await Trash.findById(id);
  if (!trashItem) return null;

  if (trashItem.type === "product") {
    await Product.create(trashItem.meta);
    await Trash.deleteOne({ _id: id });
    return trashItem;
  } else if (trashItem.type === "category") {
    await Category.create(trashItem.meta);
    await Trash.deleteOne({ _id: id });
    return trashItem;
  }

  return null;
};
