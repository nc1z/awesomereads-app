import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import styled from "styled-components";
import BookModel from "../../models/BookModel";
import PageDetailsModel from "../../models/PageDetailsModel";
import UtilsDiv from "../../Utils/StyledExports";
import ErrorDiv from "../Error/ErrorDiv";
import Loading from "../Loading/Loading";
import BooksPagination from "../Search/BooksPagination";
import ManageBooksTable from "./ManageBooksTable";

const BooksContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  gap: 1rem;
  padding: 1rem 0;
  overflow: auto;
`;

const ManageBooks = () => {
  const [books, setBooks] = useState<BookModel[]>([]);
  const [page, setPage] = useState(0);
  const [pageDetails, setPageDetails] = useState<PageDetailsModel>({
    number: 0,
    size: 0,
    totalElements: 0,
    totalPages: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchBooks = async () => {
    try {
      setIsLoading(true);
      const { data: response } = await axios.get(
        `/api/books?page=${page}&size=10`
      );

      if (!response._embedded.books) {
        return setErrorMessage("No books found. Something went wrong.");
      }

      if (page > response.page.totalPages) {
        setPage(0);
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
      setPageDetails(response.page);
      setIsLoading(false);
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
      <UtilsDiv className="container m-4 position-relative">
        <Loading />
      </UtilsDiv>
    );
  }

  if (errorMessage) {
    return (
      <UtilsDiv className="container m-4 position-relative">
        <ErrorDiv errorMessage={errorMessage} />
      </UtilsDiv>
    );
  }

  return (
    <BooksContainer>
      <ManageBooksTable books={books} fetchBooks={fetchBooks} />
      <BooksPagination
        page={page}
        setPage={setPage}
        totalPages={pageDetails.totalPages}
      />
    </BooksContainer>
  );
};

export default ManageBooks;
