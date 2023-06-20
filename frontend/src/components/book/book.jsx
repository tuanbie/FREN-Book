import React, { useState } from "react";
import { Card } from "react-bootstrap";
import "./Book.scss";

import CommentPopup from "../comment/commentPopup";
import config from "../../config";

function Book({ book, comments }) {
  const [showPopup, setShowPopup] = useState(false);

  const handleCommentClick = () => {
    setShowPopup(true);
  };

  return (
    <Card style={{ width: "18rem", margin: "10px" }}>
      <Card.Body>
        <Card.Title>{book.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{book.author}</Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">
          {book.publishedDate}
        </Card.Subtitle>
        <Card.Text>{book.description}</Card.Text>
        <Card.Subtitle className="mb-2 text-muted">
          {book.price} $
        </Card.Subtitle>
        <Card.Link href="#" onClick={handleCommentClick}>
        {config.textCmt.comment}
        </Card.Link>
      </Card.Body>
      {showPopup && (
        <CommentPopup
          comments={comments}
          book={book}
          onClose={() => setShowPopup(false)}
        />
      )}
    </Card>
  );
}

export default Book;
