import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
import studentQrSlice from "./student-slice";
import staffQrSlice from "./staff-slice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    studentQR: studentQrSlice,
    staffQr: staffQrSlice,
  },
});

export default store;
