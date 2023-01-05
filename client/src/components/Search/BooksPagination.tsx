import React from "react";

interface BooksPaginationProps {
  setPage: React.Dispatch<React.SetStateAction<string>>;
}

const BooksPagination = ({ setPage }: BooksPaginationProps) => {
  return <div>BooksPagination</div>;
};

export default BooksPagination;
