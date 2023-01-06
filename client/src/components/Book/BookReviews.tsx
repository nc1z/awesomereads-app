import React from "react";
import styled from "styled-components";

const BookReviewsDiv = styled.div`
  // border: 5px solid lime;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
`;

const BookReviews = () => {
  return (
    <BookReviewsDiv>
      <hr />
      <div>
        <h3>Community Reviews</h3>
      </div>
      <div>Review Overall Rating Component</div>
      <div>Display Reviews Component</div>
    </BookReviewsDiv>
  );
};

export default BookReviews;
