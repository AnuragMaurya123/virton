// src/store.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slice/authSlice";
import { partnerReducer } from "@/slice/partnerSlice";
import { promotersReducer } from "@/slice/promoterSlice";


const store = configureStore({
  reducer: {
    auth: authReducer,
    partners:partnerReducer,
    promoters:promotersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
