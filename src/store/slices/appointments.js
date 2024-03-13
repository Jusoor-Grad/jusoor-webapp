/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "@/shared/api/axiosConfig";
import i18n from "../../i18n";
import axios from "axios";

const initialState = {
  fetchTimeSlotsStatus: "idle",
  fetchSpecificTimeSlotStatus: "idle",
  createRepeatingTimeSlotsStatus: "idle",
  createAbsoluteTimeSlotsStatus: "idle",
  fetchAppointmentsStatus: "idle",
  createAppointmentStatus: "idle",
  fetchReferralsStatus: "idle",
};

export const getReferrals = createAsyncThunk(
  "appointments/getReferrals",
  async (data, thunkAPI) => {
    const response = await axiosInstance.get(
      `referrals/`,
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

export const createAppointment = createAsyncThunk(
  "appointments/createAppointment",
  async (data, thunkAPI) => {
    const response = await axiosInstance.post(
      `appointments/`,
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

export const getAppointments = createAsyncThunk(
  "appointments/getAppointments",
  async (data, thunkAPI) => {
    const response = await axiosInstance.get(
      `appointments/`,
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

export const createAbsoluteTimeSlots = createAsyncThunk(
  "appointments/createAbsoluteTimeSlots",
  async (data, thunkAPI) => {
    const response = await axiosInstance.post(
      `timeslots/`,
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

export const createRepeatingTimeSlots = createAsyncThunk(
  "appointments/createRepeatingTimeSlots",
  async (data, thunkAPI) => {
    const response = await axiosInstance.post(
      `timeslots/batch_create/`,
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

export const getTimeSlot = createAsyncThunk(
  "appointments/getTimeSlot",
  async (data, thunkAPI) => {
    const response = await axiosInstance.get(
      `timeslots/${data.id}/`,
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

export const getTimeSlots = createAsyncThunk(
  "appointments/getTimeSlots",
  async (data, thunkAPI) => {
    const response = await axiosInstance.get(
      "timeslots/",
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

export const appointmentsSlice = createSlice({
  name: "appointments",
  initialState,
  reducers: {
    flushPatients: (state, action) => {
      return { ...initialState };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getReferrals.fulfilled, (state, action) => {
      state.fetchReferralsStatus = "succeeded";
    });
    builder.addCase(getReferrals.pending, (state, action) => {
      state.fetchReferralsStatus = "loading";
    });
    builder.addCase(getReferrals.rejected, (state, action) => {
      state.fetchReferralsStatus = "failed";
    });
    builder.addCase(createAppointment.fulfilled, (state, action) => {
      state.createAppointmentStatus = "succeeded";
    });
    builder.addCase(createAppointment.pending, (state, action) => {
      state.createAppointmentStatus = "loading";
    });
    builder.addCase(createAppointment.rejected, (state, action) => {
      state.createAppointmentStatus = "failed";
    });
    builder.addCase(getAppointments.fulfilled, (state, action) => {
      state.fetchAppointmentsStatus = "succeeded";
    });
    builder.addCase(getAppointments.pending, (state, action) => {
      state.fetchAppointmentsStatus = "loading";
    });
    builder.addCase(getAppointments.rejected, (state, action) => {
      state.fetchAppointmentsStatus = "failed";
    });
    builder.addCase(createAbsoluteTimeSlots.fulfilled, (state, action) => {
      state.createAbsoluteTimeSlotsStatus = "succeeded";
    });
    builder.addCase(createAbsoluteTimeSlots.pending, (state, action) => {
      state.createAbsoluteTimeSlotsStatus = "loading";
    });
    builder.addCase(createAbsoluteTimeSlots.rejected, (state, action) => {
      state.createAbsoluteTimeSlotsStatus = "failed";
    });
    builder.addCase(createRepeatingTimeSlots.fulfilled, (state, action) => {
      state.createRepeatingTimeSlotsStatus = "succeeded";
    });
    builder.addCase(createRepeatingTimeSlots.pending, (state, action) => {
      state.createRepeatingTimeSlotsStatus = "loading";
    });
    builder.addCase(createRepeatingTimeSlots.rejected, (state, action) => {
      state.createRepeatingTimeSlotsStatus = "failed";
    });
    builder.addCase(getTimeSlot.fulfilled, (state, action) => {
      state.fetchSpecificTimeSlotStatus = "succeeded";
    });
    builder.addCase(getTimeSlot.pending, (state, action) => {
      state.fetchSpecificTimeSlotStatus = "loading";
    });
    builder.addCase(getTimeSlot.rejected, (state, action) => {
      state.fetchSpecificTimeSlotStatus = "failed";
    });
    builder.addCase(getTimeSlots.fulfilled, (state, action) => {
      state.fetchTimeSlotsStatus = "succeeded";
    });
    builder.addCase(getTimeSlots.pending, (state, action) => {
      state.fetchTimeSlotsStatus = "loading";
    });
    builder.addCase(getTimeSlots.rejected, (state, action) => {
      state.fetchTimeSlotsStatus = "failed";
    });
  },
});

export default appointmentsSlice.reducer;
export const { flushPatients } = appointmentsSlice.actions;
