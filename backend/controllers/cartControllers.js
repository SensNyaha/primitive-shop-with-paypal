import User from "../models/User.js";
import asyncHandler from "express-async-handler";

export const changeProductQuantity = asyncHandler(async (req, res) => {
    const translatedUser = req?.user;
    const items = req.body.items;

    const foundUser = await User.findById(translatedUser._id);

    if (foundUser) {
        items.forEach((item) => {
            if (item.quantity === 0) {
                foundUser.cart = foundUser.cart.filter(
                    (cartElem) => cartElem.id !== item.id
                );
            } else {
                const mergedItem = foundUser.cart.find((cartElem) => {
                    return cartElem._id === item._id;
                });

                if (mergedItem) mergedItem.quantity = item.quantity;
                else foundUser.cart = [...foundUser.cart, item];
            }
        });

        if (items.length === 0) {
            foundUser.cart = [];
        }
        foundUser.save();

        res.json(foundUser);
    } else {
        res.status(404).json({
            success: false,
            code: 404,
            message: "Bad authentifuication result or Server error",
        });
    }
});
