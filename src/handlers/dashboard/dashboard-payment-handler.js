/**
 * @type {import('express').Handler}
 */
export const dashboardPayment = (req, res) => {
  return res.render("pages/dashboard/payment");
};
