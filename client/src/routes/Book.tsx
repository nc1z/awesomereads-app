import React from "react";
import styled from "styled-components";
import BookPage from "../components/Book/BookPage";

const BookRouteContainer = styled.div`
  // border: 5px solid red;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 20%;
`;

const Book = () => {
  return (
    <BookRouteContainer>
      <BookPage />
    </BookRouteContainer>
  );
};

export default Book;
