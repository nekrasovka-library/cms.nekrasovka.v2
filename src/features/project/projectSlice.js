import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: {},
  changes: {},
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    // Triggers
    fetchProjectRequest(state) {
      state.status = "loading";
      state.error = null;
    },
    // Success/Failure
    fetchProjectSuccess(state, action) {
      state.status = "succeeded";
      state.items = action.payload;
      state.changes = {};
      state.error = null;
    },
    fetchProjectFailure(state, action) {
      state.status = "failed";
      state.error = action.payload || "Failed to load";
    },
    setProjectChanges(state, action) {
      state.changes = action.payload;
    },
    updateProjectRequest() {},
    createInProjectPageRequest() {},
    deleteInProjectPageRequest() {},
    updateInProjectPageRequest() {},
    resetProject() {
      return initialState;
    },
  },
});

export const {
  fetchProjectRequest,
  fetchProjectSuccess,
  fetchProjectFailure,
  updateProjectRequest,
  setProjectChanges,
  resetProject,
  createInProjectPageRequest,
  deleteInProjectPageRequest,
  updateInProjectPageRequest,
} = projectSlice.actions;
export default projectSlice.reducer;
