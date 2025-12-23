import * as inventoryHistoryService from "../services/inventoryHistory.service.js";

export const getMonthlyHistory = async (_req, res, next) => {
    try {
        const historyData =
            await inventoryHistoryService.getMonthlyInventoryHistory();
        return res.status(200).json(historyData);
    } catch (err) {
        next(err);
    }
};

export const createInventoryMovement = async (req, res, next) => {
    try {
        const movement =
            await inventoryHistoryService.registerInventoryMovement(req.body);
        return res.status(201).json(movement);
    } catch (err) {
        next(err);
    }
};
