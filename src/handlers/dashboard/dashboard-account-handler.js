import { compareSync, hashSync } from "bcrypt";
import { validateParse } from "../../lib/validator.js";
import { checkIfUserExistsByCreds, getUserById, updateUser } from "../../repositories/user-repo.js";
import {
  accountUpdateValidator,
  passwordUpdateValidator,
} from "../../validators/account-validator.js";

/**
 * @type {import('express').Handler}
 */
export const dashboardAccount = async (req, res) => {
  const account = await getUserById(req.session.user._id);
  return res.render("pages/dashboard/account", { user: account });
};

/**
 * @type {import('express').Handler}
 */
export const dashboardAccountUpdateInfo = async (req, res) => {
  const { user } = req.session;
  const referer = req.get("referer");

  const parsed = validateParse(accountUpdateValidator, req.body);
  if (!parsed.success) {
    req.session.form_errors = parsed.errors;
    req.session.flash = {
      alert: { type: "error", message: "Data yang dimasukkan tidak valid", state: "update-info" },
    };
    return res.redirect(referer);
  }

  const { username, email } = parsed.data;

  try {
    const currentUser = await getUserById(user._id);
    if (!currentUser) {
      req.session.flash = {
        alert: { type: "error", message: "Profil tidak ditemukan.", state: "update-info" },
      };
      return res.redirect(referer);
    }

    if (currentUser.username !== username) {
      const isUsernameUsed = await checkIfUserExistsByCreds(username);
      if (isUsernameUsed) {
        req.session.flash = {
          alert: {
            type: "error",
            message: "Username sudah digunakan oleh akun lain.",
            state: "update-info",
          },
        };
        return res.redirect(referer);
      }
    }

    if (currentUser.email !== email) {
      const isEmailUsed = await checkIfUserExistsByCreds(email);
      if (isEmailUsed) {
        req.session.flash = {
          alert: {
            type: "error",
            message: "Email sudah digunakan oleh akun lain.",
            state: "update-info",
          },
        };
        return res.redirect(referer);
      }
    }

    await updateUser(user._id, { username, email });

    req.session.flash = {
      alert: { type: "success", message: "Akun berhasil diperbarui.", state: "update-info" },
    };
    return res.redirect(referer);
  } catch (err) {
    req.session.flash = {
      alert: {
        type: "error",
        message: "Terjadi kesalahan saat memperbarui akun.",
        state: "update-info",
      },
    };
    return res.redirect(referer);
  }
};

/**
 * @type {import('express').Handler}
 */
export const dashboardAccountUpdatePassword = async (req, res) => {
  const { user } = req.session;
  const referer = req.get("referer");

  const parsed = validateParse(passwordUpdateValidator, req.body);
  if (!parsed.success) {
    req.session.form_errors = parsed.errors;
    req.session.flash = {
      alert: {
        type: "error",
        message: "Data yang dimasukkan tidak valid",
        state: "update-password",
      },
    };
    return res.redirect(referer);
  }

  const { old_password, new_password } = parsed.data;

  try {
    const currentUser = await getUserById(user._id);
    if (!currentUser) {
      req.session.flash = {
        alert: { type: "error", message: "Akun tidak ditemukan.", state: "update-password" },
      };
      return res.redirect(referer);
    }

    const isValidPassword = compareSync(old_password, user.password);
    if (!isValidPassword) {
      return res.render("/dasboard/account", {
        alert: { type: "error", message: "Password lama salah", state: "update-password" },
      });
    }

    const hashedPassword = hashSync(new_password, 10);
    await updateUser(user._id, { password: hashedPassword });

    req.session.flash = {
      alert: {
        type: "success",
        message: "Password berhasil diperbarui.",
        state: "update-password",
      },
    };

    req.session.destroy();
    return res.redirect(referer);
  } catch (err) {
    req.session.flash = {
      alert: {
        type: "error",
        message: "Terjadi kesalahan saat memperbarui password.",
        state: "update-password",
      },
    };
    return res.redirect("/auth/login");
  }
};
