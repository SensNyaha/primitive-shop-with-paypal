import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    loading: false,
    userInfo: null,
    error: null,
};

let fetchLogin;

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginUserRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        loginUserSuccess: (state, { payload }) => {
            state.loading = false;
            state.userInfo = payload;
        },
        loginUserFail: (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        },
        logoutUser: (state) => {
            state.userInfo = null;
            localStorage.removeItem("userInfo");
        },
    },
});

fetchLogin = createAsyncThunk(
    "auth",
    async ({ email, password }, { dispatch }) => {
        dispatch(authSlice.actions.loginUserRequest());

        const { data } = await axios
            .post("/api/users/login", {
                email,
                password,
            })
            .catch((e) => {
                dispatch(
                    authSlice.actions.loginUserFail(e?.response?.data?.message)
                );
            });

        if (data) {
            dispatch(authSlice.actions.loginUserSuccess(data));
            localStorage.setItem("userInfo", JSON.stringify(data));
        }
    }
);

export const { loginUserRequest, loginUserSuccess, loginUserFail, logoutUser } =
    authSlice.actions;

export { fetchLogin };
export default authSlice.reducer;
