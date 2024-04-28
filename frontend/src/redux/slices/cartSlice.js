import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        changeProductQuantity: (state, { payload }) => {
            payload.forEach((plElem) => {
                if (plElem._id) {
                    const foundIndex = state.findIndex(
                        (e) => e._id === plElem._id
                    );
                    if (foundIndex !== -1)
                        state[foundIndex].quantity = plElem.quantity;
                    else state.push(plElem);
                }
            });
            // return state.map((e) => {
            //     if (e._id === payload._id) {
            //         e.quantity = payload.quantity;
            //     }
            //     return e;
            // });
        },
        removeProduct: (state, { payload }) => {
            return state.filter((e) => e._id !== payload._id);
        },
    },
});

export const { changeProductQuantity, removeProduct } = cartSlice.actions;

export default cartSlice.reducer;
