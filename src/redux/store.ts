import { configureStore } from '@reduxjs/toolkit';
import filterReducer from './slices/FilterSlice';
import cartReducer from './slices/CartSlice';
import pizzasSlice from './slices/PizzasSlice';
import { useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    cart: cartReducer,
    pizzas: pizzasSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

// type AppDispatch = typeof store.dispatch;
// export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
