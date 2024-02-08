/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { axiosInstance } from "@/shared/api/axiosConfig";
import i18n from "../../i18n";

const initialState = {
  loginStatus: "idle",
  logOutStatus: "idle",
};
export const login = createAsyncThunk("auth/login", async (data, thunkAPI) => {
  // const response = await axiosInstance.post(
  //   "login",
  //   {
  //     phone: data.phone,
  //     password: data.password,
  //     app: "OfRwQiI=",
  //     grand_type: "password",
  //   },
  //   {
  //     headers: { "Content-Type": "application/json" },
  //   }
  // );
  // if (response.status < 200 || response.status >= 300) {
  //   return thunkAPI.rejectWithValue(response.data); // Use rejectWithValue here
  // } else {
  //   return response.data;
  // }
});

export const logout = createAsyncThunk("auth/logout", async (data) => {
  // const response = await axiosInstance.post(
  //   "logout",
  //   {
  //   },
  //   {
  //     headers: { "Content-Type": "application/json" },
  //   }
  // );
  // if (response.status < 200 || response.status >= 300) {
  //   return thunkAPI.rejectWithValue(response.data); // Use rejectWithValue here
  // } else {
  //   return response.data;
  // }
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    flushAuth: (state, action) => {
      return { ...initialState };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.loginStatus = "succeeded";
      localStorage.setItem("accessToken", action.payload.access_token);
    });
    builder.addCase(login.pending, (state, action) => {
      state.loginStatus = "loading";
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loginStatus = "failed";
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.logOutStatus = "succeeded";
    });
    builder.addCase(logout.pending, (state, action) => {
      state.logOutStatus = "loading";
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.logOutStatus = "failed";
    });
  },
});

export default authSlice.reducer;
export const { flushAuth } = authSlice.actions;
