import { validateParse } from "../../lib/validator.js";
import {
  checkIfProfileExistsByPhone,
  getProfileByUser,
  updateProfileByUser,
} from "../../repositories/profile-repo.js";
import { profileUpdateValidator } from "../../validators/profile-validator.js";

/**
 * @type {import('express').Handler}
 */
export const dashboardProfile = async (req, res) => {
  const profile = await getProfileByUser(req.session.user._id);
  return res.render("pages/dashboard/profile", { profile });
};

/**
 * @type {import('express').Handler}
 */
export const dashboardProfileUpdate = async (req, res) => {
  const { user } = req.session;
  const referer = req.get("referer") || "/dashboard/profile";

  const parsed = validateParse(profileUpdateValidator, req.body);
  if (!parsed.success) {
    req.session.form_errors = parsed.errors;
    req.session.flash = {
      alert: { type: "error", message: "Data yang dimasukkan tidak valid" },
    };
    return res.redirect(referer);
  }

  const { full_name, date_of_birth, address, phone, gender } = parsed.data;

  try {
    const currentProfile = await getProfileByUser(user._id);
    if (!currentProfile) {
      req.session.flash = {
        alert: { type: "error", message: "Profil tidak ditemukan." },
      };
      return res.redirect(referer);
    }

    if (currentProfile.phone !== phone) {
      const isUsed = await checkIfProfileExistsByPhone(phone);
      if (isUsed) {
        req.session.flash = {
          alert: { type: "error", message: "Nomor telepon sudah digunakan oleh akun lain." },
        };
        return res.redirect(referer);
      }
    }

    await updateProfileByUser(user._id, {
      full_name,
      date_of_birth,
      address,
      phone,
      gender,
    });

    req.session.flash = {
      alert: { type: "success", message: "Profile berhasil diperbaruhi." },
    };
    return res.redirect(referer);
  } catch (err) {
    req.session.flash = {
      alert: { type: "error", message: "Terjadi kesalahan saat memperbaruhi profil." },
    };
    return res.redirect(referer);
  }
};
