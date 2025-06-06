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
    },
    status: {
      type: String,
      required: true,
      enum: ["pending", "completed", "cancelled"],
      default: "pending",
    },
    profile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profile", // reference to profile-model
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Transaction = mongoose.model("Transaction", schema);
