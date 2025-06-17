import { getAllTransactions, getTransactionById } from "../../repositories/transaction-repo.js";

/**
 * @type {import('express').Handler}
 */
export const dashboardOrder = async (req, res) => {
  const transactions = await getAllTransactions();
  return res.render("pages/dashboard/order/index", {
    transactions,
  });
};

/**
 * @type {import('express').Handler}
 */
export const dashboardOrderDetail = async (req, res) => {
  const { id } = req.params;

  const transaction = await getTransactionById(id);
  if (!transaction) return res.sendStatus(404);
  return res.render("pages/dashboard/order/detail", {
    transaction,
  });
};
