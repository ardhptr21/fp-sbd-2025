import { Router } from "express";
import {
  confirmTransactionPayment,
  getDetailTransaction,
} from "../handlers/transaction-handler.js";
import { authenticate } from "../middlewares/auth-middleware.js";

const router = Router();

router.get("/:id", authenticate(["customer"]), getDetailTransaction);
router.post("/:id/confirm-payment", authenticate(["customer"]), confirmTransactionPayment);

export default router;
