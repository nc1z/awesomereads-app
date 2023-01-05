import React from "react";
import BookModel from "../../models/BookModel";
import Carousel from "react-bootstrap/Carousel";
import styled from "styled-components";
import { Link } from "react-router-dom";

interface BookCarouselProps {
  books: BookModel[];
}

const CarouselHolder = styled(Carousel)`
  //   border: 5px solid lime;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const CarouselItemDiv = styled.div`
  //   border: 5px solid yellow;
  display: flex;
  gap: 2rem;
  justify-content: center;
  align-items: center;
  @media (max-width: 480px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const BookImage = styled.img`
  margin: 2rem 0;
  width: 20%;
  box-shadow: rgba(0, 0, 0, 0.35) 1.95px 1.95px 1.95px 2.6px;

  @media (max-width: 480px) {
    width: 50%;
  }
`;

const CaptionDiv = styled.div`
  display: flex;
  flex-direction: Column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  max-width: 30vw;

  h1 {
    font-size: 3.5rem;
    font-weight: 900;
  }

  p {
    font-weight: 500;
  }

  @media (max-width: 480px) {
    h1,
    p {
      display: none;
    }
  }
`;

const ReserveButton = styled.button`
  a {
    color: var(--main-white);
  }
  &:hover {
    background-color: var(--main-red);
  }
`;

const BookCarousel = ({ books }: BookCarouselProps) => {
  return (
    <CarouselHolder>
      {books.map((book) => (
        <Carousel.Item key={book.id}>
          <CarouselItemDiv>
            <BookImage
              src={book.img ? book.img : "../../public/vite.svg"}
              alt="Second slide"
            />
            <CaptionDiv>
              <h1>{book.title}.</h1>
              <p>{book.author}</p>
              <ReserveButton>
                <Link to="/">Reserve</Link>
              </ReserveButton>
            </CaptionDiv>
          </CarouselItemDiv>
        </Carousel.Item>
      ))}
    </CarouselHolder>
  );
};

export default BookCarousel;
