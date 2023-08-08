import express from "express";
import chefRouter from "./chef_routes";
import restaurantRouter from "./restaurant_routes";
import dishRouter from "./dish_routes";
import dataQueryRouter from "./data_query_router";
import loginRouter from "./user_router";
import { authMiddleware } from "../../services/auth.service";

const router = express.Router();
router.use("/chefs", chefRouter);
router.use("/restaurants", restaurantRouter);
router.use("/dishes", dishRouter);
router.use("/login", loginRouter);
router.get("/protected", authMiddleware, (req, res) => {
    res.status(200);
  })
router.use("/", dataQueryRouter);

export default router;