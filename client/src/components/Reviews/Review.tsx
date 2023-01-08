import React from "react";
import styled from "styled-components";
import ReviewModel from "../../models/ReviewModel";
import ReviewStars from "../Book/ReviewStars";

interface ReviewProps {
  reviews: ReviewModel[];
}

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

const Review = ({ reviews }: ReviewProps) => {
  if (reviews.length == 0) {
    return <div>No Reviews Yet.</div>;
  }
  return (
    <>
      {reviews?.map((review: ReviewModel) => (
        <ReviewsDiv key={review.id}>
          <ReviewsDetailsDiv>
            <UserReviewDiv>
              <span>{review.userEmail} rated it</span>
              <ReviewStars rating={review.rating} />
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
    </>
  );
};

export default Review;
