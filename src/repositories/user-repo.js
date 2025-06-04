import { User } from "../models/user-model.js";

export const getUserByCredential = async (credential) => {
  const user = await User.findOne({
    $or: [{ username: credential }, { email: credential }],
  });
  return user;
};
