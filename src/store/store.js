import { configureStore } from "@reduxjs/toolkit";
import { uiSlice } from "./ui/uiSlice";
import { peluqueriaSlice } from "./peluqueria/peluqueriaSlice";
import { authSlice } from "./auth/authSlice";
import { adminSlice } from "./admin/adminSlice";

export const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    auth: authSlice.reducer,
    peluqueria: peluqueriaSlice.reducer,
    admin: adminSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
