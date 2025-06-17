import { getPurePaymentByTransaction } from "../../repositories/payment-repo.js";
import { isTransactionExists } from "../../repositories/transaction-repo.js";

/**
 * @type {import('express').Handler}
 */
export const dashboardPayment = (req, res) => {
  return res.render("pages/dashboard/payment");
};

/**
 * @type {import('express').Handler}
 */
export const dashboardPaymentMarkInvalid = async (req, res) => {
  const referer = req.get("referer") || "/dashboard/order";
  const { id } = req.params;

  const transaction = await isTransactionExists(id);
  if (!transaction) return res.sendStatus(404);

  const payment = await getPurePaymentByTransaction(id);
  if (!payment) return res.sendStatus(404);

  if (payment.status === "invalid") {
    req.session.flash = {
      alert: { type: "warning", message: "Pembayaran sudah dalam status tidak valid" },
    };
    return res.redirect(referer);
  }

  if (payment.status === "accepted") {
    req.session.flash = {
      alert: { type: "error", message: "Pembayaran sudah diverifikasi, tidak bisa diubah" },
    };
    return res.redirect(referer);
  }

  payment.status = "invalid";
  await payment.save();

  req.session.flash = {
    alert: { type: "success", message: "Pembayaran berhasil ditandai sebagai tidak valid" },
  };

  return res.redirect(referer);
};

/**
 * @type {import('express').Handler}
 */
export const dashboardPaymentMarkAccepted = async (req, res) => {
  const referer = req.get("referer") || "/dashboard/order";
  const { id } = req.params;

  const transaction = await isTransactionExists(id);
  if (!transaction) return res.sendStatus(404);

  const payment = await getPurePaymentByTransaction(id);
  if (!payment) return res.sendStatus(404);

  if (payment.status === "accepted") {
    req.session.flash = {
      alert: { type: "warning", message: "Pembayaran sudah dalam status diterima" },
    };
    return res.redirect(referer);
  }

  if (payment.status === "invalid") {
    req.session.flash = {
      alert: { type: "error", message: "Pembayaran sudah ditandai tidak valid, tidak bisa diubah" },
    };
    return res.redirect(referer);
  }

  payment.status = "accepted";
  await payment.save();

  req.session.flash = {
    alert: { type: "success", message: "Pembayaran berhasil diterima" },
  };

  return res.redirect(referer);
};
