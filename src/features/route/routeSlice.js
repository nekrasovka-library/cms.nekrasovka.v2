import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pathname: "",
  search: "",
  hash: "",
  params: {},
  query: {},
};

const routeSlice = createSlice({
  name: "route",
  initialState,
  reducers: {
    setRoute: (state, action) => {
      const {
        pathname = "",
        search = "",
        hash = "",
        params = {},
        query = {},
      } = action.payload || {};
      state.pathname = pathname;
      state.search = search;
      state.hash = hash;
      state.params = params;
      state.query = query;
    },
    resetRoute: () => initialState,
  },
});

export const { setRoute, resetRoute } = routeSlice.actions;
export default routeSlice.reducer;
