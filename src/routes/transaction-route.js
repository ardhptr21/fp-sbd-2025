import { Router } from "express";
import { getDetailTransaction } from "../handlers/transaction-handler.js";
import { authenticate } from "../middlewares/auth-middleware.js";

const router = Router();

router.get("/:id", authenticate(["customer"]), getDetailTransaction);

export default router;
