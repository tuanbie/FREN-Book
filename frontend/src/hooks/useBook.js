// import { useSelector, useDispatch } from 'react-redux';
// import {
//   fetchBooksAsync,
//   fetchBooksStart,
//   fetchBooksSuccess,
//   fetchBooksFailure,
// } from '../pages/book/booksilce';

// export function useBooks() {
//   const dispatch = useDispatch();
//   const books = useSelector((state) => state.books.books);
//   const isLoading = useSelector((state) => state.books.isLoading);
//   const error = useSelector((state) => state.books.error);

//   const fetchBooks = async () => {
//     try {
//       dispatch(fetchBooksStart());
//       const books = await fetchBooksAsync();
//       dispatch(fetchBooksSuccess(books));
//     } catch (error) {
//       dispatch(fetchBooksFailure(error.message));
//     }
//   };

//   return { books, isLoading, error, fetchBooks };
// }
