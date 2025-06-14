import { Profile } from "../models/profile-model.js";

export const checkIfProfileExistsByPhone = async (phone) => {
  const count = await Profile.countDocuments({ phone });
  return count > 0;
};

export const createProfile = async (data) => {
  return await Profile.insertOne(data);
};

export const getProfileByUser = async (userId) => {
  return await Profile.findOne({ user: userId }).lean();
};

export const updateProfileByUser = async (userId, data) => {
  return await Profile.updateOne(
    { user: userId },
    { $set: data }
  );
};
