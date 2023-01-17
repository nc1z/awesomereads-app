import { useOktaAuth } from "@okta/okta-react";
import axios from "axios";
import React, { useState } from "react";
import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import setAuthToken from "../../Auth/axiosConfig";
import BookModel from "../../models/BookModel";

interface ManageBooksTableProps {
  books: BookModel[];
  fetchBooks: () => Promise<void>;
}

interface ActionButtonProps {
  action: string;
}

const BooksTable = styled(Table)`
  color: var(--main-white);
`;

const ErrorMessageDiv = styled.div`
  color: var(--main-white);
  background-color: var(--main-red);
  padding: 0.2rem 0.8rem;
  max-width: max-content;
  border-radius: 0.5rem;
  font-size: 1rem;
  margin: 0.25rem 0;
`;

const ActionButton = styled.button<ActionButtonProps>`
  color: var(--main-white);
  padding: 0.2rem 0.4rem;
  font-size: 0.8rem;
  font-weight: 700;
  background-color: ${(props) =>
    props.action === "delete"
      ? "var(--main-orange)"
      : props.action === "confirm"
      ? "var(--main-red)"
      : "var(--main-gray)"};

  &:hover {
    background-color: var(--main-red);
  }
`;

const ConfirmationDiv = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ManageBooksTable = ({ books, fetchBooks }: ManageBooksTableProps) => {
  const [showConfirm, setShowConfirm] = useState(0);
  const [submitError, setSubmitError] = useState("");

  const navigate = useNavigate();
  const { authState } = useOktaAuth();
  setAuthToken();

  const handleDeleteBook = async (bookId: number) => {
    setSubmitError("");
    if (!authState || !authState.isAuthenticated) {
      return navigate("/login");
    }
    try {
      const response = await axios.delete(
        `/api/admin/secure/delete/book?bookId=${bookId}`
      );
      if (response.statusText === "OK") {
        fetchBooks();
      }
    } catch (error: any) {
      setSubmitError(error.message);
      console.log(error);
    }
  };

  return (
    <>
      {submitError && <ErrorMessageDiv>{submitError}</ErrorMessageDiv>}
      <BooksTable hover size="sm">
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Author</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.id}</td>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>
                {showConfirm == book.id ? null : (
                  <ActionButton
                    action="delete"
                    onClick={() => setShowConfirm(book.id)}
                  >
                    Delete
                  </ActionButton>
                )}
                {showConfirm == book.id && (
                  <ConfirmationDiv>
                    <ActionButton
                      action="confirm"
                      onClick={() => handleDeleteBook(book.id)}
                    >
                      Confirm
                    </ActionButton>
                    <ActionButton
                      action="close"
                      onClick={() => setShowConfirm(0)}
                    >
                      X
                    </ActionButton>
                  </ConfirmationDiv>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </BooksTable>
    </>
  );
};

export default ManageBooksTable;
