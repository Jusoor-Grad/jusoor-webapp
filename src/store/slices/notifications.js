import { createSlice } from "@reduxjs/toolkit";

const notificationsSlice = createSlice({
  name: "notifications",
  initialState: {
    open: false,
    message: "",
    severity: "info",
  },
  reducers: {
    showFlashMessage: (state, action) => {
      state.open = true;
      state.message = action.payload.message;
      state.severity = action.payload.severity || "info";
    },
    hideFlashMessage: (state) => {
      state.open = false;
      state.message = "";
      state.severity = "info";
    },
  },
});

export const { showFlashMessage, hideFlashMessage } =
  notificationsSlice.actions;
export default notificationsSlice.reducer;
