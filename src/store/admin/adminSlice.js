import { createSlice } from "@reduxjs/toolkit";

export const adminSlice = createSlice({
  name: "admin",
  initialState: {
    users: [],
  },
  reducers: {
    onLoadUsers: (state, { payload }) => {
      state.users = payload;
    },
  },
});

export const { onLoadUsers } = adminSlice.actions;
