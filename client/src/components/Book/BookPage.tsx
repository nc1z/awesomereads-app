import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import BookModel from "../../models/BookModel";
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
    margin-bottom: 8rem;
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

const UtilsDiv = styled.div`
  position: fixed;
  top: 36%;
`;

const BookPage = () => {
  const [book, setBook] = useState<BookModel>({
    id: 0,
    title: "",
    author: "",
    description: "",
    copies: 0,
    copiesAvailable: 0,
    category: "",
    img: "",
  });
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
      <BookTopContainer>
        <BookDescription book={book} />
        <BookCheckout />
      </BookTopContainer>
      <BookReviews />
    </BookPageDiv>
  );
};

export default BookPage;
