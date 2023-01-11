import React from "react";
import { Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import CurrentLoansModel from "../../models/CurrentLoansModel";
import { StyledLink } from "../../Utils/StyledExports";
import LoanOptions from "./LoanOptions";

interface LoansPageProps {
  currentLoans: CurrentLoansModel[];
  fetchCurrentLoans: () => Promise<void>;
}

const LoansContainer = styled(Container)`
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
  cursor: pointer;

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px;
    transform: scale(1.1);
  }

  @media (max-width: 480px) {
    width: 60vw;
  }
`;

const LoansPage = ({ currentLoans, fetchCurrentLoans }: LoansPageProps) => {
  const navigate = useNavigate();
  return (
    <LoansContainer>
      {currentLoans.length > 0 &&
        currentLoans.map((loan: CurrentLoansModel) => (
          <BookContainer key={loan.book.title}>
            <BookImg
              src={loan.book.img}
              onClick={() => navigate(`/book/${loan.book.id}`)}
            />
            <BookDiv>
              <span>{loan.book.author}</span>
              <h3>{loan.book.title}</h3>
              <StyledLink to={`/book/${loan.book.id}`}>
                Leave a review
              </StyledLink>
            </BookDiv>
            <LoanOptions loan={loan} fetchCurrentLoans={fetchCurrentLoans} />
          </BookContainer>
        ))}
    </LoansContainer>
  );
};

export default LoansPage;
