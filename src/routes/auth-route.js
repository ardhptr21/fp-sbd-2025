import { Router } from "express";
import {
  loggingInHandler,
  loginHandler,
  registerHandler,
  registeringHandler,
} from "../handlers/auth-handler.js";

const router = Router();

router.get("/login", loginHandler);
router.get("/register", registerHandler);
router.post("/login", loggingInHandler);
router.post("/register", registeringHandler);

export default router;
