// TODO: implement payment model
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
    }
  },
  {
    timestamps: true,
  }
);

export const Payment = mongoose.model("Payment", schema);