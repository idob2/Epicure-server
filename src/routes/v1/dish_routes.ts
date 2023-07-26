import express from "express";
import {getAllDishes, getDishById, postDish, putDish, deleteDish} from "../../controllers/v1/dish_controller";

const router = express.Router();

router.get("/", getAllDishes);

router.get("/:id", getDishById);

router.post("/", postDish);

router.put("/:id", putDish);

router.delete("/:id", deleteDish);

router.use("/v1/dishes", router);

export default router;