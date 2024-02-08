import { createSlice } from "@reduxjs/toolkit";
import { addHours } from "date-fns";

const tempEvent = {
  id: 1,
  title: "Corte normal",
  amount: 2.5,
  start: new Date(),
  end: addHours(new Date(), 1),
  user: {
    id: 1,
    name: "Sebastián",
  },
};

export const peluqueriaSlice = createSlice({
  name: "peluqueria",
  initialState: {
    services: [
      {
        id: 1,
        name: "Corte normal",
        amount: 2.5,
      },
      {
        id: 2,
        name: "Corte con barba",
        amount: 3,
      },
    ],
    events: [tempEvent],
    activeEvent: null,
  },
  reducers: {
    onSetActiveEvent: (state, { payload }) => {
      state.activeEvent = payload;
    },
  },
});

export const { onSetActiveEvent } = peluqueriaSlice.actions;
