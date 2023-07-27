import express from "express";
import v1Router from "./v1/v1_router";

const router = express.Router();

router.use("/v1", v1Router);
export default router;