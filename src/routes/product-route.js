import { Router } from "express";
import { productDetail } from "../handlers/product-handler.js";

const router = Router();

router.get("/:slug", productDetail);

export default router;
