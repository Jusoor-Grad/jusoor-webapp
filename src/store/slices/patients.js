/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "@/shared/api/axiosConfig";
import i18n from "../../i18n";
import validation from "@/shared/utils/validation";
import { showFlashMessage } from "./notifications";
import { formulateErrorMessage } from "@/shared/utils/formulateErrorMessage";

const initialState = {
  patients: [],
  specificPatient: null,
  patientsCount: null,
  activePatientsCount: null,
  fetchPatientsStatus: "idle",
  fetchActivePatientsCountStatus: "idle",
  fetchPatientsCountStatus: "idle",
  fetchSpecificPatientsStatus: "idle",
  tableCount: null,
};
export const getSpecificPatient = createAsyncThunk(
  "patients/getSpecificPatient",
  async (data, thunkAPI) => {
    const response = await axiosInstance.get(`patients/${data.id}/`, {
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
export const getPatientsCount = createAsyncThunk(
  "patients/getPatientsCount",
  async (data, thunkAPI) => {
    const response = await axiosInstance.get("patients/count/", {
      headers: { "Content-Type": "application/json" },
    });
    if (response.status < 200 || response.status >= 300) {
      thunkAPI.dispatch(
        showFlashMessage({
          message: formulateErrorMessage(response.data),
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
export const getActivePatientsCount = createAsyncThunk(
  "patients/getActivePatientsCount",
  async (data, thunkAPI) => {
    const response = await axiosInstance.get("patients/active_count/", {
      headers: { "Content-Type": "application/json" },
    });
    if (response.status < 200 || response.status >= 300) {
      thunkAPI.dispatch(
        showFlashMessage({
          message: formulateErrorMessage(response.data),
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
export const getPatients = createAsyncThunk(
  "patients/getPatients",
  async (data, thunkAPI) => {
    let url = "patients/";
    if (!validation.isEmpty(data.page)) {
      url += `?page=${data.page}&page_size=${data.page_size}`;
    }
    if (!validation.isEmpty(data.search)) {
      url += `&username=${data.search}`;
    }
    const response = await axiosInstance.get(url, {
      headers: { "Content-Type": "application/json" },
    });
    if (response.status < 200 || response.status >= 300) {
      thunkAPI.dispatch(
        showFlashMessage({
          message: formulateErrorMessage(response.data),
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
      state.tableCount = action.payload.data.count;
    });
    builder.addCase(getPatients.pending, (state, action) => {
      state.fetchPatientsStatus = "loading";
    });
    builder.addCase(getPatients.rejected, (state, action) => {
      state.fetchPatientsStatus = "failed";
    });
    builder.addCase(getActivePatientsCount.fulfilled, (state, action) => {
      state.fetchActivePatientsCountStatus = "succeeded";
      state.activePatientsCount = {
        currentMonth: action.payload.data.current_count,
        lastMonth: action.payload.data.last_month_count,
      };
    });
    builder.addCase(getActivePatientsCount.pending, (state, action) => {
      state.fetchActivePatientsCountStatus = "loading";
    });
    builder.addCase(getActivePatientsCount.rejected, (state, action) => {
      state.fetchActivePatientsCountStatus = "failed";
    });
    builder.addCase(getPatientsCount.fulfilled, (state, action) => {
      state.fetchPatientsCountStatus = "succeeded";
      state.patientsCount = {
        currentMonth: action.payload.data.current_count,
        lastMonth: action.payload.data.last_month_count,
      };
    });
    builder.addCase(getPatientsCount.pending, (state, action) => {
      state.fetchPatientsCountStatus = "loading";
    });
    builder.addCase(getPatientsCount.rejected, (state, action) => {
      state.fetchPatientsCountStatus = "failed";
    });
    builder.addCase(getSpecificPatient.fulfilled, (state, action) => {
      state.fetchSpecificPatientsStatus = "succeeded";
      state.specificPatient = action.payload.data;
    });
    builder.addCase(getSpecificPatient.pending, (state, action) => {
      state.fetchSpecificPatientsStatus = "loading";
    });
    builder.addCase(getSpecificPatient.rejected, (state, action) => {
      state.fetchSpecificPatientsStatus = "failed";
    });
  },
});

export default patientsSlice.reducer;
export const { flushPatients } = patientsSlice.actions;
