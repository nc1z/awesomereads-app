import { useOktaAuth } from "@okta/okta-react";
import axios from "axios";
import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import setAuthToken from "../../Auth/axiosConfig";
import MessageModel from "../../models/MessageModel";

interface QuestionFormProps {
  setKey: React.Dispatch<React.SetStateAction<string>>;
  fetchMessages: () => Promise<void>;
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

const QuestionForm = ({ setKey, fetchMessages }: QuestionFormProps) => {
  const [title, setTitle] = useState("");
  const [question, setQuestion] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);

  const navigate = useNavigate();
  const { authState } = useOktaAuth();
  setAuthToken();

  const postMessage = async (e: any) => {
    e.preventDefault();
    setIsSubmitLoading(true);

    if (!authState || !authState.isAuthenticated) {
      return navigate("/login");
    }

    if (!title || !question) {
      return setSubmitError("Please fill out all form fields");
    }

    const message: MessageModel = { title: title, question: question };

    try {
      const response = await axios.post(
        `/api/messages/secure/add/message`,
        message
      );
      if (response.status == 200) {
        fetchMessages();
        setKey("second");
        setIsSubmitLoading(false);
      }
    } catch (error: any) {
      setSubmitError(error.message);
      setIsSubmitLoading(false);
      console.log(error);
    }
  };

  return (
    <Form onSubmit={postMessage}>
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
      <SubmitButton type="submit" disabled={isSubmitLoading}>
        {isSubmitLoading ? "Submitting" : "Submit"}
      </SubmitButton>
    </Form>
  );
};

export default QuestionForm;
