import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    full_name: {
      type: String,
      required: false,
      trim: true,
    },
    date_of_birth: {
      type: Date,
      trim: true,
    },
    address: {
      type: String,
      trim: true,
    },
    phone: {
      type: String,
      required: false,
      unique: true,
      trim: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Profile = mongoose.model("Profile", schema);
