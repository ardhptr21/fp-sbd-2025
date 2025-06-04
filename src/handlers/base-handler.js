import express from "express";

/**
 * @type {express.Handler}
 */
export const homeHandler = (req, res) => {
  return res.render("pages/home");
};
