import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: {},
  error: null,
  status: "idle",
};

const blockSlice = createSlice({
  name: "block",
  initialState,
  reducers: {
    // Triggers
    updateBlockRequest() {},
    createBlockRequest() {},
    deleteBlockRequest() {},
    fetchBlockRequest(state) {
      state.status = "loading";
      state.error = null;
    },
    fetchBlockSuccess(state, action) {
      state.status = "succeeded";
      state.items = action.payload;
      state.error = null;
    },
    // Success/Failure
    fetchBlockFailure(state, action) {
      state.status = "failed";
      state.error = action.payload || "Failed to load";
    },
    setBlock(state, action) {
      state.items = { ...state.items, ...action.payload };
    },
    resetBlock() {
      return initialState;
    },
  },
});

export const {
  resetBlock,
  setBlock,
  createBlockRequest,
  deleteBlockRequest,
  updateBlockRequest,
  fetchBlockFailure,
  fetchBlockSuccess,
  fetchBlockRequest,
} = blockSlice.actions;

export default blockSlice.reducer;
