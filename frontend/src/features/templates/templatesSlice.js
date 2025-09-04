import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const templatesSlice = createSlice({
  name: "templates",
  initialState,
  reducers: {
    // Triggers
    fetchTemplatesRequest(state) {
      state.status = "loading";
      state.error = null;
    },
    // Success/Failure
    fetchTemplatesSuccess(state, action) {
      state.status = "succeeded";
      state.items = action.payload;
      state.error = null;
    },
    fetchTemplatesFailure(state, action) {
      state.status = "failed";
      state.error = action.payload || "Failed to load";
    },
  },
});

export const {
  fetchTemplatesRequest,
  fetchTemplatesSuccess,
  fetchTemplatesFailure,
} = templatesSlice.actions;

export default templatesSlice.reducer;
