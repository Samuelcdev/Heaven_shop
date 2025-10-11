export const errorHandler = (err, req, res, next) => {
    console.error("Error Handler: ", err);

    const status = err.status || 500;
    const message = err.message || "Internal server error";

    const response = { message };

    if (process.env.NODE_ENV === "development") {
        response.stack = err.stack;
    }

    res.status(status).json(response);
};
