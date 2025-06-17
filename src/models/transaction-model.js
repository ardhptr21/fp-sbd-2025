import mongoose from "mongoose";
import { Payment } from "./payment-model.js";

const schema = new mongoose.Schema(
  {
    total_price: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      required: true,
      enum: ["pending", "completed", "cancelled"],
      default: "pending",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

schema.virtual("orders", {
  ref: "Order",
  localField: "_id",
  foreignField: "transaction",
});

schema.virtual("payment", {
  ref: "Payment",
  localField: "_id",
  foreignField: "transaction",
  justOne: true,
});

export const Transaction = mongoose.model("Transaction", schema);
