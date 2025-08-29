import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  variants: [],
  isVariantsLoaded: false,
  id: null,
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const menusSlice = createSlice({
  name: "menus",
  initialState,
  reducers: {
    // Triggers
    fetchMenusRequest(state) {
      state.status = "loading";
      state.error = null;
    },
    // Success/Failure
    fetchMenusSuccess(state, action) {
      state.status = "succeeded";
      state.items = action.payload;
      state.error = null;
    },
    fetchMenusFailure(state, action) {
      state.status = "failed";
      state.error = action.payload || "Failed to load";
    },
    setMenusVariants(state, action) {
      state.isVariantsLoaded = true;
      state.variants = state.items.find(
        (f) => f.id === action.payload.id,
      ).variants;
      state.id = action.payload.id;
    },
    resetMenus() {
      return initialState;
    },
  },
});

export const {
  fetchMenusRequest,
  fetchMenusSuccess,
  fetchMenusFailure,
  setMenusVariants,
  resetMenus,
} = menusSlice.actions;
export default menusSlice.reducer;
