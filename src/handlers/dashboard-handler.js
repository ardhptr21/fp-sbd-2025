/**
 * @type {express.Handler}
 */
export const dashboardProfile = (req, res) => {
  return res.render("pages/dashboard/profile");
};

/**
 * @type {express.Handler}
 */
export const dashboardAccount = (req, res) => {
  return res.render("pages/dashboard/account");
};

/**
 * @type {express.Handler}
 */
export const dashboardProduct = (req, res) => {
  return res.render("pages/dashboard/product");
};

/**
 * @type {express.Handler}
 */
export const dashboardCategory = (req, res) => {
  return res.render("pages/dashboard/category");
};

/**
 * @type {express.Handler}
 */
export const dashboardOrder = (req, res) => {
  return res.render("pages/dashboard/order");
};

/**
 * @type {express.Handler}
 */
export const dashboardTransaction = (req, res) => {
  return res.render("pages/dashboard/transaction");
};

/**
 * @type {express.Handler}
 */
export const dashboardPayment = (req, res) => {
  return res.render("pages/dashboard/payment");
};
