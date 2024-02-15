import { createSlice } from "@reduxjs/toolkit";

export const uiSlice = createSlice({
  name: "ui",
  initialState: {
    isEditServiceModalOpen: false,
    isEventModalOpen: false,
    isReportModalOpen: false,
    isServiceModalOpen: false,
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
    onOpenReportModal: (state) => {
      state.isReportModalOpen = true;
    },
    onCloseModal: (state) => {
      state.isEditServiceModalOpen = false;
      state.isEventModalOpen = false;
      state.isReportModalOpen = false;
      state.isServiceModalOpen = false;
    },
  },
});

export const {
  onCloseModal,
  onOpenEditServiceModal,
  onOpenEventModal,
  onOpenReportModal,
  onOpenServiceModal,
} = uiSlice.actions;
