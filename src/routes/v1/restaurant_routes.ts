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

router.get("/:id/chef", getRestaurantChefByID);

router.get("/:id/dishes", getDishesOfRestaurant);

// router.use("/restaurants", router);

export default router;