import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/User.js";

export const protect = asyncHandler(async (req, res, next) => {
    const tokenArr = req.headers?.authorization?.split(" ");
    if (tokenArr && tokenArr[0] === "Bearer")
        try {
            const decoded = jwt.verify(tokenArr[1], process.env.JWT_SECRET);
            req.user = await User.findById(decoded._id).select("-password");

            next();
        } catch (error) {
            return res.status(401).json({
                success: false,
                code: 401,
                message: "Bad authentifuication result or Server error",
            });
        }
    else {
        return res.status(403).json({
            success: false,
            code: 403,
            message: "You are not authorized",
        });
    }
});
