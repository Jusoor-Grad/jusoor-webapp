import { configureStore } from "@reduxjs/toolkit";
import loggerMiddleware from "./middleware/logger";
import authReducer from "./slices/auth";
import patientsReducer from "./slices/patients";

export const store = configureStore({
  reducer: {
    authReducer,
    patientsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loggerMiddleware),
});
