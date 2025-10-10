import { Router } from "express";
import * as userCtrl from "../controllers/user.controller.js";

const router = Router();

router.get("/", userCtrl.getUsers);
router.get("/:id", userCtrl.getUserByPk);


export default router;
