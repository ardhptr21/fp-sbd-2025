import { User } from "../models/user-model.js";

export const getUserByCredential = async (credential) => {
  const user = await User.findOne({
    $or: [{ username: credential }, { email: credential }],
  });
  return user;
};

export const checkIfUserExistsByCreds = async (email, username) => {
  const count = await User.countDocuments({
    $or: [{ username }, { email }],
  });
  return count > 0;
};

export const createUser = async (data) => {
  return await User.create(data);
};
