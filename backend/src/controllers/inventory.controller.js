import * as inventoryHistoryService from "../services/inventoryHistory.service.js";

export const getMonthlyHistory = async (_req, res, next) => {
    try {
        const historyData = await inventoryHistoryService.getMonthlyInventoryHistory();
        return res.status(200).json(historyData);
    } catch (err) {
        next(err);
    }
};
