/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "@/shared/api/axiosConfig";
import i18n from "../../i18n";
import axios from "axios";
import validation from "@/shared/utils/validation";
import { showFlashMessage } from "./notifications";
import { formulateErrorMessage } from "@/shared/utils/formulateErrorMessage";
import { formatISO } from "date-fns";
import moment from "moment";
import i18next from "i18next";

const initialState = {
  fetchTimeSlotsStatus: "idle",
  fetchSpecificTimeSlotStatus: "idle",
  createRepeatingTimeSlotsStatus: "idle",
  createAbsoluteTimeSlotsStatus: "idle",
  fetchAppointmentsStatus: "idle",
  createAppointmentStatus: "idle",
  fetchReferralsStatus: "idle",
  fetchAppointmentsCountStatus: "idle",
  fetchSpecificPatientsAppointmentsStatus: "idle",
  appointmentsCount: null,
  specificPatientsAppointments: [],
  appointments: [],
  specificPatientsAppointmentsCount: null,
  tableCount: null,
  fetchUpcomingAppointmentsCountStatus: "idle",
  upcomingAppointmentsCount: null,
  timeslot: null,
  timeslots: null,
  confirmAppointmentStatus: "idle",
};

export const getSpecificPatientsAppointments = createAsyncThunk(
  "appointments/getSpecificPatientsAppointments",
  async (data, thunkAPI) => {
    let url = `appointments/?patient=${data.id}&page=${data.page}&page_size=${data.page_size}`;
    if (!validation.isEmpty(data.search)) {
      url += `&timeslot__therapist__user__username__icontains=${data.search}`;
    }
    if (
      !validation.isEmpty(data.date) &&
      !validation.isEmpty(data.date.from) &&
      !validation.isEmpty(data.date.to)
    ) {
      const fromDateISO = formatISO(new Date(data.date.from), {
        representation: "date",
      }); // Convert from date to ISO string
      const toDateISO = formatISO(new Date(data.date.to), {
        representation: "date",
      }); // Convert to date to ISO string
      url += `&start_at__gte=${fromDateISO}&start_at__lte=${toDateISO}`;
    }
    const response = await axiosInstance.get(
      url,
      {},
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
export const confirmAppointment = createAsyncThunk(
  "appointments/confirmAppointment",
  async (data, thunkAPI) => {
    const response = await axiosInstance.patch(
      `appointments/${data.id}/confirm/`,
      {},
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
export const getAppointmentsCount = createAsyncThunk(
  "appointments/getAppointmentsCount",
  async (data, thunkAPI) => {
    const response = await axiosInstance.get(
      `appointments/count/`,
      {},
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
export const getUpcomingAppointmentsCount = createAsyncThunk(
  "appointments/getUpcomingAppointmentsCount",
  async (data, thunkAPI) => {
    const response = await axiosInstance.get(
      `appointments/upcoming_count/`,
      {},
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

export const createAppointment = createAsyncThunk(
  "appointments/createAppointment",
  async (data, thunkAPI) => {
    const response = await axiosInstance.post(`appointments/`, data, {
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
      thunkAPI.dispatch(
        showFlashMessage({
          message: i18next.t("appointments.appointmentCreated"),
          severity: "success",
        })
      );
      return response.data;
    }
  }
);

export const getAppointments = createAsyncThunk(
  "appointments/getAppointments",
  async (data, thunkAPI) => {
    let url = "appointments/";
    if (!validation.isEmpty(data.page)) {
      url += `?page=${data.page}&page_size=${data.page_size}`;
    }
    if (!validation.isEmpty(data.search)) {
      url += `&timeslot__therapist__user__username__icontains=${data.search}`;
    }
    if (
      !validation.isEmpty(data.date) &&
      !validation.isEmpty(data.date.from) &&
      !validation.isEmpty(data.date.to)
    ) {
      const fromDateISO = formatISO(new Date(data.date.from), {
        representation: "date",
      }); // Convert from date to ISO string
      const toDateISO = formatISO(new Date(data.date.to), {
        representation: "date",
      }); // Convert to date to ISO string
      url += `&start_at__gte=${fromDateISO}&start_at__lte=${toDateISO}`;
    }
    const response = await axiosInstance.get(
      url,
      {},
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

export const createRepeatingTimeSlots = createAsyncThunk(
  "appointments/createRepeatingTimeSlots",
  async (data, thunkAPI) => {
    const response = await axiosInstance.post(`timeslots/batch_create/`, data, {
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
      thunkAPI.dispatch(
        showFlashMessage({
          message: i18n.t("appointments.timeSlotAdded"),
          severity: "success",
        })
      );
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

export const getTimeSlots = createAsyncThunk(
  "appointments/getTimeSlots",
  async (data, thunkAPI) => {
    const { query } = data;

    const response = await axiosInstance.get(`timeslots/?${query}`, {
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
    flushTimeSlot: (state, action) => {
      state.timeslots = null;
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
      state.appointments = action.payload.data.results;
      state.tableCount = action.payload.data.count;
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
      state.timeslot = action.payload.data;
    });
    builder.addCase(getTimeSlot.pending, (state, action) => {
      state.fetchSpecificTimeSlotStatus = "loading";
    });
    builder.addCase(getTimeSlot.rejected, (state, action) => {
      state.fetchSpecificTimeSlotStatus = "failed";
    });
    builder.addCase(getTimeSlots.fulfilled, (state, action) => {
      state.fetchTimeSlotsStatus = "succeeded";
      state.timeslots = action.payload.data;
    });
    builder.addCase(getTimeSlots.pending, (state, action) => {
      state.fetchTimeSlotsStatus = "loading";
    });
    builder.addCase(getTimeSlots.rejected, (state, action) => {
      state.fetchTimeSlotsStatus = "failed";
    });
    builder.addCase(getAppointmentsCount.fulfilled, (state, action) => {
      state.fetchAppointmentsCountStatus = "succeeded";
      state.appointmentsCount = {
        currentMonth: action.payload.data.current_count,
        lastMonth: action.payload.data.last_month_count,
      };
    });
    builder.addCase(getAppointmentsCount.pending, (state, action) => {
      state.fetchAppointmentsCountStatus = "loading";
    });
    builder.addCase(getAppointmentsCount.rejected, (state, action) => {
      state.fetchAppointmentsCountStatus = "failed";
    });
    builder.addCase(getUpcomingAppointmentsCount.fulfilled, (state, action) => {
      state.fetchUpcomingAppointmentsCountStatus = "succeeded";
      state.upcomingAppointmentsCount = action.payload.data.upcoming_count;
    });
    builder.addCase(getUpcomingAppointmentsCount.pending, (state, action) => {
      state.fetchUpcomingAppointmentsCountStatus = "loading";
    });
    builder.addCase(getUpcomingAppointmentsCount.rejected, (state, action) => {
      state.fetchUpcomingAppointmentsCountStatus = "failed";
    });
    builder.addCase(
      getSpecificPatientsAppointments.fulfilled,
      (state, action) => {
        state.fetchSpecificPatientsAppointmentsStatus = "succeeded";
        state.specificPatientsAppointments = action.payload.data.results;
        state.specificPatientsAppointmentsCount = action.payload.data.count;
      }
    );
    builder.addCase(
      getSpecificPatientsAppointments.pending,
      (state, action) => {
        state.fetchSpecificPatientsAppointmentsStatus = "loading";
      }
    );
    builder.addCase(
      getSpecificPatientsAppointments.rejected,
      (state, action) => {
        state.fetchSpecificPatientsAppointmentsStatus = "failed";
      }
    );
    builder.addCase(confirmAppointment.fulfilled, (state, action) => {
      state.confirmAppointmentStatus = "succeeded";
    });
    builder.addCase(confirmAppointment.pending, (state, action) => {
      state.confirmAppointmentStatus = "loading";
    });
    builder.addCase(confirmAppointment.rejected, (state, action) => {
      state.confirmAppointmentStatus = "failed";
    });
  },
});

export default appointmentsSlice.reducer;
export const { flushPatients, flushTimeSlot } = appointmentsSlice.actions;
