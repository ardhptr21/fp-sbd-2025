import { Transaction } from "../models/transaction-model.js";

export const createTransaction = async (userId, total) => {
  const transaction = await Transaction.insertOne({
    user: userId,
    total_price: total,
  });
  return transaction;
};

export const getTransactionBelongsToUser = async (userId, transactionId) => {
  const transaction = await Transaction.findOne({
    _id: transactionId,
    user: userId,
  }).lean();
  return transaction;
};
