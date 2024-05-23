import { configureStore } from "@reduxjs/toolkit";
import loggerMiddleware from "./middleware/logger";
import authReducer from "./slices/auth";
import patientsReducer from "./slices/patients";
import notificationsReducer from "./slices/notifications";
import appointmentsReducer from "./slices/appointments";
import surveysReducer from "./slices/surveys";
import reportsReducer from "./slices/reports";

export const store = configureStore({
  reducer: {
    authReducer,
    patientsReducer,
    notificationsReducer,
    appointmentsReducer,
    surveysReducer,
    reportsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loggerMiddleware),
});
