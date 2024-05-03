import User from "../models/User.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import generateJSONtoken from "../utils/generateJSONtoken.js";

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
        const { _id, email, name, isAdmin, cart } = foundUser;

        return res.json({
            _id,
            email,
            name,
            isAdmin,
            cart,
            token: generateJSONtoken(_id),
        });
    }
});

export const getUserProfile = asyncHandler(async (req, res) => {
    const translatedUser = req?.user;

    if (translatedUser) {
        res.json(translatedUser);
    } else {
        res.status(404).json({
            success: false,
            code: 404,
            message: "Bad authentifuication result or Server error",
        });
    }
});

export const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
        return res.status(400).json({
            success: false,
            code: 400,
            message: "Fields: name, email, password are required",
        });

    const foundUser = await User.findOne({ email });

    if (foundUser)
        return res.status(400).json({
            success: false,
            code: 400,
            message: "User with the same email already exists",
        });

    try {
        const newUser = await new User({ name, email, password }).save();
        {
            const { _id, email, name, isAdmin, cart } = newUser;
            if (newUser) {
                return res.status(201).json({
                    _id,
                    email,
                    name,
                    isAdmin,
                    cart,
                    token: generateJSONtoken(_id),
                });
            }
        }
    } catch (e) {
        return res.status(500).json({
            success: false,
            code: 500,
            message:
                "Cannot save new user. Please try again later in case of: " +
                e.message,
        });
    }
});
