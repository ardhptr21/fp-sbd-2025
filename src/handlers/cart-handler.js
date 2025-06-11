import { validateParse } from "../lib/validator.js";
import { getAllCarts, getExistsInCart, newCart, updateCart } from "../repositories/cart-repo.js";
import { getProductById } from "../repositories/product-repo.js";
import { addToCartValidator } from "../validators/cart-validator.js";

/**
 * @type {import('express').RequestHandler}
 */
export const getExistingsCart = async (req, res) => {
  const carts = await getAllCarts(req.session.user._id);
  const total_price = carts.reduce((total, cart) => {
    return total + cart.product.price * cart.quantity;
  }, 0);
  return res.render("pages/cart/index", {
    carts,
    total_price,
  });
};

/**
 * @type {import('express').RequestHandler}
 */
export const addToCart = async (req, res) => {
  const referer = req.get("referer") || "/";

  const { success, data } = validateParse(addToCartValidator, req.body);
  if (!success) {
    req.session.flash = {
      alert: { type: "error", message: "Data tidak valid." },
    };
    return res.redirect(referer);
  }

  const product = await getProductById(data.product);
  if (!product) {
    req.session.flash = {
      alert: { type: "error", message: "Product tidak ditemukan." },
    };
    return res.redirect(referer);
  }

  if (data.quantity < 1 || data.quantity > product.stock) {
    req.session.flash = {
      alert: { type: "error", message: "Jumlah barang tidak sesuai." },
    };
    return res.redirect(referer);
  }

  const cart = await getExistsInCart(req.session.user._id, product._id);
  if (cart) {
    let quantity = cart.quantity + data.quantity;
    if (quantity > product.stock) quantity = product.stock;
    await updateCart(req.session.user._id, product._id, quantity);
    req.session.flash = {
      alert: { type: "success", message: "Keranjang berhasil diperbarui." },
    };
  } else {
    await newCart(req.session.user._id, product._id, data.quantity);
    req.session.flash = {
      alert: { type: "success", message: "Barang berhasil ditambahkan ke keranjang." },
    };
  }

  return res.redirect(referer);
};

// API
/**
 * @type {import('express').RequestHandler}
 */
export const updateQuantity = async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;

  let qnumber = parseInt(quantity, 10);
  if (isNaN(qnumber) || qnumber < 1) {
    return res.status(400).json({ error: "Invalid quantity." });
  }

  const cart = await getExistsInCart(req.session.user._id, id);
  if (!cart) {
    return res.status(404).json({ error: "Cart item not found." });
  }

  await updateCart(req.session.user._id, id, qnumber);
  return res.status(200).json({ message: "Quantity updated successfully." });
};

/**
 * @type {import('express').RequestHandler}
 */
export const getCurrentStatus = async (req, res) => {
  const carts = await getAllCarts(req.session.user._id);
  const total_price = carts.reduce((total, cart) => {
    return total + cart.product.price * cart.quantity;
  }, 0);

  return res.status(200).json({ total_price });
};
