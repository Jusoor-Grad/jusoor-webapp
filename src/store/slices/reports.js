/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "@/shared/api/axiosConfig";
import i18n from "../../i18n";
import validation from "@/shared/utils/validation";
import { showFlashMessage } from "./notifications";
import { formulateErrorMessage } from "@/shared/utils/formulateErrorMessage";

const initialState = {
  reports: [],
  specificReport: null,
  fetchReportsStatus: "idle",
  fetchSpecificReportsStatus: "idle",
  createSentimentReportStatus: "idle",
};
export const getSentimentReports = createAsyncThunk(
  "reports/getSentimentReports",
  async (data, thunkAPI) => {
    const response = await axiosInstance.get(`sentiment-reports/`, {
      headers: { "Content-Type": "application/json" },
    });
    if (response.status < 200 || response.status >= 300) {
      thunkAPI.dispatch(
        showFlashMessage({
          message: formulateErrorMessage(response),
          severity: "error",
        })
      );
      return thunkAPI.rejectWithValue(response.data);
    } else {
      return {
        ...response.data,
      };
    }
  }
);
export const getSpecificSentimentReport = createAsyncThunk(
  "reports/getSpecificSentimentReport",
  async (data, thunkAPI) => {
    const response = await axiosInstance.get(`sentiment-reports/${data.id}/`, {
      headers: { "Content-Type": "application/json" },
    });
    if (response.status < 200 || response.status >= 300) {
      thunkAPI.dispatch(
        showFlashMessage({
          message: formulateErrorMessage(response),
          severity: "error",
        })
      );
      return thunkAPI.rejectWithValue(response.data);
    } else {
      return {
        ...response.data,
      };
    }
  }
);
export const createSentimentReport = createAsyncThunk(
  "reports/createSentimentReport",
  async (data, thunkAPI) => {
    const currentDate = new Date();
    const endAt = currentDate.toISOString(); // Current date and time in ISO format
    const startAtDate = new Date(currentDate);
    startAtDate.setDate(startAtDate.getDate() - 1); // Subtract one day from the current date
    const startAt = startAtDate.toISOString(); // Start date in ISO format
    const headers = {
      "Content-Type": "application/json",
    };
    const response = await axiosInstance.post(
      `sentiment-reports/`,
      {
        patient: data.id,
        start_at: startAt,
        end_at: endAt,
      },
      {
        headers,
      }
    );
    if (response.status < 200 || response.status >= 300) {
      thunkAPI.dispatch(
        showFlashMessage({
          message: formulateErrorMessage(response),
          severity: "error",
        })
      );
      return thunkAPI.rejectWithValue(response.data);
    } else {
      return {
        ...response.data,
      };
    }
  }
);
export const reportsSlice = createSlice({
  name: "reports",
  initialState,
  reducers: {
    flushReports: (state, action) => {
      return { ...initialState };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getSentimentReports.fulfilled, (state, action) => {
      state.fetchReportsStatus = "succeeded";
      state.reports = action.payload.data.results;
    });
    builder.addCase(getSentimentReports.pending, (state, action) => {
      state.fetchReportsStatus = "loading";
    });
    builder.addCase(getSentimentReports.rejected, (state, action) => {
      state.fetchReportsStatus = "failed";
    });
    builder.addCase(getSpecificSentimentReport.fulfilled, (state, action) => {
      state.fetchSpecificReportsStatus = "succeeded";
      state.specificReport = action.payload.data;
      // state.specificReport = action.payload.data.results;
    });
    builder.addCase(getSpecificSentimentReport.pending, (state, action) => {
      state.fetchSpecificReportsStatus = "loading";
    });
    builder.addCase(getSpecificSentimentReport.rejected, (state, action) => {
      state.fetchSpecificReportsStatus = "failed";
    });
    builder.addCase(createSentimentReport.fulfilled, (state, action) => {
      state.createSentimentReportStatus = "succeeded";
    });
    builder.addCase(createSentimentReport.pending, (state, action) => {
      state.createSentimentReportStatus = "loading";
    });
    builder.addCase(createSentimentReport.rejected, (state, action) => {
      state.createSentimentReportStatus = "failed";
    });
  },
});

export default reportsSlice.reducer;
export const { flushPatients } = reportsSlice.actions;
