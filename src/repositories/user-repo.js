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
  return await User.insertOne(data);
};

export const getUserById = async (userId) => {
  return await User.findOne({ _id: userId }).lean();
};

export const updateUser = async (userId, data) => {
  return await User.updateOne(
    { _id: userId },
    { $set: data }
  );
};
