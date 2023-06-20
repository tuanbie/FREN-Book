import { createSlice } from "@reduxjs/toolkit";

export const bookSlice = createSlice({
  name: "book",
  initialState: {
    books: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    loading(state) {
      state.isLoading = true;
    },
    fetchBooksStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    fetchBooksSuccess(state, action) {
      state.books = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    fetchBooksFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});
