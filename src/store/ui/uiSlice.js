import { createSlice } from "@reduxjs/toolkit";

export const uiSlice = createSlice({
  name: "ui",
  initialState: {
    isEventModalOpen: false,
    isServiceModalOpen: false,
    isEditServiceModalOpen: false,
  },
  reducers: {
    onOpenEventModal: (state) => {
      state.isEventModalOpen = true;
    },
    onOpenServiceModal: (state) => {
      state.isServiceModalOpen = true;
    },
    onOpenEditServiceModal: (state) => {
      state.isEditServiceModalOpen = true;
    },
    onCloseModal: (state) => {
      state.isEventModalOpen = false;
      state.isServiceModalOpen = false;
      state.isEditServiceModalOpen = false;
    },
  },
});

export const {
  onCloseModal,
  onOpenEditServiceModal,
  onOpenEventModal,
  onOpenServiceModal,
} = uiSlice.actions;
