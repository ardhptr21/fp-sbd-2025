import { Order } from "../models/order-model.js";

export const createOrderFromCart = async (carts, transactionId) => {
  const orders = carts.map((cart) => ({
    product: cart.product._id,
    quantity: cart.quantity,
    transaction: transactionId,
  }));

  const createdOrders = await Order.insertMany(orders);
  return createdOrders;
};

export const getOrderByTransaction = async (transactionId) => {
  const orders = await Order.find({ transaction: transactionId }).populate("product").lean();
  return orders;
};
