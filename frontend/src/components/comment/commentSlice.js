import { createSlice } from "@reduxjs/toolkit";

export const commentlice = createSlice({
  name: "comments",
  initialState: {
    comments:[],
    isLoading: false,
    error: null,
  },
  reducers: {
    loading(state) {
      state.isLoading = true;
    },
    fetchCommentsStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    fetchCommentsSuccess(state, action) {
      state.comments = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    fetchCommentsFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});