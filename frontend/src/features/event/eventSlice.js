import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  item: null,
  changes: {},
  status: "idle", // idle | loading | succeeded | failed
  error: null,
};

const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    fetchEventRequest(state) {
      state.status = "loading";
      state.error = null;
    },
    fetchEventSuccess(state, action) {
      state.status = "succeeded";
      state.item = action.payload || null;
      state.changes = {};
      state.error = null;
    },
    fetchEventFailure(state, action) {
      state.status = "failed";
      state.error = action.payload || "Failed to load event";
    },
    setEventChanges(state, action) {
      state.changes = action.payload || {};
    },
    resetEvent() {
      return initialState;
    },
  },
});

export const {
  fetchEventRequest,
  fetchEventSuccess,
  fetchEventFailure,
  setEventChanges,
  resetEvent,
} = eventSlice.actions;

export default eventSlice.reducer;
