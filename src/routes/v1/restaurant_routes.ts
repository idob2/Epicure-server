import express from "express";
import {
  getAllRestaurants,
  getRestaurantByID,
  postRestaurant,
  putRestaurant,
  deleteRestaurant,
  getRestaurantChefByID,
  getDishesOfRestaurant
} from "../../controllers/v1/restaurant_controller";

const router = express.Router();

router.get("/", getAllRestaurants);

router.get("/:id", getRestaurantByID);

router.post("/", postRestaurant);

router.put("/:id", putRestaurant);

router.delete("/:id",deleteRestaurant);

router.get("/chef/:id", getRestaurantChefByID);

router.get("/dishes/:id", getDishesOfRestaurant);

router.use("/v1/restaurants", router);

export default router;