import React from "react";
import { useState } from "react";

const Comments = () => {
  const [comment, setComment] = React.useState("");
  const [comments, setComments] = React.useState([]);
  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };
  const handleAddComment = () => {
    if (comment.trim() !== "") {
      setComments([...comments, comment]);
      setComment("");
    }
  };
  return (
    <div>
      {" "}
      <h2>Comments:</h2>
      {comments.map((comment, index) => (
        <p key={index}>{comment}</p>
      ))}
      <input
        type="text"
        placeholder="Add a comment..."
        value={comment}
        onChange={handleCommentChange}
      />{" "}
      <button onClick={handleAddComment}>Add Comment</button>{" "}
    </div>
  );
};
export default Comments;
