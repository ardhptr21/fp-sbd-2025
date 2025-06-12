import { getOrderByTransaction } from "../repositories/order-repo.js";
import { getPaymentByTransaction } from "../repositories/payment-repo.js";
import { getTransactionBelongsToUser } from "../repositories/transaction-repo.js";

/**
 * @type {import('express').Handler}
 */
export const getDetailTransaction = async (req, res) => {
  const { id } = req.params;
  const { user } = req.session;

  const transaction = await getTransactionBelongsToUser(user._id, id);
  if (!transaction) return res.sendStatus(404);

  const [orders, payment] = await Promise.all([
    getOrderByTransaction(transaction._id),
    getPaymentByTransaction(transaction._id),
  ]);

  return res.render("pages/transaction/transaction-detail", {
    transaction,
    orders,
    payment,
  });
};
