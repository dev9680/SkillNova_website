// src/slices/catalogSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  catalog: [],
};

const catalogSlice = createSlice({
  name: "catalog",
  initialState,
  reducers: {
    setCatalog: (state, action) => {
      state.catalog = action.payload;
    },
  },
});

export const { setCatalog } = catalogSlice.actions;
export default catalogSlice.reducer;
