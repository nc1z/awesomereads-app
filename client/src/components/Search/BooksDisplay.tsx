import React from "react";
import { Container } from "react-bootstrap";
import styled from "styled-components";
import BookModel from "../../models/BookModel";
import { StyledLink } from "../../Utils/StyledExports";

interface BooksDisplayProps {
  books: BookModel[];
}

const BooksContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  padding: 1rem 0;
  overflow: auto;
`;

const BookContainer = styled(Container)`
  display: flex;
  justify-content: start;
  align-items: center;
  width: 80%;
  font-size: 1rem;
  gap: 2rem;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: start;
  }
`;

const BookDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const BookImg = styled.img`
  width: 10%;

  @media (max-width: 480px) {
    width: 60vw;
  }
`;

const BookTitleHeader = styled.h3`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: start;
    gap: 0.5rem;
  }
`;

const BooksDisplay = ({ books }: BooksDisplayProps) => {
  return (
    <BooksContainer>
      {books.map((book: BookModel) => (
        <BookContainer key={book.title}>
          <BookImg src={book.img} />
          <BookDiv>
            <span>{book.author}</span>
            <BookTitleHeader>
              {book.title}
              <StyledLink to={`/book/${book.id}`}>Learn more</StyledLink>
            </BookTitleHeader>
            <p>{book.description}</p>
          </BookDiv>
        </BookContainer>
      ))}
    </BooksContainer>
  );
};

export default BooksDisplay;
