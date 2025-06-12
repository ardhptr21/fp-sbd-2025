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

/**
 * @type {import('express').Handler}
 */
export const confirmTransactionPayment = async (req, res) => {
  const referer = req.get("referer") || "/";

  /**
   * TODO: implement payment confirm
   * Step
   * 1. check id transaksi + usernya sesuai
   * 2. check dulu status transaksinya udah dibayar apa belum
   * 3. kalo udah dibayar, langsung redirect sambil kasih alert error aja
   * 4. kalo belom bayar update payment_proof nya dan set status nya jadi paid
   * 5. kasih pesan success
   * 6. redirect (pake referer)
   */

  return res.redirect(referer);
};
