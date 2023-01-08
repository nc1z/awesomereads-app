import axios from "axios";
import React, { useEffect, useState } from "react";
import { FloatingLabel, Form } from "react-bootstrap";
import styled from "styled-components";
import setAuthToken from "../../Auth/axiosConfig";
import BookModel from "../../models/BookModel";

interface ReviewButtonProps {
  book: BookModel | undefined;
  isReviewSubmitted: boolean;
  setIsReviewSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
}

const ReviewActionDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const LeaveReviewText = styled.div`
  font-weight: 600;
`;

const StarsButton = styled.button`
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  width: 16px;
  margin-bottom: 0.5rem;

  &.on {
    color: gold;
  }
  &.off {
    color: var(--main-white);
  }
`;

const ConfirmReviewButton = styled.button`
  color: var(--main-white);
  font-size: 0.8rem;
  font-weight: 700;

  &:hover {
    background-color: var(--main-red);
  }
`;

const ConfirmReviewWarning = styled.p`
  background-color: var(--main-red);
  border-radius: 0.5rem;
  text-align: center;
  font-size: 0.8rem;
  font-weight: 600;
  padding: 0.2rem 0;
  margin-bottom: 0;
`;

const ReviewButton = ({
  book,
  isReviewSubmitted,
  setIsReviewSubmitted,
}: ReviewButtonProps) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [description, setDescription] = useState("");
  const [showConfirmButton, setShowConfirmButton] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  setAuthToken();

  const handleReviewSubmit = async () => {
    try {
      const { data: response } = await axios.post("/api/reviews/secure", {
        rating: rating,
        bookId: book?.id,
        reviewDescription: description,
      });
      setIsReviewSubmitted(true);
    } catch (error: any) {
      setErrorMessage(error.message);
      console.log(error.message);
      console.log(error);
    }
  };

  const fetchUserReviewState = async () => {
    try {
      const { data: response } = await axios.get(
        `/api/reviews/secure/user/book?bookId=${book?.id}`
      );
      if (response) {
        setIsReviewSubmitted(response);
      }
    } catch (error: any) {
      setErrorMessage(error.message);
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchUserReviewState();
  }, []);

  return (
    <ReviewActionDiv>
      <LeaveReviewText>Leave a review</LeaveReviewText>
      <div>
        {[...Array(5)].map((star, index) => {
          index += 1;
          return (
            <StarsButton
              type="button"
              key={index}
              className={index <= (hover || rating) ? "on" : "off"}
              onClick={() => {
                setRating(index);
                setShowConfirmButton(true);
              }}
              onMouseEnter={() => setHover(index)}
              onMouseLeave={() => setHover(rating)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
              </svg>
            </StarsButton>
          );
        })}
      </div>

      {showConfirmButton && (
        <FloatingLabel
          controlId="floatingTextarea2"
          label="Comments"
          style={{ color: "var(--main-gray)" }}
        >
          <Form.Control
            as="textarea"
            placeholder="Leave a comment here"
            style={{ height: "100px" }}
            onChange={(e) => setDescription(e.target.value)}
          />
        </FloatingLabel>
      )}

      {showConfirmButton && (
        <ConfirmReviewButton onClick={handleReviewSubmit}>
          Confirm Review
        </ConfirmReviewButton>
      )}

      {errorMessage && (
        <ConfirmReviewWarning>
          Review failed. Please try again.
        </ConfirmReviewWarning>
      )}
    </ReviewActionDiv>
  );
};

export default ReviewButton;
