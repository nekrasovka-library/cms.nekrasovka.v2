import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  status: "idle",
  error: null,
  total: 0,
  offset: 0,
};

const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    // Список событий
    fetchEventsRequest(state) {
      state.status = "loading";
      state.error = null;
    },
    fetchEventsSuccess(state, action) {
      state.status = "succeeded";
      state.items = action.payload.data;
      state.total = action.payload.total;
      state.limit = action.payload.limit;
      state.offset = action.payload.offset;
      state.error = null;
    },
    fetchEventsFailure(state, action) {
      state.status = "failed";
      state.error = action.payload || "Failed to load";
    },
    resetEvents() {
      return initialState;
    },
  },
});

export const {
  fetchEventsRequest,
  fetchEventsSuccess,
  fetchEventsFailure,
  resetEvents,
} = eventsSlice.actions;

export default eventsSlice.reducer;
