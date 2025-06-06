import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    full_name: {
      type: String,
      required: true,
      unique: false,
      trim: true,
    },
    birthday: {
      type: Date,
      required: true,
      unique: false,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      unique: false,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
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

export const Profile = mongoose.model("Profile", schema);
