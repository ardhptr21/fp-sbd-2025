import { validateParse } from "../../lib/validator.js";
import { getCategoriesForSelect } from "../../repositories/category-repo.js";
import {
  createProduct,
  getProductById,
  getProductByIdWithCategory,
  getProducts,
  updateProduct,
} from "../../repositories/product-repo.js";
import { productCreateValidator } from "../../validators/product-validator.js";

/**
 * @type {import('express').Handler}
 */
export const dashboardProduct = async (req, res) => {
  const products = await getProducts();
  return res.render("pages/dashboard/product/index", {
    products,
  });
};

/**
 * @type {import('express').Handler}
 */
export const dashboardProductNew = async (req, res) => {
  const categories = await getCategoriesForSelect();
  return res.render("pages/dashboard/product/new", {
    categories,
  });
};

/**
 * @type {import('express').Handler}
 */
export const dashboardProductCreate = async (req, res) => {
  const result = validateParse(productCreateValidator, req.body);
  req.session.form = req.body;

  if (!result.success) {
    req.session.form_errors = result.errors;
    req.session.flash = {
      alert: { type: "error", message: "Data yang dimasukkan tidak valid" },
    };
    return res.redirect("/dashboard/product/new");
  }

  const product = await createProduct(result.data);
  if (!product) {
    req.session.flash = {
      alert: { type: "error", message: "Gagal membuat produk, coba lagi" },
    };
    return res.redirect("/dashboard/product/new");
  }

  req.session.flash = {
    alert: { type: "success", message: "Produk berhasil dibuat" },
  };

  return res.redirect("/dashboard/product/new");
};

export const dashboardProductDetail = async (req, res) => {
  const slug = req.params.slug;
  const product = await getProductByIdWithCategory(slug);
  if (!product) return res.sendStatus(404);

  return res.render("pages/dashboard/product/detail", {
    product,
  });
};

export const dashboardProductEdit = async (req, res) => {
  const slug = req.params.slug;
  const categories = await getCategoriesForSelect();

  const product = await getProductById(slug);
  if (!product) return res.sendStatus(404);

  req.session.form = req.body;

  return res.render("pages/dashboard/product/edit", {
    categories,
    product,
  });
};

export const dashboardProductUpdate = async (req, res) => {
  const slug = req.params.slug;
  const categories = await getCategoriesForSelect();

  const product = await getProductById(slug);
  if (!product) return res.sendStatus(404);

  const result = validateParse(productCreateValidator, req.body);
  req.session.form = req.body;

  if (!result.success) {
    req.session.form_errors = result.errors;
    req.session.flash = {
      alert: { type: "error", message: "Data yang dimasukkan tidak valid" },
    };
    return res.redirect(`/dashboard/product/${slug}/edit`);
  }

  const updated = await updateProduct(slug, result.data);
  if (!updated) {
    req.session.flash = {
      alert: { type: "error", message: "Gagal mengubah produk, coba lagi" },
    };
    return res.redirect(`/dashboard/product/${slug}/edit`);
  }

  req.session.flash = {
    alert: { type: "success", message: "Produk berhasil diubah" },
  };

  return res.redirect(`/dashboard/product/${slug}/edit`);
};
