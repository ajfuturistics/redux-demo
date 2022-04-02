import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: { notification: null },
  reducers: {
    showNotification(state, action) {
      state.notification = {
        message: action.payload.message,
        type: action.payload.type,
        show: action.payload.show,
      };
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
