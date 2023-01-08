import axios from "axios";
import React, { useEffect, useState } from "react";
import BookModel from "../../models/BookModel";
import ErrorDiv from "../Error/ErrorDiv";
import Loading from "../Loading/Loading";
import BookCarousel from "./BookCarousel";

const CarouselContainer = () => {
  const [books, setBooks] = useState<BookModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchBooks = async () => {
    try {
      const { data: response } = await axios.get("/api/books?page=0&size=10");

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
      setIsLoading(false);
      // console.log(response);
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
      <div className="container m-4">
        <Loading />
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="container m-4">
        <ErrorDiv errorMessage={errorMessage} />
      </div>
    );
  }
  return <BookCarousel books={books} />;
};

export default CarouselContainer;
