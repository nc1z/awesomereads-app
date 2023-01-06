import React from "react";
import styled from "styled-components";

const BookCheckoutDiv = styled.div`
  // border: 5px solid black;
  padding: 1rem;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  display: flex;
  flex-direction: column;
  font-size: 1rem;
  min-width: 25%;
`;

const BookCheckout = () => {
  return (
    <BookCheckoutDiv>
      <p>x/5 books checked out</p>
      <hr />
      <h3>Available</h3>
      <div>
        <p>10 copies</p>
        <p>10 available</p>
      </div>
      <button>Login</button>
      <hr />
      <p>The number can change until transaction is completed</p>
      <p>Sign in to leave a review</p>
    </BookCheckoutDiv>
  );
};

export default BookCheckout;
