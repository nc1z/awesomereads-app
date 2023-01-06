import React from "react";
import styled from "styled-components";
import BookModel from "../../models/BookModel";

interface BookCheckoutProps {
  book: BookModel | undefined;
}

const BookCheckoutDiv = styled.div`
  // border: 5px solid black;
  padding: 1rem;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  display: flex;
  flex-direction: column;
  font-size: 1rem;
  min-width: 25%;
`;

const AvailableDiv = styled.div`
  display: flex;
  gap: 1rem;
`;

const ReserveButton = styled.button`
  color: var(--main-white);
  font-weight: 700;

  &:hover {
    background-color: var(--main-red);
  }
`;

const BookCheckout = ({ book }: BookCheckoutProps) => {
  return (
    <BookCheckoutDiv>
      <p>x/5 books checked out</p>
      <hr />
      <h3>Available</h3>
      <AvailableDiv>
        <p>{book?.copies} copies</p>
        <p>{book?.copiesAvailable} available</p>
      </AvailableDiv>
      <ReserveButton>Login</ReserveButton>
      <hr />
      <p>The number can change until transaction is completed</p>
      <p>Sign in to leave a review</p>
    </BookCheckoutDiv>
  );
};

export default BookCheckout;
