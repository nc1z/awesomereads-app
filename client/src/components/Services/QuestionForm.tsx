import React, { useState } from "react";
import { Form } from "react-bootstrap";
import styled from "styled-components";
import MessageModel from "../../models/MessageModel";

interface QuestionFormProps {
  setMessage: React.Dispatch<React.SetStateAction<MessageModel | undefined>>;
  setSubmitError: React.Dispatch<React.SetStateAction<string>>;
  submitError: string;
}

const SubmitButton = styled.button`
  color: var(--main-white);
  font-size: 0.8rem;
  font-weight: 700;

  &:hover {
    background-color: var(--main-red);
  }
`;

const ErrorMessageDiv = styled.div`
  color: var(--main-white);
  background-color: var(--main-red);
  padding: 0.2rem 0.8rem;
  max-width: max-content;
  border-radius: 0.5rem;
  font-size: 1rem;
  margin: 0.5rem 0;
`;

const QuestionForm = ({
  setMessage,
  setSubmitError,
  submitError,
}: QuestionFormProps) => {
  const [title, setTitle] = useState("");
  const [question, setQuestion] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!title || !question) {
      return setSubmitError("Please fill out all form fields");
    }
    const message: MessageModel = { title: title, question: question };
    setMessage(message);
  };

  return (
    <Form onSubmit={handleSubmit}>
      {submitError && <ErrorMessageDiv>{submitError}</ErrorMessageDiv>}
      <Form.Group className="mb-3">
        <Form.Label>Title</Form.Label>
        <Form.Control
          placeholder="E.g. Request for more C++ books"
          required
          onChange={(e) => setTitle(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Your Question</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          required
          placeholder="Tip: Be clear and concise so that admins can understand your question better"
          onChange={(e) => setQuestion(e.target.value)}
        />
      </Form.Group>
      <SubmitButton type="submit">Submit</SubmitButton>
    </Form>
  );
};

export default QuestionForm;
