import { updatePaymentStatus } from "../../repositories/payment-repo.js";
import {
  getAllTransactions,
  getTransactionById,
  getTransactionWithPaymentById,
} from "../../repositories/transaction-repo.js";

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

/**
 * @type {import('express').Handler}
 */
export const dashboardOrderAccept = async (req, res) => {
  const referer = req.get("referer") || "/dashboard/order";
  const { id } = req.params;

  const transaction = await getTransactionWithPaymentById(id);
  if (!transaction) return res.sendStatus(404);

  if (transaction.status === "completed") {
    req.session.flash = {
      alert: { type: "warning", message: "Pesanan sudah dalam status diterima" },
    };
    return res.redirect(referer);
  }

  if (transaction.payment.status !== "accepted") {
    req.session.flash = {
      alert: { type: "error", message: "Pembayaran belum diverifikasi dengan benar" },
    };
    return res.redirect(referer);
  }

  transaction.status = "completed";
  await transaction.save();

  req.session.flash = { alert: { type: "success", message: "Pesanan berhasil diterima" } };

  return res.redirect(referer);
};

/**
 * @type {import('express').Handler}
 */
export const dashboardOrderCancel = async (req, res) => {
  const referer = req.get("referer") || "/dashboard/order";
  const { id } = req.params;

  const transaction = await getTransactionWithPaymentById(id);
  if (!transaction) return res.sendStatus(404);

  if (transaction.status === "cancelled") {
    req.session.flash = {
      alert: { type: "warning", message: "Pesanan sudah dalam status dibatalkan" },
    };
    return res.redirect(referer);
  }

  transaction.status = "cancelled";
  await transaction.save();

  if (transaction.payment.status === "accepted" || transaction.payment.status === "paid") {
    await updatePaymentStatus(transaction.payment._id, "returned");
  }

  req.session.flash = { alert: { type: "success", message: "Pesanan berhasil dibatalkan" } };

  return res.redirect(referer);
};
