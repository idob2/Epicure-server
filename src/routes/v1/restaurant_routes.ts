import express from "express";
import {
  getAllRestaurants,
  getRestaurantByID,
  postRestaurant,
  putRestaurant,
  deleteRestaurant,
  getRestaurantChefByID,
  getDishesOfRestaurant,
  getAllRestaurantsPopulat
} from "../../controllers/v1/restaurant_controller";
import { authMiddleware } from "../../services/auth.service";

const router = express.Router();

router.get("/", getAllRestaurants);

router.get("/populated", getAllRestaurantsPopulat);



router.get("/:id", getRestaurantByID);

router.post("/", authMiddleware, postRestaurant);

router.put("/:id", authMiddleware, putRestaurant);

router.delete("/:id", authMiddleware, deleteRestaurant);

router.get("/:id/chef", getRestaurantChefByID);

router.get("/:id/dishes", getDishesOfRestaurant);

export default router;
