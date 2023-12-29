import { configureStore } from '@reduxjs/toolkit';
import searchSlice from './features/searchSlice';

const store = configureStore({
    reducer: {
        searchSlice
    }
});

export default store;