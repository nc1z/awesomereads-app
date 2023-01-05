import React from "react";
import { Container } from "react-bootstrap";
import styled from "styled-components";
import BookModel from "../../models/BookModel";

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
  justify-content: center;
  align-items: center;
  width: 80%;
  font-size: 1rem;
  gap: 2rem;

  @media (max-width: 480px) {
    flex-direction: column;
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

const BooksDisplay = ({ books }: BooksDisplayProps) => {
  return (
    <BooksContainer>
      {books.map((book: BookModel) => (
        <BookContainer>
          <BookImg src={book.img} />
          <BookDiv>
            <span>{book.author}</span>
            <h3>{book.title}</h3>
            <p>{book.description}</p>
          </BookDiv>
        </BookContainer>
      ))}
    </BooksContainer>
  );
};

export default BooksDisplay;
