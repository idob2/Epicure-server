import express from "express";

import {loginUser} from "../../controllers/v1/user_controller";

const router = express.Router();

router.post("/",loginUser);

export default router;