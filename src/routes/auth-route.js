import { Router } from "express";
import {
  loggingInHandler,
  loginHandler,
  logoutHandler,
  registerHandler,
  registeringHandler,
} from "../handlers/auth-handler.js";
import { authenticate, unauthenticated } from "../middlewares/auth-middleware.js";

const router = Router();

router.get("/login", unauthenticated, loginHandler);
router.get("/register", unauthenticated, registerHandler);
router.post("/login", unauthenticated, loggingInHandler);
router.post("/register", unauthenticated, registeringHandler);
router.get("/logout", authenticate(), logoutHandler);

export default router;
