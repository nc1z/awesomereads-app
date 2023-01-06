import React, { useEffect, useState } from "react";
import Pagination from "react-bootstrap/Pagination";
import styled from "styled-components";

interface BooksPaginationProps {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
}

const PaginationContainer = styled(Pagination)`
  li {
    a {
      color: var(--main-black);
      &:hover {
        color: var(--main-orange);
      }
      span {
        background-color: white !important;
      }
    }
  }
  span {
    background-color: var(--main-orange) !important;
    border-color: var(--main-orange) !important;
  }
`;

const BooksPagination = ({
  page,
  setPage,
  totalPages,
}: BooksPaginationProps) => {
  const [items, setItems] = useState<number[]>([]);

  useEffect(() => {
    let pageNum: number[] = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNum.push(i);
    }
    setItems(pageNum);
  }, [totalPages]);

  return (
    <PaginationContainer style={{ zIndex: "0" }}>
      <Pagination.First onClick={() => setPage(0)} />
      <Pagination.Prev onClick={() => page > 0 && setPage(page - 1)} />
      {items.map((item) => {
        if (Number(page) === item - 1) {
          return (
            <Pagination.Item
              key={item}
              className="active"
              active
              onClick={() => setPage(item - 1)}
            >
              {item}
            </Pagination.Item>
          );
        }

        return (
          <Pagination.Item key={item} onClick={() => setPage(item - 1)}>
            {item}
          </Pagination.Item>
        );
      })}
      <Pagination.Next onClick={() => page < totalPages && setPage(page + 1)} />
      <Pagination.Last onClick={() => setPage(totalPages - 1)} />
    </PaginationContainer>
  );
};

export default BooksPagination;
