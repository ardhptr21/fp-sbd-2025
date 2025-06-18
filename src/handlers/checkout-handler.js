import { getAllCarts, makeEmptyCart } from "../repositories/cart-repo.js";
import { createOrderFromCart } from "../repositories/order-repo.js";
import { createPayment } from "../repositories/payment-repo.js";
import { editStockFromCarts } from "../repositories/product-repo.js";
import { createTransaction } from "../repositories/transaction-repo.js";

/**
 * @type {import('express').Handler}
 */
export const checkoutHandler = async (req, res) => {
  const referer = req.get("Referer") || "";

  const { user } = req.session;
  const carts = await getAllCarts(user._id);
  if (!carts || carts.length === 0) {
    req.session.flash = {
      alert: { type: "error", message: "Keranjang belanja Anda kosong." },
    };
    return res.redirect(referer);
  }

  const total_price = carts.reduce((total, cart) => {
    return total + cart.product.price * cart.quantity;
  }, 0);

  const transaction = await createTransaction(user._id, total_price);
  if (!transaction) {
    req.session.flash = {
      alert: { type: "error", message: "Gagal membuat transaksi, coba lagi." },
    };
    return res.redirect(referer);
  }

  const orders = await createOrderFromCart(carts, transaction._id);
  if (!orders || orders.length === 0) {
    req.session.flash = {
      alert: { type: "error", message: "Gagal membuat pesanan, coba lagi." },
    };
    return res.redirect(referer);
  }

  await makeEmptyCart(user._id);
  await editStockFromCarts(carts);
  await createPayment({
    transaction: transaction._id,
    status: "pending",
  });

  return res.redirect(`/transaction/${transaction._id}`);
};
