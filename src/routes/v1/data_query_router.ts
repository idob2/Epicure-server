import express from "express";
import { queryDataByName } from "../../controllers/v1/data_query_controller";

const router = express.Router();

router.get("/query/search", queryDataByName);


export default router;
