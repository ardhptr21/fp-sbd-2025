import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    transaction_date: {
      type: Date,
      required: true,
    },
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

export const Transaction = mongoose.model("Transaction", schema);
