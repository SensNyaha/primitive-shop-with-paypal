import User from "../models/User.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";

export const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const foundUser = await User.findOne({ email });

    if (!foundUser)
        return res.status(404).json({
            success: false,
            code: 404,
            message: "User with the same email was not found",
        });

    const passwordIsCorrect = await bcrypt.compare(
        password,
        foundUser.password
    );
    if (!passwordIsCorrect)
        return res.status(401).json({
            success: false,
            code: 401,
            message: "Password is incorrect",
        });

    {
        const { _id, email, name, isAdmin } = foundUser;

        return res.json({ _id, email, name, isAdmin, token: null });
    }
});
