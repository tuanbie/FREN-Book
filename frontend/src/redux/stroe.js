import { configureStore } from '@reduxjs/toolkit';
import {bookSlice} from '../pages/book/booksilce';
import { commentlice } from '../components/comment/commentSlice';

const store = configureStore({
  reducer: {
    books: bookSlice.reducer,
    comments : commentlice.reducer
  },
});

export default store;