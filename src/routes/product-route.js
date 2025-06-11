import { Router } from "express";
import {
  productDetail,
  productListByCategory,
  productListBySearch,
} from "../handlers/product-handler.js";

const router = Router();

router.get("/:slug", productDetail);
router.get("/s/:q", productListBySearch);
router.get("/c/:slug", productListByCategory);

export default router;
