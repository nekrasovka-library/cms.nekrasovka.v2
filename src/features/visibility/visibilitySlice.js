import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSettingsVisible: false,
  isContentVisible: false,
  isDecorationVisible: false,
  isMenusVisible: false,
  isPreviewVisible: false,
};

const visibilitySlice = createSlice({
  name: "visibility",
  initialState,
  reducers: {
    // Triggers
    setSettingsVisibility(state) {
      state.isSettingsVisible = !state.isSettingsVisible;
    },
    setContentVisibility(state) {
      state.isContentVisible = !state.isContentVisible;
    },
    setDecorationVisibility(state) {
      state.isDecorationVisible = !state.isDecorationVisible;
    },
    setMenusVisibility(state) {
      state.isMenusVisible = !state.isMenusVisible;
    },
    setPreviewVisibility(state) {
      state.isPreviewVisible = !state.isPreviewVisible;
    },
    resetVisibility() {
      return initialState;
    },
  },
});

export const {
  setSettingsVisibility,
  setContentVisibility,
  setDecorationVisibility,
  setMenusVisibility,
  setPreviewVisibility,
  resetVisibility,
} = visibilitySlice.actions;

export default visibilitySlice.reducer;
