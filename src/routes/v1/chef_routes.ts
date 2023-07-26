import express from "express";
import {
  getAllChefs,
  getChefByID,
  postChef,
  putChef,
  deleteChef,
} from "../../controllers/v1/chef_controller";

const router = express.Router();

router.get("/",getAllChefs);

router.get("/:id", getChefByID);

router.post("/", postChef);

router.put("/:id",putChef);

router.delete("/:id", deleteChef);

router.use("/v1/chefs", router);
export default router;