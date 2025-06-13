import { getOrderByTransaction } from "../repositories/order-repo.js";
import {
  getPaymentByTransaction,
  updatePaymentProof,
  updatePaymentStatus,
} from "../repositories/payment-repo.js";
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
  const { id } = req.params;
  const { user } = req.session;
  const referer = req.get("referer") || "/";
  const transaction = await getTransactionBelongsToUser(user._id, id);

  if (!transaction) {
    req.session.flash = {
      alert: { type: "error", message: "Transaksi tidak ditemukan." },
    };
    return res.redirect(referer);
  }

  if (transaction.status == "paid") {
    req.session.flash = {
      alert: { type: "error", message: "Transaksi ini sudah dibayar." },
    };
    return res.redirect(referer);
  }

  try {
    const { payment_proof } = req.body;
    const payment = await getPaymentByTransaction(transaction._id);

    if (!payment) {
      req.session.flash = {
        alert: { type: "error", message: "Data pembayaran tidak ditemukan." },
      };
      return res.redirect(referer);
    }

    await Promise.all([
      updatePaymentProof(payment._id, payment_proof),
      updatePaymentStatus(payment._id, "paid"),
    ]);
    req.session.flash = {
      alert: { type: "success", message: "Pembayaran berhasil dikonfirmasi." },
    };
  } catch (err) {
    req.session.flash = {
      alert: {
        type: "error",
        message: "Terjadi kesalahan saat memproses pembayaran.",
      },
    };
  }
  return res.redirect(referer);
};
