import express from "express";
import {
  getProductByIdWithCategory,
  getProductsByCategory,
  getProductsWithSearch,
} from "../repositories/product-repo.js";
import { getCategoryBySlug } from "../repositories/category-repo.js";

/**
 * @type {express.Handler}
 */
export const productDetail = async (req, res) => {
  const slug = req.params.slug;
  const product = await getProductByIdWithCategory(slug);
  if (!product) return res.sendStatus(404);

  return res.render("pages/product/product-detail", {
    product,
  });
};

/**
 * @type {express.Handler}
 */
export const productListBySearch = async (req, res) => {
  const s = req.query.s || "";
  const minPrice = Number(req.query.minPrice) || 0;
  const maxPrice = Number(req.query.maxPrice) || -1;
  const sortBy = Number(req.query.sortBy) || 0;

  if (!s) return res.redirect("/");
  const products = await getProductsWithSearch(s, {
    minPrice,
    maxPrice,
    sortBy,
  });
  return res.render("pages/product/product-search", { products, search: s });
};

/**
 * @type {express.Handler}
 */
export const productListByCategory = async (req, res) => {
  const category = await getCategoryBySlug(req.params.slug);
  if (!category) return res.sendStatus(404);

  const minPrice = Number(req.query.minPrice) || 0;
  const maxPrice = Number(req.query.maxPrice) || -1;
  const sortBy = Number(req.query.sortBy) || 0;

  const products = await getProductsByCategory(category._id, {
    minPrice,
    maxPrice,
    sortBy,
  });
  return res.render("pages/product/product-category", {
    products,
    category,
  });
};
