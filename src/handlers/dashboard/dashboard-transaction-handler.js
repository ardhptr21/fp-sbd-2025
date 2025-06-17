/**
 * @type {import('express').Handler}
 */
export const dashboardTransaction = (req, res) => {
  return res.render("pages/dashboard/transaction");
};
