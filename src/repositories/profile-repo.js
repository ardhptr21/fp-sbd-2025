import { Profile } from "../models/profile-model.js";

export const checkIfProfileExistsByPhone = async (phone) => {
  const count = await Profile.countDocuments({ phone });
  return count > 0;
};

export const createProfile = async (data) => {
  return await Profile.create(data);
};
