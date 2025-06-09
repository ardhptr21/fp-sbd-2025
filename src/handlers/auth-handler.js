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
export const registeringHandler = async (req, res) => {
  const body = req.body;
  const result = validateParse(registerValidator, body);
  if (!result.success) {
    return res.render("pages/auth/register", {
      alert: { type: "error", message: "Data yang dimasukkan tidak valid" },
      form_errors: result.errors,
    });
  }

  const username = generateUsernameFromEmail(result.data.email);
  const isExists = await checkIfUserExistsByCreds(result.data.email, username);
  if (isExists) {
    return res.render("pages/auth/register", {
      alert: { type: "error", message: "Email atau username sudah terdaftar" },
    });
  }

  const phoneExists = await checkIfProfileExistsByPhone(result.data.phone);
  if (phoneExists) {
    return res.render("pages/auth/register", {
      alert: { type: "error", message: "Nomor telepon sudah terdaftar" },
    });
  }

  const newUser = {
    username: username,
    email: result.data.email,
    password: result.data.password,
  };

  const newProfile = {
    name: result.data.name,
    phone: result.data.phone,
  };

  const user = await createUser(newUser);
  if (!user) {
    return res.render("pages/auth/register", {
      alert: { type: "error", message: "Gagal membuat akun, silakan coba lagi" },
    });
  }

  newProfile.user = user._id;
  const profile = await createProfile(newProfile);
  if (!profile) {
    return res.render("pages/auth/register", {
      alert: { type: "error", message: "Gagal membuat profil, silakan coba lagi" },
    });
  }

  return res.render("pages/auth/register", {
    alert: { type: "success", message: "Pendaftaran berhasil, silakan masuk" },
  });
};

/**
 * @type {express.Handler}
 */
export const loggingInHandler = async (req, res) => {
  const body = req.body;
  const result = validateParse(loginValidator, body);
  if (!result.success) {
    return res.render("pages/auth/login", {
      alert: { type: "error", message: "Data yang dimasukkan tidak valid" },
      form_errors: result.errors,
    });
  }

  const user = await getUserByCredential(result.data.credential);
  if (!user) {
    return res.render("pages/auth/login", {
      alert: { type: "error", message: "Akun tidak ditemukan atau kata sandi salah" },
    });
  }

  const isValidPassword = compareSync(result.data.password, user.password);
  if (!isValidPassword) {
    return res.render("pages/auth/login", {
      alert: { type: "error", message: "Akun tidak ditemukan atau kata sandi salah" },
    });
  }

  req.session.user = user;
  req.session.isAuthenticated = true;

  return res.redirect("/");
};
