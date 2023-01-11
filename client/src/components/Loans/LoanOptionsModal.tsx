import React from "react";
import { Button, ButtonGroup, Modal } from "react-bootstrap";
import styled, { css } from "styled-components";
import CurrentLoansModel from "../../models/CurrentLoansModel";

interface LoanOptionsModalProps {
  loan: CurrentLoansModel;
  show: boolean;
  setModalShow: React.Dispatch<React.SetStateAction<boolean>>;
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
  margin: 1rem 0;
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
}: LoanOptionsModalProps) => {
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
          <LoanOptionButtons variant="outline-dark">
            Manage Loan
          </LoanOptionButtons>
          <LoanOptionButtons variant="outline-dark">
            Borrow more books
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
