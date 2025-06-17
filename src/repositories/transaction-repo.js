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

export const getTransactionById = async (transactionId) => {
  return await Transaction.findById(transactionId)
    .populate("payment")
    .populate({
      path: "user",
      populate: { path: "profile" },
    })
    .populate({
      path: "orders",
      populate: {
        path: "product",
        select: "name price image",
      },
    })
    .lean();
};

export const getAllTransactions = async () => {
  const transactions = await Transaction.find({})
    .sort({ created_at: -1 })
    .populate({
      path: "user",
      populate: {
        path: "profile",
        select: "full_name",
      },
    })
    .populate({
      path: "orders",
      populate: {
        path: "product",
        select: "name price image",
      },
    })
    .lean();

  return transactions;
};
