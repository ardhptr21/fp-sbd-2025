import { Payment } from "../models/payment-model.js";

export const createPayment = async (data) => {
  return await Payment.create(data);
};

export const getPaymentByTransaction = async (transactionId) => {
  const payment = await Payment.findOne({ transaction: transactionId }).lean();
  return payment;
};

export const getPurePaymentByTransaction = async (transactionId) => {
  return await Payment.findOne({ transaction: transactionId });
};

export async function updatePaymentProof(paymentId, paymentProof) {
  return await Payment.updateOne({ _id: paymentId }, { $set: { payment_proof: paymentProof } });
}

export async function updatePaymentStatus(paymentId, status) {
  return await Payment.updateOne({ _id: paymentId }, { $set: { status: status } });
}
