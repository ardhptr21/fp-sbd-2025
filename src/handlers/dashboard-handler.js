import express from "express";
import { validateParse } from "../lib/validator.js";
import {
  checkCategoryExists,
  createCategory,
  getCategories,
  getCategoryBySlug,
  updateCategory,
} from "../repositories/category-repo.js";
import { categoryCreateValidator } from "../validators/category-validator.js";

/**----------------------
 *    PROFILE
 *------------------------**/

/**
 * @type {express.Handler}
 */
export const dashboardProfile = (req, res) => {
  return res.render("pages/dashboard/profile");
};

/**----------------------
 *    ACCOUNT
 *------------------------**/

/**
 * @type {express.Handler}
 */
export const dashboardAccount = (req, res) => {
  return res.render("pages/dashboard/account");
};

/**----------------------
 *    PRODUCT
 *------------------------**/

/**
 * @type {express.Handler}
 */
export const dashboardProduct = (req, res) => {
  return res.render("pages/dashboard/product");
};

/**----------------------
 *    CATEGORY
 *------------------------**/

/**
 * @type {express.Handler}
 */
export const dashboardCategory = async (req, res) => {
  const categories = await getCategories();
  return res.render("pages/dashboard/category/index", {
    categories,
  });
};

/**
 * @type {express.Handler}
 */
export const dashboardCategoryNew = async (req, res) => {
  return res.render("pages/dashboard/category/new");
};

/**
 * @type {express.Handler}
 */
export const dashboardCategoryCreate = async (req, res) => {
  const result = validateParse(categoryCreateValidator, req.body);
  if (!result.success) {
    return res.render("pages/dashboard/category/new", {
      alert: { type: "error", message: "Data yang dimasukkan tidak valid" },
      form_errors: result.errors,
    });
  }

  const category = await createCategory(result.data);
  if (!category) {
    return res.render("pages/dashboard/category/new", {
      alert: { type: "error", message: "Gagal membuat kategori, coba lagi" },
    });
  }

  return res.render("pages/dashboard/category/new", {
    alert: { type: "success", message: "Kategori berhasil dibuat" },
  });
};

/**
 * @type {express.Handler}
 */
export const dashboardCategoryEdit = async (req, res) => {
  const slug = req.params.slug;
  const category = await getCategoryBySlug(slug);
  if (!category) return res.sendStatus(404);
  return res.render("pages/dashboard/category/edit", {
    category,
  });
};

/**
 * @type {express.Handler}
 */
export const dashboardCategoryUpdate = async (req, res) => {
  const slug = req.params.slug;
  const isExists = await checkCategoryExists(slug);
  if (!isExists) return res.sendStatus(404);

  const result = validateParse(categoryCreateValidator, req.body);
  if (!result.success) {
    return res.render("pages/dashboard/category/edit", {
      alert: { type: "error", message: "Data yang dimasukkan tidak valid" },
      form_errors: result.errors,
      category: { ...req.body },
    });
  }

  const updated = await updateCategory(slug, result.data);
  if (!updated) {
    return res.render("pages/dashboard/category/edit", {
      alert: { type: "error", message: "Gagal memperbarui kategori, coba lagi" },
      category: { ...req.body },
    });
  }

  return res.render("pages/dashboard/category/edit", {
    alert: { type: "success", message: "Kategori berhasil diperbarui" },
    category: req.body,
  });
};

/**----------------------
 *    ORDER
 *------------------------**/

/**
 * @type {express.Handler}
 */
export const dashboardOrder = (req, res) => {
  return res.render("pages/dashboard/order");
};

/**----------------------
 *    TRANSACTION
 *------------------------**/

/**
 * @type {express.Handler}
 */
export const dashboardTransaction = (req, res) => {
  return res.render("pages/dashboard/transaction");
};

/**----------------------
 *    PAYMENT
 *------------------------**/

/**
 * @type {express.Handler}
 */
export const dashboardPayment = (req, res) => {
  return res.render("pages/dashboard/payment");
};
