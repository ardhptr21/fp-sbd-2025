import mongoose from "mongoose";

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
    },
    stock: {
        type: Number,
        required: true,
    },
    image: {
        type: String, // if image is url
        required: true,
    },
    is_active: {
        type: Boolean,
        required: true,
        default: true,
    },

     category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",  // reference to categoory-model
      required: true,
    },

  },
  {
    timestamps: true,
  }
);

export const Product = mongoose.model("Product", schema);