import express from "express";
import {
  getAllChefs,
  getChefByID,
  postChef,
  putChef,
  deleteChef,
  getChefRestaurants,
} from "../../controllers/v1/chef_controller";
import { authMiddleware } from "../../services/auth.service";

const router = express.Router();

router.get("/",getAllChefs);

router.get("/:id", getChefByID);

router.get("/:id/restaurants", getChefRestaurants);

router.post("/", authMiddleware, postChef);

router.put("/:id", authMiddleware, putChef);

router.delete("/:id", authMiddleware, deleteChef);


export default router;

