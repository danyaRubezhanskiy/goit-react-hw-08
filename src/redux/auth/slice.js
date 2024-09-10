import { createSlice } from "@reduxjs/toolkit";
import { apiLogin, apiLogout, apiRefreshUser, apiRegister } from "./operation";

const INITIAL_STATE = {
  user: {
    name: null,
    email: null,
  },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: INITIAL_STATE,
  reducer: {},
  extraReducers: (builder) =>
    builder
      .addCase(apiRegister.pending, (state) => {
        state.error = null;
      })
      .addCase(apiRegister.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(apiRegister.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(apiLogin.pending, (state) => {
        state.error = null;
      })
      .addCase(apiLogin.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(apiLogin.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(apiLogout.pending, (state) => {
        state.error = null;
      })
      .addCase(apiLogout.fulfilled, () => {
        return INITIAL_STATE;
      })
      .addCase(apiLogout.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(apiRefreshUser.pending, (state) => {
        state.error = null;
        state.isRefreshing = true;
      })
      .addCase(apiRefreshUser.fulfilled, (state, action) => {
        state.isRefreshing = false;
        state.isLoggedIn = true;
        state.user = action.payload;
      })
      .addCase(apiRefreshUser.rejected, (state, action) => {
        state.error = action.payload;
        state.isRefreshing = false;
      }),
});

export const authReducer = authSlice.reducer;
