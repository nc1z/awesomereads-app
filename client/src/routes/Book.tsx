import React from "react";
import styled from "styled-components";
import BookPage from "../components/Book/BookPage";

const BookRouteContainer = styled.div`
  // border: 5px solid red;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Book = () => {
  return (
    <BookRouteContainer>
      <BookPage />
    </BookRouteContainer>
  );
};

export default Book;
