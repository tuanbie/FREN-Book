import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import * as commentService from "../../services/commentService";
import config from "../../config";

import "./commentPopup.scss";
import { commentsSelector } from "../../redux/selector";

function CommentPopup({ book, comments, onClose }) {
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [repply, setReply] = useState("");
  const [listComment, setListComment] = useState([]);
  const listComments = useSelector(commentsSelector);

  const handleReplyChange = (e) => {
    e.preventDefault();
    const newReply = {
      content: repply,
      idBook: book.id,
    };
    const updatedComments = listComments.filter(
      (comment) => comment.idBook !== repply.idBook
    );
    const updatedComment = {
      ...listComments.find((comment) => comment.idBook === repply.idBook),
      // replies: [newReply],
    };
    console.log(listComments)
    const updatedCommentsWithReply = [...updatedComments, updatedComment];
    // console.log(newComment)
    commentService.addReply(updatedCommentsWithReply, dispatch);
    // console.log(updatedCommentsWithReply)
    setReply("");
  };
  // onsole.log(comments[1])
  const handleSubmitComment = (e) => {
    e.preventDefault();
    const newComment = {
      content: comment,
      idBook: book.id,
    };
    setListComment((prev) => [...prev, newComment]);

    // console.log(newComment)
    commentService.addComment(listComment, dispatch);
    setComment("");
  };

  return (
    <Modal show={true} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{book.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {comments && comments.length > 0 ? (
            comments.map((value, index) => (
              <React.Fragment key={index}>
                <h6 style={{ marginTop: "10px" }}>
                  <strong>User</strong>
                </h6>
                <p>{value.content}</p>
                {value.replies && value.replies.length > 0 ? (
                  <div style={{ marginLeft: "20px" }}>
                    <h6>{config.textCmt.replies} </h6>
                    {value.replies.map((reply, replyIndex) => (
                      <div key={replyIndex}>
                        <p>{reply.content}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{ marginLeft: "20px" }}>
                    <span
                      onClick={() => setShowReplyForm(true)}
                      style={{
                        color: "blue",
                        cursor: "pointer",
                      }}
                    >
                      {config.textCmt.rep}
                    </span>
                    {showReplyForm && (
                      <div>
                        <Form.Group>
                          <Form.Label style={{ marginTop: "10px" }}>
                            {config.textCmt.rep}
                          </Form.Label>
                          <Form.Control
                            rows={3}
                            name="repply"
                            value={repply}
                            onChange={(e) => setReply(e.target.value)}
                          />
                          <Button variant="primary" onClick={handleReplyChange}>
                            {config.textCmt.send}
                          </Button>
                        </Form.Group>
                      </div>
                    )}
                  </div>
                )}
              </React.Fragment>
            ))
          ) : (
            <p>{config.textCmt.notComment}</p>
          )}

          <Form.Group controlId="comment">
            <Form.Label style={{ marginTop: "10px" }}>
              {config.textCmt.writeComment}
            </Form.Label>
            <Form.Control
              rows={3}
              name="comment"
              value={comment}
              required
              onChange={(e) => setComment(e.target.value)}
            />
            <Button variant="primary" onClick={handleSubmitComment}>
              {config.textCmt.send}
            </Button>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Đóng
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CommentPopup;
