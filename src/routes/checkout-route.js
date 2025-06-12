import { Router } from "express";
import { checkoutHandler } from "../handlers/checkout-handler.js";
import { authenticate } from "../middlewares/auth-middleware.js";

const router = Router();

router.post("/", authenticate(["customer"]), checkoutHandler);

export default router;
