import React from "react";
import styled from "styled-components";
import ReviewModel from "../../models/ReviewModel";
import ErrorDiv from "../Error/ErrorDiv";
import Loading from "../Loading/Loading";
import ReviewStars from "./ReviewStars";

interface BookReviewsProps {
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

const ReviewsDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  padding: 1rem;
  margin-bottom: 1rem;

  p {
    font-size: 1.25rem;
    padding: 0 1rem;
  }
`;

const ReviewsDetailsDiv = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1rem;

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 0.2rem;
  }
`;

const UserReviewDiv = styled.div`
  display: flex;
  gap: 1rem;
  background-color: var(--main-black);
  border-radius: 0.8rem;
  padding: 0 1rem;

  @media (max-width: 480px) {
    flex-direction: column;
    border-radius: 0.5rem;
    padding: 0.5rem 0.8rem;
    gap: 0rem;
  }
`;

const DateDiv = styled.div`
  opacity: 60%;
`;

const RatingDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.25rem;
`;

const UtilsDiv = styled.div`
  position: fixed;
  top: 36%;
`;

const BookReviews = ({
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
      {reviews.map((review: ReviewModel) => (
        <ReviewsDiv key={review.id}>
          <ReviewsDetailsDiv>
            <UserReviewDiv>
              <span>{review.userEmail} rated it</span>
              <ReviewStars rating={averageReview} />
            </UserReviewDiv>
            <DateDiv>
              {new Date(review.date)
                .toString()
                .split(" ")
                .slice(1, 4)
                .join(" ")}
            </DateDiv>
          </ReviewsDetailsDiv>
          <p>{review.reviewDescription}</p>
        </ReviewsDiv>
      ))}
    </BookReviewsDiv>
  );
};

export default BookReviews;
