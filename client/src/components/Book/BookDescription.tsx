import React from "react";
import styled from "styled-components";
import BookModel from "../../models/BookModel";

interface BookDescriptionProps {
  book: BookModel;
}

const BookDescriptionDiv = styled.div`
  border: 5px solid orange;
  display: flex;
`;

const BookDescription = ({ book }: BookDescriptionProps) => {
  return <BookDescriptionDiv>BookDescription</BookDescriptionDiv>;
};

export default BookDescription;
