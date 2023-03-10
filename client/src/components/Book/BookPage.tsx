import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import BookModel from "../../models/BookModel";
import ReviewModel from "../../models/ReviewModel";
import UtilsDiv from "../../Utils/StyledExports";
import ErrorDiv from "../Error/ErrorDiv";
import Loading from "../Loading/Loading";
import BookCheckout from "./BookCheckout";
import BookDescription from "./BookDescription";
import BookReviews from "./BookReviews";

const BookPageDiv = styled.div`
  //   border: 5px solid white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  width: 100%;
  margin-top: 2rem;
  margin-bottom: 12rem;

  @media (max-width: 480px) {
    margin-top: 2rem;
    margin-bottom: 10rem;
  }
`;

const BookTopContainer = styled(Container)`
  //   border: 5px solid yellow;
  display: flex;
  justify-content: space-around;
  align-items: start;
  width: 100%;
  gap: 2rem;
  padding: 1rem;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const BookPage = () => {
  // Book Details State
  const [book, setBook] = useState<BookModel>();
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  // Book Reviews State
  const [reviews, setReviews] = useState<ReviewModel[]>([]);
  const [averageReview, setAverageReview] = useState(0);
  const [isLoadingReviews, setIsLoadingReviews] = useState(true);
  const [reviewErrorMessage, setReviewErrorMessage] = useState("");
  const [isReviewSubmitted, setIsReviewSubmitted] = useState(false);

  // Book Checked Out State
  const [isCheckedOut, setIsCheckedOut] = useState(false);

  // Book Id
  const { bookId } = useParams();

  const fetchBooks = async () => {
    try {
      const { data: response } = await axios.get(`/api/books/${bookId}`);

      if (!response.id) {
        return setErrorMessage("No books found. Something went wrong.");
      }

      const currentBook: BookModel = {
        id: response.id,
        title: response.title,
        author: response.author,
        description: response.description,
        copies: response.copies,
        copiesAvailable: response.copiesAvailable,
        category: response.category,
        img: response.img,
      };

      setBook(currentBook);
      setIsLoading(false);
      console.log(response);
    } catch (error: any) {
      setIsLoading(false);
      setErrorMessage(error.message);
      console.log(error.message);
    }
  };

  const fetchReviews = async () => {
    try {
      const { data: response } = await axios.get(
        `/api/reviews/search/findByBookId?bookId=${bookId}`
      );

      if (!response._embedded.reviews) {
        return setErrorMessage("No reviews found. Something went wrong.");
      }

      const responseData = response._embedded.reviews;
      const reviewsArray: ReviewModel[] = responseData.map((review: any) => {
        return {
          id: review.id,
          userEmail: review.userEmail,
          date: review.date,
          rating: review.rating,
          book_id: review.bookId,
          reviewDescription: review.reviewDescription,
        };
      });

      const totalRating = reviewsArray.reduce(
        (total: number, review: ReviewModel) => total + Number(review.rating),
        0
      );

      const averageRating = totalRating / reviewsArray.length;

      setReviews(reviewsArray);
      setAverageReview(averageRating);
      setIsLoadingReviews(false);
      console.log(response);
    } catch (error: any) {
      setIsLoadingReviews(false);
      setReviewErrorMessage(error.message);
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [isCheckedOut]);

  useEffect(() => {
    fetchReviews();
  }, [isReviewSubmitted]);

  if (isLoading) {
    return (
      <UtilsDiv className="container m-4">
        <Loading />
      </UtilsDiv>
    );
  }

  if (errorMessage) {
    return (
      <UtilsDiv className="container m-4">
        <ErrorDiv errorMessage={errorMessage} />
      </UtilsDiv>
    );
  }

  return (
    <BookPageDiv>
      <BookTopContainer>
        <BookDescription book={book} rating={averageReview} />
        <BookCheckout
          book={book}
          isReviewSubmitted={isReviewSubmitted}
          setIsReviewSubmitted={setIsReviewSubmitted}
          isCheckedOut={isCheckedOut}
          setIsCheckedOut={setIsCheckedOut}
        />
      </BookTopContainer>
      <BookReviews
        bookId={book?.id}
        reviews={reviews}
        averageReview={averageReview}
        isLoadingReviews={isLoadingReviews}
        reviewErrorMessage={reviewErrorMessage}
      />
    </BookPageDiv>
  );
};

export default BookPage;
