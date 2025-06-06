import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    payment_method: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      required: true,
      trim: true,
    },
    payment_date: {
      type: Date,
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

export const Payment = mongoose.model("Payment", schema);