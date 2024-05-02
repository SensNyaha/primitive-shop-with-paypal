import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import authSlice from "./authSlice";

const initialState = {
    loading: false,
    userInfo: null,
    error: null,
};

let fetchRegister;

export const registerSlice = createSlice({
    name: "register",
    initialState,
    reducers: {
        registerUserRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        registerUserSuccess: (state, { payload }) => {
            state.loading = false;
            state.userInfo = payload;
        },
        registerUserFail: (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        },
    },
});

fetchRegister = createAsyncThunk(
    "auth",
    async ({ name, email, password }, { dispatch }) => {
        dispatch(registerSlice.actions.registerUserRequest());

        const { data } = await axios
            .post("/api/users/register", {
                name,
                email,
                password,
            })
            .catch((e) => {
                dispatch(
                    registerSlice.actions.registerUserFail(
                        e?.response?.data?.message
                    )
                );
            });

        if (data) {
            dispatch(registerSlice.actions.registerUserSuccess(data));
            dispatch(authSlice.actions.loginUserSuccess(data));
            localStorage.setItem("userInfo", JSON.stringify(data));
        }
    }
);

export const { registerUserRequest, registerUserSuccess, registerUserFail } =
    registerSlice.actions;

export { fetchRegister };
export default registerSlice.reducer;
