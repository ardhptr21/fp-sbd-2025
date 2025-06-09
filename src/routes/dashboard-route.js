import { Router } from "express";
import {
  dashboardAccount,
  dashboardCategory,
  dashboardOrder,
  dashboardPayment,
  dashboardProduct,
  dashboardProfile,
  dashboardTransaction,
} from "../handlers/dashboard-handler.js";

const router = Router();

router.get("/profile", dashboardProfile);
router.get("/account", dashboardAccount);
router.get("/product", dashboardProduct);
router.get("/category", dashboardCategory);
router.get("/order", dashboardOrder);
router.get("/transaction", dashboardTransaction);
router.get("/payment", dashboardPayment);

export default router;
