import { validateParse } from "../../lib/validator.js";
import {
  checkCategoryExists,
  createCategory,
  deleteCategory,
  getCategories,
  getCategoriesWithTotalSelling,
  getCategoryBySlug,
  isCategoryExistById,
  updateCategory,
} from "../../repositories/category-repo.js";
import { categoryCreateValidator } from "../../validators/category-validator.js";

/**
 * @type {import('express').Handler}
 */
export const dashboardCategory = async (req, res) => {
  const categories = await getCategoriesWithTotalSelling();
  return res.render("pages/dashboard/category/index", {
    categories,
  });
};

/**
 * @type {import('express').Handler}
 */
export const dashboardCategoryNew = async (req, res) => {
  return res.render("pages/dashboard/category/new");
};

/**
 * @type {import('express').Handler}
 */
export const dashboardCategoryCreate = async (req, res) => {
  const result = validateParse(categoryCreateValidator, req.body);
  req.session.form = req.body;

  if (!result.success) {
    req.session.form_errors = result.errors;
    req.session.flash = {
      alert: { type: "error", message: "Data yang dimasukkan tidak valid" },
    };
    return res.redirect("/dashboard/category/new");
  }

  const category = await createCategory(result.data);
  if (!category) {
    req.session.flash = {
      alert: { type: "error", message: "Gagal membuat kategori, coba lagi" },
    };
    return res.redirect("/dashboard/category/new");
  }

  req.session.flash = {
    alert: { type: "success", message: "Kategori berhasil dibuat" },
  };

  return res.redirect("/dashboard/category/new");
};

/**
 * @type {import('express').Handler}
 */
export const dashboardCategoryEdit = async (req, res) => {
  const slug = req.params.slug;
  const category = await getCategoryBySlug(slug);
  if (!category) return res.sendStatus(404);
  return res.render("pages/dashboard/category/edit", { category });
};

/**
 * @type {import('express').Handler}
 */
export const dashboardCategoryUpdate = async (req, res) => {
  const slug = req.params.slug;
  const isExists = await checkCategoryExists(slug);
  if (!isExists) return res.sendStatus(404);

  req.session.form = req.body;

  const result = validateParse(categoryCreateValidator, req.body);
  if (!result.success) {
    req.session.form_errors = result.errors;
    req.session.form = req.body;
    req.session.flash = {
      alert: { type: "error", message: "Data yang dimasukkan tidak valid" },
    };

    return res.redirect(`/dashboard/category/${slug}`);
  }

  const updated = await updateCategory(slug, result.data);
  if (!updated) {
    req.session.flash = {
      alert: {
        type: "error",
        message: "Gagal memperbarui kategori, coba lagi",
      },
    };

    return res.redirect(`/dashboard/category/${slug}`);
  }

  req.session.flash = {
    alert: { type: "success", message: "Kategori berhasil diperbarui" },
  };
  return res.redirect(`/dashboard/category/${slug}`);
};

/**
 * @type {import('express').Handler}
 */
export const dashboardCategoryDelete = async (req, res) => {
  const { id } = req.params;

  const exist = await isCategoryExistById(id);
  if (!exist) {
    req.session.flash = {
      alert: { type: "error", message: "Kategori tidak ditemukan" },
    };
    return res.redirect("/dashboard/category");
  }

  try {
    await deleteCategory(id);
    req.session.flash = {
      alert: { type: "success", message: "Kategori berhasil dihapus" },
    };
  } catch (error) {
    req.session.flash = {
      alert: { type: "error", message: error.message || "Gagal menghapus kategori, coba lagi" },
    };
  }

  return res.redirect("/dashboard/category");
};
