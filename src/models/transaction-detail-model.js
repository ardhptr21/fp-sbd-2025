import mongoose from "mongoose";
const schema = new mongoose.Schema(
  {
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product", // reference to product-model
      required: true,
    },
    transaction: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Transaction", // reference to transaction-model
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const TransactionDetail = mongoose.model("TransactionDetail", schema);
