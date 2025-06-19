import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      enum: ["product", "category"],
    },
    meta: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Trash = mongoose.model("Trash", schema);
