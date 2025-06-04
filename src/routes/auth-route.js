import { Router } from "express";
import { loginHandler, registerHandler } from "../handlers/auth-handler.js";

const router = Router();

router.get("/login", loginHandler);
router.get("/register", registerHandler);

export default router;
