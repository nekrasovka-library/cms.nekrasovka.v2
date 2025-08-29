import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'б
  error: null,
};

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    // Triggers
    fetchProjectsRequest(state) {
      state.status = "loading";
      state.error = null;
    },
    // Success/Failure
    fetchProjectsSuccess(state, action) {
      state.status = "succeeded";
      state.items = action.payload;
      state.error = null;
    },
    fetchProjectsFailure(state, action) {
      state.status = "failed";
      state.error = action.payload || "Failed to load";
    },
    createProjectRequest(state) {
      state.status = "loading";
      state.error = null;
    },
    resetProjects() {
      return initialState;
    },
  },
});

export const {
  fetchProjectsRequest,
  fetchProjectsSuccess,
  fetchProjectsFailure,
  createProjectRequest,
  resetProjects,
} = projectsSlice.actions;
export default projectsSlice.reducer;
