import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ErrorDiv from "../components/Error/ErrorDiv";
import Loading from "../components/Loading/Loading";
import UtilsDiv from "../Utils/StyledExports";
import PageDetailsModel from "../models/PageDetailsModel";
import ReviewModel from "../models/ReviewModel";
import Review from "../components/Reviews/Review";
import BooksPagination from "../components/Search/BooksPagination";
import styled from "styled-components";

const ReviewsRouteContainer = styled.div`
  // border: 5px solid red;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ReviewsPageDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  gap: 1rem;
  width: 100%;
  margin-top: 2rem;
  margin-bottom: 12rem;

  @media (max-width: 480px) {
    margin-top: 2rem;
    margin-bottom: 10rem;
  }
`;

const BackToBookPageLink = styled(Link)`
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

const PageDetailsSpan = styled.span`
  font-size: 1rem;
`;

const Reviews = () => {
  // Reviews State
  const [reviews, setReviews] = useState<ReviewModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  // Pagination State
  const [page, setPage] = useState(0);
  const [pageDetails, setPageDetails] = useState<PageDetailsModel>({
    number: 0,
    size: 0,
    totalElements: 0,
    totalPages: 0,
  });

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
    <ReviewsRouteContainer>
      <ReviewsPageDiv>
        <BackToBookPageLink to={`/book/${bookId}`}>Back</BackToBookPageLink>
        <PageDetailsSpan>
          <h3>All Community Reviews</h3>
          Total results: {pageDetails.totalElements}
        </PageDetailsSpan>
        <BooksPagination
          page={page}
          setPage={setPage}
          totalPages={pageDetails.totalPages}
        />
        <hr style={{ width: "80vw" }}></hr>
        <Review reviews={reviews} slicedLength={0} />
        <hr style={{ width: "80vw" }}></hr>
        <BooksPagination
          page={page}
          setPage={setPage}
          totalPages={pageDetails.totalPages}
        />
      </ReviewsPageDiv>
    </ReviewsRouteContainer>
  );
};

export default Reviews;
