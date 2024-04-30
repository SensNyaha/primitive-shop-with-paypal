import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    productIDs: [],
    productList: [],
    loadingIDs: [],
    error: null,
};

export const getProductsIDs = createAsyncThunk("products", async () => {
    const { data } = await axios.get("/api/products/");
    return data;
});

export const getProductsInfoById = createAsyncThunk(
    "products/:id",
    async (id) => {
        if (!id) throw new Error("No id defined for product info request");
        const { data } = await axios.get("/api/products/" + id);
        return data;
    }
);

export const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        addLoadingID: (state, { payload }) => {
            state.loadingIDs.push(payload);
        },
        filterLoadingID: (state, { payload }) => {
            state.loadingIDs = state.loadingIDs.filter((e) => e !== payload);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getProductsIDs.pending, (state) => {
            state.loadingIDs.push("all");
        });
        builder.addCase(getProductsIDs.fulfilled, (state, { payload }) => {
            state.loadingIDs = state.loadingIDs.filter((e) => e !== "all");
            state.productIDs.length = 0;
            state.productIDs.push(...payload);
        });
        builder.addCase(getProductsIDs.rejected, (state, action) => {
            state.loadingIDs = state.loadingIDs.filter((e) => e !== "all");
            state.error = action.error.message;
        });

        builder.addCase(getProductsInfoById.fulfilled, (state, { payload }) => {
            state.loadingIDs = state.loadingIDs.filter(
                (e) => e !== payload._id
            );
            !state.productList.find((e) => e._id === payload._id) &&
                state.productList.push(payload);
            !state.productIDs.find((e) => e === payload._id) &&
                state.productIDs.push(payload._id);
        });
        builder.addCase(getProductsInfoById.rejected, (state, action) => {
            state.error = action.error.message;
        });
    },
});

export const { addLoadingID, filterLoadingID } = productsSlice.actions;

export default productsSlice.reducer;
