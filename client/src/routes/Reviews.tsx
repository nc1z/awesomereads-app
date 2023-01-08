import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ErrorDiv from "../components/Error/ErrorDiv";
import Loading from "../components/Loading/Loading";
import UtilsDiv from "../Utils/StyledExports";
import PageDetailsModel from "../models/PageDetailsModel";
import ReviewModel from "../models/ReviewModel";
import Review from "../components/Reviews/Review";

const Reviews = () => {
  // Reviews State
  const [reviews, setReviews] = useState<ReviewModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  // Pagination State
  const [page, setPage] = useState(0);
  const [pageDetails, setPageDetails] = useState<PageDetailsModel>();

  // Book Id
  const { bookId } = useParams();

  const fetchReviews = async () => {
    try {
      const { data: response } = await axios.get(
        `/api/reviews/search/findByBookId?bookId=${bookId}&page=${page}&size=5`
      );

      if (!response._embedded.reviews) {
        return setErrorMessage("No reviews found. Something went wrong.");
      }

      if (page > response.page.totalPages) {
        setPage(0);
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

      setReviews(reviewsArray);
      setPageDetails(response.page);
      setIsLoading(false);
      console.log(response);
    } catch (error: any) {
      setIsLoading(false);
      setErrorMessage(error.message);
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [page]);

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
    <div>
      <Review reviews={reviews} />
    </div>
  );
};

export default Reviews;
