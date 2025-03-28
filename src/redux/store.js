import { configureStore } from '@reduxjs/toolkit';
import filterReducer from './slices/FilterSlice.js';

export const store = configureStore({
  reducer: {
    filter: filterReducer,
  },
});
