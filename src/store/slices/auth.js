/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "@/shared/api/axiosConfig";
import i18n from "../../i18n";
import axios from "axios";
import { showFlashMessage } from "./notifications";
import { formulateErrorMessage } from "@/shared/utils/formulateErrorMessage";

const initialState = {
  loginStatus: "idle",
  logoutStatus: "idle",
  registerStatus: "idle",
};
export const register = createAsyncThunk(
  "auth/register",
  async (data, thunkAPI) => {
    const response = await axiosInstance.post(
      `auth/signup/`,
      {
        email: data.email,
        username: data.name,
        password: data.password,
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    if (response.status < 200 || response.status >= 300) {
      thunkAPI.dispatch(
        showFlashMessage({
          message: formulateErrorMessage(response.data),
          severity: "error",
        })
      );
      return thunkAPI.rejectWithValue(response.data);
    } else {
      return response.data;
    }
  }
);
export const login = createAsyncThunk("auth/login", async (data, thunkAPI) => {
  const response = await axiosInstance.post(
    "auth/login/",
    {
      email: data.email,
      password: data.password,
    },
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  if (response.status < 200 || response.status >= 300) {
    thunkAPI.dispatch(
      showFlashMessage({
        message: formulateErrorMessage(response.data),
        severity: "error",
      })
    );
    return thunkAPI.rejectWithValue(response.data);
  } else {
    return response.data;
  }
});

export const logout = createAsyncThunk(
  "auth/logout",
  async (data, thunkAPI) => {
    const response = await axiosInstance.post(
      "auth/logout/",
      { refresh: localStorage.getItem("refreshToken") },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    if (response.status < 200 || response.status >= 300) {
      thunkAPI.dispatch(
        showFlashMessage({
          message: formulateErrorMessage(response.data),
          severity: "error",
        })
      );
      return thunkAPI.rejectWithValue(response.data);
    } else {
      return response.data;
    }
  }
);

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
      localStorage.setItem("accessToken", action.payload.data.access);
      localStorage.setItem("refreshToken", action.payload.data.refresh);
    });
    builder.addCase(login.pending, (state, action) => {
      state.loginStatus = "loading";
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loginStatus = "failed";
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.logoutStatus = "succeeded";
    });
    builder.addCase(logout.pending, (state, action) => {
      state.logoutStatus = "loading";
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.logoutStatus = "failed";
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.registerStatus = "succeeded";
      localStorage.setItem("accessToken", action.payload.data.access);
    });
    builder.addCase(register.pending, (state, action) => {
      state.registerStatus = "loading";
    });
    builder.addCase(register.rejected, (state, action) => {
      state.registerStatus = "failed";
    });
  },
});

export default authSlice.reducer;
export const { flushAuth } = authSlice.actions;
