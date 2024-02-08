import { createSlice } from "@reduxjs/toolkit";

export const uiSlice = createSlice({
  name: "ui",
  initialState: {
    isEventModalOpen: true,
  },
  reducers: {
    onOpenEventModal: (state) => {
      state.isEventModalOpen = true;
    },
    onCloseModal: (state) => {
      state.isEventModalOpen = false;
    },
  },
});

export const { onOpenEventModal, onCloseModal } = uiSlice.actions;
