import express from "express";

/**
 * @type {express.Handler}
 */
export const productDetail = (req, res) => {
  // TODO: get product detail by their slug params
  return res.render("pages/product/product-detail");
};

/**
 * @type {express.Handler}
 */
export const productListBySearch = (req, res) => {
  // TODO: implement product list by search logic
};

/**
 * @type {express.Handler}
 */
export const productListByCategory = (req, res) => {
  // TODO: implement product list by category logic
};
