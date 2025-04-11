import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';
import { SortItem } from './FilterSlice';

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

type PizzaItem = {
  id: string;
  title: string;
  type: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
};

export type SearchPizzaParams = {
  category: string;
  sortBy: SortItem;
  order: string;
  search: string;
  currentPage: number;
};

export const fetchAllPizzas = createAsyncThunk<PizzaItem[], SearchPizzaParams>(
  'pizza/fetchByPizzas',
  async (params) => {
    const { category, sortBy, order, search, currentPage } = params;

    const query = `${category}&page=${currentPage}&limit=4&sortBy=${sortBy.sortProperty}&order=${order}${search}`;

    const { data } = await axios.get<PizzaItem[]>(
      `https://67e142aa58cc6bf7852504fb.mockapi.io/items?${query}`
    );

    return data;
  }
);

interface PizzaSliceState {
  items: PizzaItem[];
  status: Status;
}

const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING,
};

export const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {
    setPizzas(state, action: PayloadAction<PizzaItem[]>) {
      state.items = action.payload;
    },
  },

  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchAllPizzas.pending, (state) => {
      state.items = [];
      state.status = Status.LOADING;
      console.log('Идет отправка');
    });
    builder.addCase(fetchAllPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
      console.log('Все ОК!');
    });
    builder.addCase(fetchAllPizzas.rejected, (state, action) => {
      state.items = [];
      state.status = Status.ERROR;
      console.log('Была ошибка!');
    });
  },
});

export const getPizzasSelector = (state: RootState) => state.pizzas;
// Action creators are generated for each case reducer function
export const { setPizzas } = pizzasSlice.actions;

export default pizzasSlice.reducer;
