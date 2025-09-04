import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: {},
  changes: {},
  error: null,
  status: "idle",
};

const pageSlice = createSlice({
  name: "page",
  initialState,
  reducers: {
    // Triggers
    fetchPageRequest(state) {
      state.status = "loading";
      state.error = null;
    },
    // Success/Failure
    fetchPageSuccess(state, action) {
      state.status = "succeeded";
      state.items = action.payload;
      state.changes = {};
      state.error = null;
    },
    fetchPageFailure(state, action) {
      state.status = "failed";
      state.error = action.payload || "Failed to load";
    },
    updatePageRequest(state) {
      state.status = "loading";
      state.error = null;
    },
    createPageRequest(state) {
      state.status = "loading";
      state.error = null;
    },
    deletePageRequest(state) {
      state.status = "loading";
      state.error = null;
    },
    setPageChanges(state, action) {
      state.changes = action.payload;
    },
    resetPage() {
      return initialState;
    },
  },
});

export const {
  fetchPageRequest,
  fetchPageSuccess,
  fetchPageFailure,
  updatePageRequest,
  createPageRequest,
  deletePageRequest,
  setPageChanges,
  resetPage,
} = pageSlice.actions;

export default pageSlice.reducer;
