import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import BookModel from "../../models/BookModel";
import ErrorDiv from "../Error/ErrorDiv";
import Loading from "../Loading/Loading";
import BooksDisplay from "./BooksDisplay";
import BooksPagination from "./BooksPagination";
import SearchForm from "./SearchForm";

const SearchDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  width: 100%;
  margin-top: 10rem;
  margin-bottom: 12rem;

  @media (max-width: 480px) {
    margin-top: 6rem;
    margin-bottom: 8rem;
  }
`;

const LoadingDiv = styled.div`
  position: fixed;
  top: 36%;
`;

const SearchDisplay = () => {
  const [books, setBooks] = useState<BookModel[]>([]);
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchBooks = async () => {
    try {
      setIsLoading(true);
      const { data: response } = await axios.get(
        `/api/books?page=${page}&size=5`
      );

      if (!response._embedded.books) {
        return setErrorMessage("No books found. Something went wrong.");
      }

      const responseData = response._embedded.books;
      const booksArray: BookModel[] = responseData.map((book: any) => {
        return {
          id: book.id,
          title: book.title,
          author: book.author,
          description: book.description,
          copies: book.copies,
          copiesAvailable: book.copiesAvailable,
          category: book.category,
          img: book.img,
        };
      });

      setBooks(booksArray);
      setTotalPages(response.page.totalPages);
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
  }, [page]);

  if (isLoading) {
    return (
      <LoadingDiv className="container m-4">
        <Loading />
      </LoadingDiv>
    );
  }

  if (errorMessage) {
    return (
      <div className="container m-4">
        <ErrorDiv errorMessage={errorMessage} />
      </div>
    );
  }

  return (
    <SearchDiv>
      <SearchForm setSearchText={setSearchText} />
      <BooksPagination page={page} setPage={setPage} totalPages={totalPages} />
      <BooksDisplay books={books} />
      <BooksPagination page={page} setPage={setPage} totalPages={totalPages} />
    </SearchDiv>
  );
};

export default SearchDisplay;
