import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [
    {
      id: 1,
      name: "Roboto",
    },
  ],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const fontsSlice = createSlice({
  name: "fonts",
  initialState,
  reducers: {
    // Triggers
    fetchFontsRequest(state) {
      state.status = "loading";
      state.error = null;
    },
    // Success/Failure
    fetchFontsSuccess(state, action) {
      state.status = "succeeded";
      state.items = action.payload;
      state.error = null;
    },
    fetchFontsFailure(state, action) {
      state.status = "failed";
      state.error = action.payload || "Failed to load";
    },
    setFontsRequest(state) {
      state.status = "loading";
      state.error = null;
    },
    resetMenus() {
      return initialState;
    },
  },
});

export const {
  fetchFontsRequest,
  fetchFontsSuccess,
  fetchFontsFailure,
  setFontsRequest,
  resetFonts,
} = fontsSlice.actions;
export default fontsSlice.reducer;
