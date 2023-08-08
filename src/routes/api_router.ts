import express from "express";
import v1Router from "./v1/v1_router";
import { authMiddleware } from "../services/auth.service";

const router = express.Router();

router.use("/v1", v1Router);
router.use("/v1/admin",authMiddleware, v1Router);

export default router;