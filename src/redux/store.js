import { configureStore } from '@reduxjs/toolkit';
import filterReducer from './slices/FilterSlice.js';
import cartReducer from './slices/CartSlice.js';

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    cart: cartReducer,
  },
});
