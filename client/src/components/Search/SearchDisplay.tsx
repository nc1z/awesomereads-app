import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import BookModel from "../../models/BookModel";
import PageDetailsModel from "../../models/PageDetailsModel";
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

const PageDetailsSpan = styled.span`
  font-size: 1rem;
`;

const SearchDisplay = () => {
  const [books, setBooks] = useState<BookModel[]>([]);
  const [searchText, setSearchText] = useState("");
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
      const { data: response } = searchText
        ? await axios.get(
            `/api/books/search/findByTitleContaining?title=${searchText}&page=${page}&size=5`
          )
        : await axios.get(`/api/books?page=${page}&size=5`);

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
      console.log(response);
    } catch (error: any) {
      setIsLoading(false);
      setErrorMessage(error.message);
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [page, searchText]);

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
    <SearchDiv>
      <SearchForm setSearchText={setSearchText} />
      <div>
        <BooksPagination
          page={page}
          setPage={setPage}
          totalPages={pageDetails.totalPages}
        />
        <PageDetailsSpan>
          Total results: {pageDetails.totalElements}
        </PageDetailsSpan>
      </div>
      <hr style={{ width: "80vw" }}></hr>
      <BooksDisplay books={books} />
      <hr style={{ width: "80vw" }}></hr>
      <BooksPagination
        page={page}
        setPage={setPage}
        totalPages={pageDetails.totalPages}
      />
    </SearchDiv>
  );
};

export default SearchDisplay;
