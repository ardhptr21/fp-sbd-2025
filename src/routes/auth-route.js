import { Router } from "express";
import { loggingInHandler, loginHandler, registerHandler } from "../handlers/auth-handler.js";

const router = Router();

router.get("/login", loginHandler);
router.get("/register", registerHandler);
router.post("/login", loggingInHandler);

export default router;
