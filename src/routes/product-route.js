import { Router } from "express";
import {
  productDetail,
  productListByCategory,
  productListBySearch,
} from "../handlers/product-handler.js";

const router = Router();

router.get("/search", productListBySearch);
router.get("/c/:slug", productListByCategory);
router.get("/:slug", productDetail);

export default router;
