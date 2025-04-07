import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchAllPizzas = createAsyncThunk('pizza/fetchByPizzas', async (params) => {
  const { category, sortBy, order, search, currentPage } = params;

  const query = `${category}&page=${currentPage}&limit=4&sortBy=${sortBy}&order=${order}${search}`;
  const { data } = await axios.get(`https://67e142aa58cc6bf7852504fb.mockapi.io/items?${query}`);

  return data;
});

const initialState = {
  items: [],
  status: 'loading',
};

export const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {
    setPizzas(state, action) {
      state.items = action.payload;
    },
  },

  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchAllPizzas.pending, (state) => {
      state.items = [];
      state.status = 'loading';
      console.log('Идет отправка');
    });
    builder.addCase(fetchAllPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = 'success';
      console.log('Все ОК!');
    });
    builder.addCase(fetchAllPizzas.rejected, (state, action) => {
      state.items = [];
      state.status = 'error';
      console.log('Была ошибка!');
    });
  },
});

// Action creators are generated for each case reducer function
export const { setPizzas } = pizzasSlice.actions;

export default pizzasSlice.reducer;
