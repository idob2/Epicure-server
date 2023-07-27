import express from "express";
import {
  getAllChefs,
  getChefByID,
  postChef,
  putChef,
  deleteChef,
  getChefRestaurants,
} from "../../controllers/v1/chef_controller";

const router = express.Router();

router.get("/",getAllChefs);

router.get("/:id", getChefByID);

router.get("/:id/restaurants", getChefRestaurants);

router.post("/", postChef);

router.put("/:id",putChef);

router.delete("/:id", deleteChef);

// router.use("/chefs", router);

export default router;

