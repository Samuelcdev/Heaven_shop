import * as reportService from "../services/report.service.js";

export const getInventoryReport = async (req, res, next) => {
    try {
        const reportData = await reportService.getInventoryReportData();

        return res.status(200).json({
            message: "Inventory report generated successfully",
            report: reportData,
        });
    } catch (err) {
        next(err);
    }
};
