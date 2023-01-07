import React from "react";
import styled from "styled-components";
import BookModel from "../../models/BookModel";
import ReviewStars from "./ReviewStars";

interface BookDescriptionProps {
  book: BookModel | undefined;
  rating: number;
}

const BookDescriptionDiv = styled.div`
  // border: 5px solid orange;
  display: flex;
  align-items: start;
  gap: 2rem;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const BookImg = styled.img`
  width: 28%;

  @media (max-width: 480px) {
    width: 60vw;
  }
`;

const BookDiv = styled.div`
  display: flex;
  flex-direction: column;

  h3 {
    font-weight: 700;
  }

  span {
    font-weight: 500;
  }

  p {
    margin-top: 1rem;
  }

  span,
  p {
    font-size: 1rem;
  }
`;

const RatingDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const BookDescription = ({ book, rating }: BookDescriptionProps) => {
  if (!book?.title) {
    return <div>No Books Found</div>;
  }

  return (
    <BookDescriptionDiv>
      <BookImg src={book.img ? book.img : ""} />
      <BookDiv>
        <h3>{book.title}.</h3>
        <span>by {book.author}</span>

        <RatingDiv>
          <ReviewStars rating={rating} />
          <span>{rating ? rating.toFixed(1) : "No Ratings Yet"}</span>
        </RatingDiv>

        <p>{book.description}</p>
      </BookDiv>
    </BookDescriptionDiv>
  );
};

export default BookDescription;
