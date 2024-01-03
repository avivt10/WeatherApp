import { configureStore } from '@reduxjs/toolkit';
import favoriteSlice from './features/favoriteSlice';
import citySlice from './features/citySlice';
import switchModeSlice from './features/switchMode';
import switchConvertTempSlice from './features/switchConvertTemp';

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const store = configureStore({
    reducer: {
        favoriteSlice,
        citySlice,
        switchModeSlice,
        switchConvertTempSlice
    }
});


