import express from "express";
import {
  getAllChefs,
  getChefByID,
  postChef,
  putChef,
  deleteChef,
  getAllDishesOfChef,
  getChefRestaurants,
} from "../../controllers/v1/chef_controller";

const router = express.Router();

router.get("/",getAllChefs);

router.get("/:id", getChefByID);

router.get("/dishes/:id", getAllDishesOfChef);

router.get("/restaurants/:id", getChefRestaurants);

router.post("/", postChef);

router.put("/:id",putChef);

router.delete("/:id", deleteChef);

router.use("/v1/chefs", router);
export default router;