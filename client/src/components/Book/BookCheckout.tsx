import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import BookModel from "../../models/BookModel";
import { useOktaAuth } from "@okta/okta-react";
import { useNavigate } from "react-router-dom";
import setAuthToken from "../../Auth/axiosConfig";
import axios from "axios";
import ReviewButton from "./ReviewButton";

interface BookCheckoutProps {
  book: BookModel | undefined;
  isReviewSubmitted: boolean;
  setIsReviewSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
  isCheckedOut: boolean;
  setIsCheckedOut: React.Dispatch<React.SetStateAction<boolean>>;
}

interface CheckOutState {
  isSuccess?: boolean;
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

const CheckOutWarning = styled.p<CheckOutState>`
  background-color: var(--main-red);
  border-radius: 0.5rem;
  text-align: center;
  font-weight: 600;
  padding: 0.2rem 0;
  margin-bottom: 0;

  ${({ isSuccess }) =>
    isSuccess &&
    css`
      background-color: var(--main-gray);
    `}
`;

const BookCheckout = ({
  book,
  isReviewSubmitted,
  setIsReviewSubmitted,
  isCheckedOut,
  setIsCheckedOut,
}: BookCheckoutProps) => {
  const { authState } = useOktaAuth();
  const navigate = useNavigate();
  const [loansCount, setLoansCount] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  setAuthToken();

  const handleBookCheckout = async () => {
    if (!authState || !authState.isAuthenticated) {
      return navigate("/login");
    }
    try {
      const { data: response } = await axios.put(
        `/api/books/secure/checkout?bookId=${book?.id}`
      );
      if (response) {
        setIsCheckedOut(true);
      }
    } catch (error: any) {
      setErrorMessage(error.message);
      console.log(error);
      console.log("Checkout failed - " + error.message);
    }
  };

  const fetchUserLoansCount = async () => {
    try {
      const { data: response } = await axios.get(
        "/api/books/secure/currentloans/count"
      );
      if (Number.isInteger(response)) {
        setLoansCount(response);
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const fetchBookIsCheckedOut = async () => {
    try {
      const { data: response } = await axios.get(
        `/api/books/secure/ischeckedout/byuser?bookId=${book?.id}`
      );
      setIsCheckedOut(response);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (authState && authState.isAuthenticated) {
      fetchUserLoansCount();
      fetchBookIsCheckedOut();
    }
  }, [authState, isCheckedOut]);

  return (
    <BookCheckoutDiv>
      <p>{loansCount}/5 books checked out</p>
      <hr />
      <h3>
        {book?.copiesAvailable && book?.copiesAvailable > 0
          ? "Available"
          : "Not Available"}
      </h3>
      <AvailableDiv>
        <p>{book?.copies} copies</p>
        <p>{book?.copiesAvailable} available</p>
      </AvailableDiv>
      {authState && authState.isAuthenticated ? (
        !isCheckedOut && loansCount < 5 ? (
          <ReserveButton onClick={handleBookCheckout}>Checkout</ReserveButton>
        ) : isCheckedOut ? (
          <CheckOutWarning isSuccess={true}>
            Book checked out. Enjoy!
          </CheckOutWarning>
        ) : (
          <CheckOutWarning isSuccess={false}>
            Too many books checked out.
          </CheckOutWarning>
        )
      ) : (
        <ReserveButton onClick={handleBookCheckout}>Login</ReserveButton>
      )}
      {errorMessage && (
        <CheckOutWarning className="my-2" isSuccess={false}>
          checkout error. Please try again later.
        </CheckOutWarning>
      )}
      <hr />
      <p>The number can change until transaction is completed</p>
      <div>
        {" "}
        {authState && authState.isAuthenticated ? (
          isReviewSubmitted ? (
            <CheckOutWarning isSuccess={true}>
              Review submitted. Thank you!
            </CheckOutWarning>
          ) : (
            <>
              <ReviewButton
                book={book}
                isReviewSubmitted={isReviewSubmitted}
                setIsReviewSubmitted={setIsReviewSubmitted}
              />
            </>
          )
        ) : (
          "Sign in to leave a review"
        )}
      </div>
    </BookCheckoutDiv>
  );
};

export default BookCheckout;
