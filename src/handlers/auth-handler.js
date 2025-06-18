import { compareSync } from "bcrypt";
import express from "express";
import { generateUsernameFromEmail } from "../lib/utils.js";
import { validateParse } from "../lib/validator.js";
import { checkIfProfileExistsByPhone, createProfile } from "../repositories/profile-repo.js";
import {
  checkIfUserExistsByCreds,
  createUser,
  getUserByCredential,
} from "../repositories/user-repo.js";
import { loginValidator, registerValidator } from "../validators/auth-validator.js";

/**
 * @type {express.Handler}
 */
export const loginHandler = (req, res) => {
  return res.render("pages/auth/login");
};

/**
 * @type {express.Handler}
 */
export const registerHandler = (req, res) => {
  return res.render("pages/auth/register");
};

/**
 * @type {express.Handler}
 */
export const logoutHandler = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send("Internal Server Error");
    }
    return res.redirect("/");
  });
};

/**
 * @type {express.Handler}
 */
export const registeringHandler = async (req, res) => {
  const body = req.body;
  const result = validateParse(registerValidator, body);
  if (!result.success) {
    req.session.form_errors = result.errors;
    req.session.flash = {
      alert: { type: "error", message: "Data yang dimasukkan tidak valid" },
    };
    return res.redirect("/auth/register");
  }

  const username = generateUsernameFromEmail(result.data.email);
  const isExists = await checkIfUserExistsByCreds(result.data.email, username);
  if (isExists) {
    req.session.flash = {
      alert: { type: "error", message: "Email atau username sudah terdaftar" },
    };
    return res.redirect("/auth/register");
  }

  const phoneExists = await checkIfProfileExistsByPhone(result.data.phone);
  if (phoneExists) {
    req.session.flash = {
      alert: { type: "error", message: "Nomor telepon sudah terdaftar" },
    };
    return res.redirect("pages/auth/register");
  }

  const newUser = {
    username: username,
    email: result.data.email,
    password: result.data.password,
  };

  const newProfile = {
    full_name: result.data.name,
    phone: result.data.phone,
  };

  const user = await createUser(newUser);
  if (!user) {
    req.session.flash = {
      alert: { type: "error", message: "Gagal membuat akun, silakan coba lagi" },
    };
    return res.redirect("/auth/register");
  }

  newProfile.user = user._id;
  const profile = await createProfile(newProfile);
  if (!profile) {
    req.session.flash = {
      alert: { type: "error", message: "Gagal membuat profil, silakan coba lagi" },
    };
    return res.redirect("/auth/register");
  }

  req.session.flash = {
    alert: { type: "success", message: "Akun berhasil dibuat, silakan masuk" },
  };
  return res.redirect("/auth/register");
};

/**
 * @type {express.Handler}
 */
export const loggingInHandler = async (req, res) => {
  const body = req.body;
  const result = validateParse(loginValidator, body);
  if (!result.success) {
    req.session.form_errors = result.errors;
    req.session.flash = {
      alert: { type: "error", message: "Data yang dimasukkan tidak valid" },
    };
    return res.redirect("/auth/login");
  }

  const user = await getUserByCredential(result.data.credential);
  if (!user) {
    req.session.flash = {
      alert: { type: "error", message: "Akun tidak ditemukan atau kata sandi salah" },
    };
    return res.redirect("/auth/login");
  }

  const isValidPassword = compareSync(result.data.password, user.password);
  if (!isValidPassword) {
    req.session.flash = {
      alert: { type: "error", message: "Akun tidak ditemukan atau kata sandi salah" },
    };
    return res.redirect("/auth/login");
  }

  req.session.user = user;
  req.session.isAuthenticated = true;

  const next = req.query.n || "/";

  return res.redirect(next);
};
