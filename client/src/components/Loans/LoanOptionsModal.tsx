import { useOktaAuth } from "@okta/okta-react";
import axios from "axios";
import React from "react";
import { Button, ButtonGroup, Modal } from "react-bootstrap";
import styled, { css } from "styled-components";
import setAuthToken from "../../Auth/axiosConfig";
import CurrentLoansModel from "../../models/CurrentLoansModel";

interface LoanOptionsModalProps {
  loan: CurrentLoansModel;
  show: boolean;
  setModalShow: React.Dispatch<React.SetStateAction<boolean>>;
  fetchCurrentLoans: () => Promise<void>;
  fetchLoansHistory: () => Promise<void>;
}

interface DueDateProps {
  isOverdue?: boolean;
}

const ModalContainer = styled(Modal)`
  color: var(--main-gray);

  .modal-content {
    background-color: var(--main-white);
  }

  .modal-header {
    border-bottom: 1px solid var(--main-gray);
  }

  .modal-footer {
    border-top: 1px solid var(--main-gray);
  }
`;

const DueDateSpan = styled.span<DueDateProps>`
  background-color: var(--main-gray);
  color: var(--main-white);
  padding: 0.4rem 0.8rem;
  border-radius: 0.5rem;
  font-size: 1rem;

  ${({ isOverdue }) =>
    isOverdue &&
    css`
      color: var(--main-red);
    `}
`;

const ButtonGroupResponsive = styled(ButtonGroup)`
  margin-top: 1rem;
  margin-bottom: 0.2rem;
  width: 100%;
`;

const LoanOptionButtons = styled(Button)`
  &:hover {
    border-color: var(--main-gray);
    background-color: var(--main-gray);
    color: var(--main-white);
  }
`;

const ModalButton = styled.button`
  color: var(--main-white);
  font-weight: 600;

  &:hover {
    background-color: var(--main-red);
  }
`;

const LoanOptionsModal = ({
  loan,
  show,
  setModalShow,
  fetchCurrentLoans,
  fetchLoansHistory,
}: LoanOptionsModalProps) => {
  const { authState } = useOktaAuth();
  setAuthToken();

  const handleReturnBook = async () => {
    try {
      if (authState && authState.isAuthenticated) {
        const response = await axios.put(
          `/api/books/secure/return?bookId=${loan.book.id}`
        );
        if (response.statusText === "OK") {
          setModalShow(false);
          fetchCurrentLoans();
          fetchLoansHistory();
        }
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleRenewLoan = async () => {
    try {
      if (authState && authState.isAuthenticated) {
        const response = await axios.put(
          `/api/books/secure/renew/loan?bookId=${loan.book.id}`
        );
        if (response.statusText === "OK") {
          setModalShow(false);
          fetchCurrentLoans();
        }
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <ModalContainer
      show={show}
      onHide={() => setModalShow(false)}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Loan Options
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>{loan.book.title}</h4>
        <DueDateSpan isOverdue={loan.daysLeft >= 0 ? false : true}>
          Due in <em>{loan.daysLeft}</em> days
        </DueDateSpan>
        <ButtonGroupResponsive vertical>
          <LoanOptionButtons variant="outline-dark" onClick={handleReturnBook}>
            Return Book
          </LoanOptionButtons>
          <LoanOptionButtons variant="outline-dark" onClick={handleRenewLoan}>
            Renew for 7 days
          </LoanOptionButtons>
        </ButtonGroupResponsive>
      </Modal.Body>
      <Modal.Footer>
        <ModalButton onClick={() => setModalShow(false)}>Close</ModalButton>
      </Modal.Footer>
    </ModalContainer>
  );
};

export default LoanOptionsModal;
