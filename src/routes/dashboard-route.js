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
  dashboardProductCreate,
  dashboardProductDetail,
  dashboardProductEdit,
  dashboardProductNew,
  dashboardProfile,
  dashboardTransaction,
} from "../handlers/dashboard-handler.js";
import { authenticate } from "../middlewares/auth-middleware.js";

const router = Router();

router.get("/account", authenticate(), dashboardAccount);
router.get("/profile", authenticate(["customer"]), dashboardProfile);

router.get("/product", authenticate(["admin"]), dashboardProduct);
router.post("/product/new", authenticate(["admin"]), dashboardProductCreate);
router.get("/product/new", authenticate(["admin"]), dashboardProductNew);
router.get("/product/:slug", authenticate(["admin"]), dashboardProductDetail);
router.get("/product/:slug/edit", authenticate(["admin"]), dashboardProductEdit);

router.get("/category", authenticate(["admin"]), dashboardCategory);
router.get("/category/new", authenticate(["admin"]), dashboardCategoryNew);
router.post("/category/new", authenticate(["admin"]), dashboardCategoryCreate);
router.get("/category/:slug", authenticate(["admin"]), dashboardCategoryEdit);
router.post("/category/:slug", authenticate(["admin"]), dashboardCategoryUpdate);
router.get("/order", authenticate(["admin"]), dashboardOrder);

router.get("/transaction", authenticate(["customer"]), dashboardTransaction);
router.get("/payment", authenticate(["customer"]), dashboardPayment);

export default router;
