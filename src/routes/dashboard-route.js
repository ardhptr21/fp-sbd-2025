import { Router } from "express";
import {
  dashboardAccount,
  dashboardCategory,
  dashboardCategoryCreate,
  dashboardCategoryEdit,
  dashboardCategoryNew,
  dashboardCategoryUpdate,
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
router.get("/category/new", dashboardCategoryNew);
router.post("/category/new", dashboardCategoryCreate);
router.get("/category/:slug", dashboardCategoryEdit);
router.post("/category/:slug", dashboardCategoryUpdate);

router.get("/order", dashboardOrder);
router.get("/transaction", dashboardTransaction);
router.get("/payment", dashboardPayment);

export default router;
