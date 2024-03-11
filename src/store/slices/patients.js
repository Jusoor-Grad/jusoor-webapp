/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "@/shared/api/axiosConfig";
import i18n from "../../i18n";
import axios from "axios";

const initialState = {
  patients: [],
  fetchPatientsStatus: "idle",
};

export const getPatients = createAsyncThunk(
  "patients/getPatients",
  async (data, thunkAPI) => {
    const response = await axiosInstance.get(
      "patients",
      {},
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    if (response.status < 200 || response.status >= 300) {
      return thunkAPI.rejectWithValue(response.data); // Use rejectWithValue here
    } else {
      return response.data;
    }
  }
);

export const patientsSlice = createSlice({
  name: "patients",
  initialState,
  reducers: {
    flushPatients: (state, action) => {
      return { ...initialState };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPatients.fulfilled, (state, action) => {
      state.fetchPatientsStatus = "succeeded";
      state.patients = action.payload.data.results;
    });
    builder.addCase(getPatients.pending, (state, action) => {
      state.fetchPatientsStatus = "loading";
    });
    builder.addCase(getPatients.rejected, (state, action) => {
      state.fetchPatientsStatus = "failed";
    });
  },
});

export default patientsSlice.reducer;
export const { flushPatients } = patientsSlice.actions;
