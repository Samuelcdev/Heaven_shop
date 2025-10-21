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

export const generateInventoryPDF = async (req, res, next) => {
    try {
        const pdfPath = await reportService.generateInventoryPDF();
        return res.status(200).json({
            message: "Inventory report generated successfully",
            pdfPath: pdfPath,
        });
    } catch (err) {
        next(err);
    }
};
