import axios from "axios";
import { commentlice } from "../../src/components/comment/commentSlice";
const { comments } = require("../data/commentsData");

export const getAllComments = async (dispatch) => {
  try {
    const response = await axios.get("http://localhost:3000/comment");
    dispatch(commentlice.actions.fetchCommentsSuccess(response.data.comment));
  } catch (error) {
    // console.error("Error fetching comment:", error);
    // throw error;
    dispatch(commentlice.actions.fetchCommentsSuccess(comments));
  }
};

export const addComment = async (listComment, dispatch) => {
  let newCommen = [...comments, ...listComment];
  try {
    dispatch(commentlice.actions.fetchCommentsSuccess(newCommen));
  } catch (error) {
    // console.error("Error fetching comment:", error);
    dispatch(commentlice.actions.fetchCommentsSuccess(newCommen));
  }
};

export const addReply = async (updatedCommentsWithReply, dispatch) => {
  
  try {
    dispatch(commentlice.actions.fetchCommentsSuccess(updatedCommentsWithReply));
  } catch (error) {
    // console.error("Error fetching comment:", error);
    dispatch(commentlice.actions.fetchCommentsSuccess(updatedCommentsWithReply));
    // console.log(updatedCommentsWithReply)
  }
};
