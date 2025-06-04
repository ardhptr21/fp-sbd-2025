import mongoose from "mongoose";
import { hashSync } from "bcrypt";

const schema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["customer", "admin"],
      default: "customer",
    },
  },
  {
    timestamps: true,
  }
);

schema.pre("save", function (next) {
  if (this.isModified("password") && this.password.length > 0) {
    try {
      this.password = hashSync(this.password, 10);
    } catch (error) {
      return next(error);
    }
  }

  return next();
});

export const User = mongoose.model("User", schema);
