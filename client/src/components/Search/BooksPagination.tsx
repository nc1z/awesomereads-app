import React from "react";

interface BooksPaginationProps {
  page: string;
  setPage: React.Dispatch<React.SetStateAction<string>>;
  totalPages: number;
}

const BooksPagination = ({ setPage }: BooksPaginationProps) => {
  return <div>BooksPagination</div>;
};

export default BooksPagination;
