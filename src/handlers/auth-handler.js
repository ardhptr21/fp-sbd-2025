import { compareSync } from "bcrypt";
import express from "express";
import { validateParse } from "../lib/validator.js";
import { loginValidator } from "../validators/auth-validator.js";
import { getUserByCredential } from "../repositories/user-repo.js";

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
export const registeringHandler = (req, res) => {
  // TODO: implement registration logic
};

/**
 * @type {express.Handler}
 */
export const loggingInHandler = async (req, res) => {
  const body = req.body;
  const result = validateParse(loginValidator, body);
  if (!result.success) {
    return res.render("pages/auth/login", {
      state: { type: "error", message: "Data yang dimasukkan tidak valid" },
    });
  }

  const user = await getUserByCredential(result.data.credential);
  if (!user) {
    return res.render("pages/auth/login", {
      state: { type: "error", message: "Akun tidak ditemukan atau kata sandi salah" },
    });
  }

  const isValidPassword = compareSync(result.data.password, user.password);
  if (!isValidPassword) {
    return res.render("pages/auth/login", {
      state: { type: "error", message: "Akun tidak ditemukan atau kata sandi salah" },
    });
  }

  req.session.user = user;
  req.session.isAuthenticated = true;

  return res.redirect("/");
};
