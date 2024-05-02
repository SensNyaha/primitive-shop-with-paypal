import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/productsSlice";
import cartReducer from "./slices/cartSlice";
import authReducer from "./slices/authSlice";
import registerReducer from "./slices/registerSlice";

export const store = configureStore({
    reducer: {
        products: productReducer,
        cart: cartReducer,
        auth: authReducer,
        register: registerReducer,
    },
});
