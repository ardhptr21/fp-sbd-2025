import express from "express";
import { getProducts } from "../repositories/product-repo.js";
import { getCategories } from "../repositories/category-repo.js";

/**
 * @type {express.Handler}
 */
export const homeHandler = async (req, res) => {
  const products = await getProducts();
  return res.render("pages/home", { products });
};

/**
 * @type {express.Handler}
 */
export const categoryHandler = async (req, res) => {
  const categories = await getCategories();
  return res.render("pages/category", { categories });
};
