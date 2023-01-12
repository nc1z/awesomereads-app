import React from "react";
import { Container } from "react-bootstrap";
import styled from "styled-components";
import HistoryModel from "../../models/HistoryModel";
import PageDetailsModel from "../../models/PageDetailsModel";
import UtilsDiv, { StyledLink } from "../../Utils/StyledExports";
import ErrorDiv from "../Error/ErrorDiv";
import Loading from "../Loading/Loading";
import BooksPagination from "../Search/BooksPagination";

interface HistoryProps {
  history: HistoryModel[];
  fetchLoansHistory: () => Promise<void>;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
  pageDetails: PageDetailsModel;
  isLoading: boolean;
  errorMessage: string;
}

const HistoryContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  padding: 1rem 0;
  overflow: auto;
`;

const BookContainer = styled(Container)`
  display: flex;
  justify-content: start;
  align-items: center;
  width: 100%;
  font-size: 1rem;
  gap: 2rem;

  @media (max-width: 480px) {
    flex-direction: column;
    justify-content: center;
  }
`;

const BookDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const BookImg = styled.img`
  width: 10%;

  @media (max-width: 480px) {
    width: 60vw;
  }
`;

const History = ({
  history,
  fetchLoansHistory,
  page,
  setPage,
  totalPages,
  pageDetails,
  isLoading,
  errorMessage,
}: HistoryProps) => {
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

  if (history.length <= 0) {
    return <HistoryContainer>No loan history.</HistoryContainer>;
  }

  return (
    <HistoryContainer>
      <BooksPagination
        page={page}
        setPage={setPage}
        totalPages={pageDetails.totalPages}
      />
      {history.length > 0 &&
        history.map((loan: HistoryModel) => (
          <BookContainer key={loan.title}>
            <BookImg src={loan.img} />
            <BookDiv>
              <span>{loan.author}</span>
              <h3>{loan.title}</h3>
            </BookDiv>
          </BookContainer>
        ))}
      <BooksPagination
        page={page}
        setPage={setPage}
        totalPages={pageDetails.totalPages}
      />
    </HistoryContainer>
  );
};

export default History;
