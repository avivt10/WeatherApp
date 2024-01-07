import { configureStore } from "@reduxjs/toolkit";
import favoriteSlice from "./features/favoriteSlice";
import citySlice from "./features/citySlice";
import switchModeSlice from "./features/switchMode";
import tempUnitSlice from "./features/tempUnitSlice";

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const store = configureStore({
  reducer: {
    favoriteSlice,
    citySlice,
    switchModeSlice,
    tempUnitSlice,
  },
});
