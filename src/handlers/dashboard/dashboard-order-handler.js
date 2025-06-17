/**
 * @type {import('express').Handler}
 */
export const dashboardOrder = (req, res) => {
  return res.render("pages/dashboard/order/index");
};

/**
 * @type {import('express').Handler}
 */
export const dashboardOrderDetail = (req, res) => {
  return res.render("pages/dashboard/order/detail");
};
