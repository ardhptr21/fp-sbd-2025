import { Router } from "express";
import { homeHandler } from "../handlers/base-handler.js";

const router = Router();

router.get("/", homeHandler);

export default router;
