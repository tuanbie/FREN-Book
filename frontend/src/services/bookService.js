import axios from "axios";
import { bookSlice } from "../pages/book/booksilce";
const books = require("../data/booksData");

export const getAllProducts = async (dispatch) => {
  try {
    const response = await axios.get("http://localhost:3000/books");
    dispatch(bookSlice.actions.fetchBooksSuccess(response.data.book));
  } catch (error) {
    console.error("Error fetching books:", error);
    // throw error;
    dispatch(bookSlice.actions.fetchBooksSuccess(books));
  }
};
