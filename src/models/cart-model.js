import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    quantity: {
      type: String,
      required: true,
      unique: false,
      trim: true,
    },
    profile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profile",
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Cart = mongoose.model("Cart", schema);