import React from "react";
import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
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

const BookLink = styled(Link)`
  font-size: 12px;
  color: var(--main-white);
  background-color: var(--main-orange);
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.4em 1.2em;
  font-family: inherit;
  cursor: pointer;

  &:hover {
    color: var(--main-white);
    background-color: var(--main-red);
  }
  &:active {
    color: var(--main-white);
    background-color: var(--main-red);
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
              <BookLink to={`/book/${book.id}`}>Learn more</BookLink>
            </BookTitleHeader>
            <p>{book.description}</p>
          </BookDiv>
        </BookContainer>
      ))}
    </BooksContainer>
  );
};

export default BooksDisplay;
