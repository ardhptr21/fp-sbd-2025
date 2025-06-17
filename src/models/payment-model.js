import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    payment_proof: {
      type: String,
      required: false,
      default: null,
    },
    status: {
      type: String,
      required: true,
      enum: ["pending", "paid", "invalid", "accepted", "returned"],
      default: "pending",
    },
    transaction: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Transaction",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Payment = mongoose.model("Payment", schema);
