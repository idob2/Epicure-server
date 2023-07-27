import express from "express";
import chefRouter from "./chef_routes";
import restaurantRouter from "./restaurant_routes";
import dishRouter from "./dish_routes";
import dataQueryRouter from "./data_query_router";

const router = express.Router();
router.use("/chefs", chefRouter);
router.use("/restaurants", restaurantRouter);
router.use("/dishes", dishRouter);
router.use("/", dataQueryRouter);

export default router;