import { Router } from "express";
import {
  dashboardAccount,
  dashboardAccountUpdateInfo,
  dashboardAccountUpdatePassword,
  dashboardCategory,
  dashboardCategoryCreate,
  dashboardCategoryDelete,
  dashboardCategoryEdit,
  dashboardCategoryNew,
  dashboardCategoryUpdate,
  dashboardOrder,
  dashboardOrderAccept,
  dashboardOrderCancel,
  dashboardOrderDetail,
  dashboardPayment,
  dashboardPaymentMarkAccepted,
  dashboardPaymentMarkInvalid,
  dashboardProduct,
  dashboardProductCreate,
  dashboardProductDelete,
  dashboardProductDetail,
  dashboardProductEdit,
  dashboardProductNew,
  dashboardProductUpdate,
  dashboardProfile,
  dashboardProfileUpdate,
  dashboardTransaction,
  dashboardTrash,
  dashboardTrashDelete,
  dashboardTrashRestore,
} from "../handlers/dashboard-handler.js";
import { authenticate } from "../middlewares/auth-middleware.js";

const router = Router();

router.get("/account", authenticate(), dashboardAccount);
router.post("/account/update-info", authenticate(), dashboardAccountUpdateInfo);
router.post("/account/update-password", authenticate(), dashboardAccountUpdatePassword);

router.get("/profile", authenticate(["customer"]), dashboardProfile);
router.post("/profile", authenticate(["customer"]), dashboardProfileUpdate);

router.get("/product", authenticate(["admin"]), dashboardProduct);
router.post("/product/new", authenticate(["admin"]), dashboardProductCreate);
router.get("/product/new", authenticate(["admin"]), dashboardProductNew);
router.get("/product/:slug", authenticate(["admin"]), dashboardProductDetail);
router.get("/product/:slug/edit", authenticate(["admin"]), dashboardProductEdit);
router.post("/product/:slug/edit", authenticate(["admin"]), dashboardProductUpdate);
router.post("/product/:id/delete", authenticate(["admin"]), dashboardProductDelete);

router.get("/category", authenticate(["admin"]), dashboardCategory);
router.get("/category/new", authenticate(["admin"]), dashboardCategoryNew);
router.post("/category/new", authenticate(["admin"]), dashboardCategoryCreate);
router.get("/category/:slug", authenticate(["admin"]), dashboardCategoryEdit);
router.post("/category/:slug/edit", authenticate(["admin"]), dashboardCategoryUpdate);
router.post("/category/:id/delete", authenticate(["admin"]), dashboardCategoryDelete);

router.get("/order", authenticate(["admin"]), dashboardOrder);
router.get("/order/:id", authenticate(["admin"]), dashboardOrderDetail);
router.post("/order/:id/complete", authenticate(["admin"]), dashboardOrderAccept);
router.post("/order/:id/cancel", authenticate(["admin"]), dashboardOrderCancel);

router.get("/transaction", authenticate(["customer"]), dashboardTransaction);

router.get("/payment", authenticate(["customer"]), dashboardPayment);
router.post("/payment/:id/invalid", authenticate(["admin"]), dashboardPaymentMarkInvalid);
router.post("/payment/:id/accept", authenticate(["admin"]), dashboardPaymentMarkAccepted);

router.get("/trash", authenticate(["admin"]), dashboardTrash);
router.post("/trash/:id/delete", authenticate(["admin"]), dashboardTrashDelete);
router.post("/trash/:id/restore", authenticate(["admin"]), dashboardTrashRestore);

export default router;
