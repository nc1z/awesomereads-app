import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import ReviewModel from "../../models/ReviewModel";
import UtilsDiv from "../../Utils/StyledExports";
import ErrorDiv from "../Error/ErrorDiv";
import Loading from "../Loading/Loading";
import Review from "../Reviews/Review";
import ReviewStars from "./ReviewStars";

interface BookReviewsProps {
  bookId: number | undefined;
  reviews: ReviewModel[];
  averageReview: number;
  isLoadingReviews: boolean;
  reviewErrorMessage: string;
}

const BookReviewsDiv = styled.div`
  // border: 5px solid lime;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;

  h3 {
    font-weight: 700;
  }
`;

const RatingDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.25rem;
`;

const SeeAllReviewsLink = styled(Link)`
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.4em 1.2em;
  font-family: inherit;
  background-color: var(--main-orange);
  cursor: pointer;
  margin: 1 0.5rem;

  max-width: max-content;
  color: var(--main-white);
  font-size: 0.8rem;
  font-weight: 700;

  &:hover {
    color: var(--main-white);
    background-color: var(--main-red);
  }

  &:focus {
    color: var(--main-white);
    background-color: var(--main-red);
  }
`;

const BookReviews = ({
  bookId,
  reviews,
  averageReview,
  isLoadingReviews,
  reviewErrorMessage,
}: BookReviewsProps) => {
  if (isLoadingReviews) {
    return (
      <UtilsDiv className="container m-4">
        <Loading />
      </UtilsDiv>
    );
  }

  if (reviewErrorMessage) {
    return (
      <UtilsDiv className="container m-4">
        <ErrorDiv errorMessage={reviewErrorMessage} />
      </UtilsDiv>
    );
  }

  return (
    <BookReviewsDiv>
      <hr />
      <div>
        <h3>Community Reviews</h3>
      </div>
      <RatingDiv>
        Average Rating:
        <ReviewStars rating={averageReview} />
        <span>
          {averageReview ? averageReview.toFixed(1) : "No Ratings Yet"}
        </span>
      </RatingDiv>
      <Review reviews={reviews} slicedLength={3} />
      <SeeAllReviewsLink to={`/reviews/${bookId}`}>
        See all reviews
      </SeeAllReviewsLink>
    </BookReviewsDiv>
  );
};

export default BookReviews;
