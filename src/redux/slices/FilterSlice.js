import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categoryId: 0,
  sort: { name: 'популярности (вниз)', sortProperty: 'rating' },
  searchValue: '',
};

export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    setSortType(state, action) {
      state.sort = action.payload;
    },
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCategoryId, setSortType, setSearchValue } = filterSlice.actions;

export default filterSlice.reducer;
