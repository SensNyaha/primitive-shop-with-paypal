import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        changeProductQuantity: (state, { payload }) => {
            payload.forEach((plElem) => {
                if (plElem._id && plElem.quantity > 0) {
                    const foundIndex = state.findIndex(
                        (e) => e._id === plElem._id
                    );
                    if (foundIndex !== -1)
                        state[foundIndex].quantity = plElem.quantity;
                    else state.push(plElem);
                }
            });

            localStorage.setItem("cart", JSON.stringify(state));
        },
        removeProduct: (state, { payload }) => {
            const newState = state.filter((e) => e._id !== payload._id);
            localStorage.setItem("cart", JSON.stringify(newState));
            return newState;
        },
    },
});

export const { changeProductQuantity, removeProduct } = cartSlice.actions;

export default cartSlice.reducer;
