export const notFoundMw = (req, res, next) => {
    const notFoundError = new Error("Not Found page: " + req.url);
    res.status(404);
    next(notFoundError);
};

export const errorsMw = (err) => {
    if (err)
        res.send(500).json({
            success: false,
            code: 500,
            error: process.env.NODE_ENV === "production" ? e.message : e.stack,
        });
};
