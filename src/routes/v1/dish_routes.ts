import express from "express";
import {getAllDishes, getDishById, postDish, putDish, deleteDish} from "../../controllers/v1/dish_controller";
import { authMiddleware } from "../../services/auth.service";

const router = express.Router();

router.get("/", getAllDishes);

router.get("/:id", getDishById);

router.post("/",authMiddleware, postDish);

router.put("/:id", authMiddleware, putDish);

router.delete("/:id", authMiddleware, deleteDish);


export default router;