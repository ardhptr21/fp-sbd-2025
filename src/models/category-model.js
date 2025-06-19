import mongoose from "mongoose";
import { Product } from "./product-model.js";

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

schema.pre("save", function (next) {
  if (this.isModified("name") && this.name.length > 0) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }
  return next();
});

schema.pre("findOneAndDelete", async function (next) {
  const filter = this.getFilter();
  if (!filter || !filter._id) return next();
  const count = await Product.countDocuments({ category: filter._id });
  if (count > 0) {
    const error = new Error("Kategori tidak dapat dihapus karena masih memiliki produk.");
    return next(error);
  }
  return next();
});

export const Category = mongoose.model("Category", schema);
