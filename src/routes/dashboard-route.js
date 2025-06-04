import { Router } from "express";
import { dashboardProfile } from "../handlers/dashboard-handler.js";

const router = Router();

router.get("/profile", dashboardProfile);

export default router;
