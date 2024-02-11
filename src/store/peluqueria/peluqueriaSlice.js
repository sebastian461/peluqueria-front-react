import { createSlice } from "@reduxjs/toolkit";
import { addHours } from "date-fns";

/* const tempEvent = {
  id: 1,
  title: "Corte normal",
  amount: 2.5,
  start: new Date(),
  end: addHours(new Date(), 1),
  user: {
    id: 1,
    name: "Sebastián",
  },
}; */

export const peluqueriaSlice = createSlice({
  name: "peluqueria",
  initialState: {
    services: [],
    events: [],
    activeEvent: null,
    activeService: null,
  },
  reducers: {
    onSetActiveEvent: (state, { payload }) => {
      state.activeEvent = payload;
    },
    onSetActiveService: (state, { payload }) => {
      state.activeService = payload;
    },
    onAddNewEvent: (state, { payload }) => {
      state.events.push(payload);
    },
    onAddNewService: (state, { payload }) => {
      state.services.push(payload);
    },
    onUpdateService: (state, { payload }) => {
      state.services = state.services.map((s) => {
        return s.id === payload.id ? payload : s;
      });
    },
    onDeleteService: (state, { payload }) => {
      state.services = state.services.filter((s) => s.id !== payload.id);
      state.activeService = null;
    },
    onGetServices: (state, { payload }) => {
      state.services = payload;
    },
    onGetEvents: (state, { payload }) => {
      state.events = payload;
    },
  },
});

export const {
  onAddNewEvent,
  onAddNewService,
  onDeleteService,
  onGetEvents,
  onGetServices,
  onSetActiveEvent,
  onSetActiveService,
  onUpdateService,
} = peluqueriaSlice.actions;
