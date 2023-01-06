import React from "react";
import styled from "styled-components";
import BookModel from "../../models/BookModel";

interface BookDescriptionProps {
  book: BookModel | undefined;
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
    color: var(--main-yellow);
    font-weight: 500;
  }

  p {
    margin-top: 1rem;
  }

  span,
  p {
    font-size: 16px;
  }
`;

const BookDescription = ({ book }: BookDescriptionProps) => {
  if (!book?.title) {
    return <div>No Books Found</div>;
  }

  return (
    <BookDescriptionDiv>
      <BookImg src={book.img ? book.img : ""} />
      <BookDiv>
        <h3>{book.title}.</h3>
        <span>{book.author}</span>
        <p>{book.description}</p>
      </BookDiv>
    </BookDescriptionDiv>
  );
};

export default BookDescription;
