import { configureStore } from "@reduxjs/toolkit";
import { uiSlice } from "./ui/uiSlice";
import { peluqueriaSlice } from "./peluqueria/peluqueriaSlice";

export const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    peluqueria: peluqueriaSlice.reducer,
  },
});
