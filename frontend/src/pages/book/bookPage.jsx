import React, { useEffect } from "react";
import * as bookService from "../../services/bookService";
import * as commentService from "../../services/commentService";
import { useDispatch, useSelector } from "react-redux";
import { booksSelector, commentsSelector } from "../../redux/selector";
import { Col, Row } from "react-bootstrap";
import Book from "../../components/book/book";
import "./bookPageStyle.scss"

function HomePage() {
  const dispatch = useDispatch();
  const listBook = useSelector(booksSelector);
  const listComment = useSelector(commentsSelector);

  useEffect(() => {
    bookService.getAllProducts(dispatch);
    commentService.getAllComments(dispatch)
  }, []);

  const getCommentsByBookId = (bookId) => {
    return listComment.filter(comment => comment.idBook === bookId);
  };

  return (
    <div className="bookPage">
      <h2>Book List</h2>
      <Row>
        {listBook?.map((book, index) => (
          <Col key={index} > 
            <Book book={book} comments={getCommentsByBookId(book.id)} />
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default HomePage;
