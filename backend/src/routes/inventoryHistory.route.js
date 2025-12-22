import { Router } from "express";
import * as inventoryHistoryCtrl from "../controllers/inventory.controller.js";

const router = Router();

router.get("/monthly", inventoryHistoryCtrl.getMonthlyHistory);

export default router;
