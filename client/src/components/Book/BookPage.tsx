import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import BookModel from "../../models/BookModel";
import ErrorDiv from "../Error/ErrorDiv";
import Loading from "../Loading/Loading";
import BookCheckout from "./BookCheckout";
import BookDescription from "./BookDescription";
import BookReviews from "./BookReviews";

const BookPageDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  width: 100%;
  margin-top: 10rem;
  margin-bottom: 12rem;

  @media (max-width: 480px) {
    margin-top: 6rem;
    margin-bottom: 8rem;
  }
`;

const UtilsDiv = styled.div`
  position: fixed;
  top: 36%;
`;

const BookPage = () => {
  const [book, setBook] = useState<BookModel>();
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
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

  useEffect(() => {
    fetchBooks();
  }, []);

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
      <div>
        <BookDescription />
        <BookCheckout />
      </div>
      <BookReviews />
      {bookId}
    </BookPageDiv>
  );
};

export default BookPage;
