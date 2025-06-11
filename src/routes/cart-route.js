import { Router } from "express";
import {
  addToCart,
  getCurrentStatus,
  getExistingsCart,
  updateQuantity,
} from "../handlers/cart-handler.js";
import { authenticate } from "../middlewares/auth-middleware.js";

const router = Router();

router.get("/", authenticate(["customer"]), getExistingsCart);
router.post("/", authenticate(["customer"]), addToCart);

// api
router.patch("/:id/update-quantity", authenticate(["customer"]), updateQuantity);
router.get("/status", authenticate(["customer"]), getCurrentStatus);

export default router;
