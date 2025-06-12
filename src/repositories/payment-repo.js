import { Payment } from "../models/payment-model.js";

export const getPaymentByTransaction = async (transactionId) => {
  const payment = await Payment.findOne({ transaction: transactionId }).lean();
  return payment;
};
