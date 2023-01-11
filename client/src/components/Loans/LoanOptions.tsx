import React, { useState } from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import CurrentLoansModel from "../../models/CurrentLoansModel";
import LoanOptionsModal from "./LoanOptionsModal";

interface LoanOptionsProps {
  loan: CurrentLoansModel;
}

interface DueDateProps {
  isOverdue?: boolean;
}

const LoanDetailsDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  gap: 0.5rem;
  margin-left: auto;

  padding: 0.5rem 0.8rem;
  border-radius: 0.5rem;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

  @media (max-width: 480px) {
    margin-left: 0;
    width: 100%;
  }
`;

const DueDateSpan = styled.span<DueDateProps>`
  background-color: var(--main-gray);
  border-radius: 0.5rem;
  text-align: center;
  font-weight: 600;
  padding: 0.1rem 0.4rem;
  width: 100%;

  ${({ isOverdue }) =>
    isOverdue &&
    css`
      background-color: var(--main-red);
    `}
`;

const ButtonGroupResponsive = styled(ButtonGroup)`
  width: 100%;
`;

const LoanOptions = ({ loan }: LoanOptionsProps) => {
  const [modalShow, setModalShow] = useState(false);
  const navigate = useNavigate();
  return (
    <LoanDetailsDiv>
      <h4>Loan Options</h4>
      <DueDateSpan isOverdue={loan.daysLeft >= 0 ? false : true}>
        Due in {loan.daysLeft} days
      </DueDateSpan>
      <ButtonGroupResponsive vertical>
        <Button variant="outline-light" onClick={() => setModalShow(true)}>
          Manage Loan
        </Button>
        <Button variant="outline-light" onClick={() => navigate("/search")}>
          Borrow more books
        </Button>
        <LoanOptionsModal show={modalShow} setModalShow={setModalShow} />
      </ButtonGroupResponsive>
    </LoanDetailsDiv>
  );
};

export default LoanOptions;
