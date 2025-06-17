import { Router } from "express";
import { categoryHandler, homeHandler } from "../handlers/base-handler.js";

const router = Router();

router.get("/", homeHandler);
router.get("/category", categoryHandler);

export default router;
