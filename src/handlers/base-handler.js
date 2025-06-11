import express from "express";
import { getProducts } from "../repositories/product-repo.js";

/**
 * @type {express.Handler}
 */
export const homeHandler = async (req, res) => {
  const products = await getProducts();
  return res.render("pages/home", { products });
};
