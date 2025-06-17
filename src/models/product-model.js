import mongoose from "mongoose";
import { Order } from "./order-model.js";
import { Cart } from "./cart-model.js";

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
    },
    image: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

schema.pre("deleteOne", async function (next) {
  const filter = this.getFilter();
  if (!filter || !filter._id) return next();
  const count = await Order.countDocuments({ product: filter._id });
  if (count > 0) {
    const error = new Error("Produk tidak dapat dihapus karena masih memiliki pesanan.");
    return next(error);
  }
  await Cart.deleteMany({ product: filter._id });
  return next();
});

export const Product = mongoose.model("Product", schema);
