import { Router } from "express";
import * as reportCtrl from "../controllers/report.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { permit } from "../middlewares/permit.js";

const router = Router();

router.get(
    "/inventory",
    verifyToken,
    permit("admin"),
    reportCtrl.getInventoryReport
);

router.get(
    "/inventory/pdf",
    verifyToken,
    permit("admin"),
    reportCtrl.generateInventoryPDF
);

export default router;
