import { getAllTransactionsBelongToUser } from "../../repositories/transaction-repo.js";

/**
 * @type {import('express').Handler}
 */
export const dashboardTransaction = async (req, res) => {
  const transactions = await getAllTransactionsBelongToUser(req.session.user._id);
  return res.render("pages/dashboard/transaction", {
    transactions,
  });
};
