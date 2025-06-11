import { Cart } from "../models/cart-model.js";

export const getExistsInCart = async (userId, productId) => {
  return await Cart.findOne({ user: userId, product: productId }).lean();
};

export const getAllCarts = async (userId) => {
  return await Cart.find({ user: userId }).populate("product").lean();
};

export const newCart = async (userId, productId, quantity) => {
  return await Cart.create({
    user: userId,
    product: productId,
    quantity,
  });
};

export const updateCart = async (userId, productId, quantity) => {
  return await Cart.updateOne(
    { user: userId, product: productId },
    { quantity },
    { runValidators: true }
  );
};
