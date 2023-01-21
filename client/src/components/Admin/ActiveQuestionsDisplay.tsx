import { useOktaAuth } from "@okta/okta-react";
import axios from "axios";
import React, { useState } from "react";
import { Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import setAuthToken from "../../Auth/axiosConfig";
import AdminReplyModel from "../../models/AdminReplyModel";
import MessageModel from "../../models/MessageModel";

interface ActiveQuestionDisplayProps {
  messages: MessageModel[];
  fetchMessages: () => Promise<void>;
}

const MessagesContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding: 1rem 0;
  overflow: auto;
`;

const MessageContainer = styled(Container)`
  display: flex;
  justify-content: start;
  align-items: center;
  width: 95%;
  font-size: 1rem;
  gap: 2rem;
  margin-bottom: 1rem;
  padding: 0.8rem 1rem;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

  @media (max-width: 480px) {
    flex-direction: column;
    justify-content: center;
  }
`;

const UserSpan = styled.span`
  background-color: var(--main-gray);
  color: var(--main-white);
  padding: 0.1rem 0.4rem;
  max-width: max-content;
  border-radius: 0.5rem;
`;

const MessageDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  width: 100%;
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

const SubmitButton = styled.button`
  color: var(--main-white);
  font-size: 0.8rem;
  font-weight: 700;

  &:hover {
    background-color: var(--main-red);
  }
`;

const ActiveQuestionsDisplay = ({
  messages,
  fetchMessages,
}: ActiveQuestionDisplayProps) => {
  // Form state
  const [reply, setReply] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);

  // Auth State
  const { authState } = useOktaAuth();
  setAuthToken();

  const postReply = async (e: any, messageId?: number) => {
    e.preventDefault();
    setIsSubmitLoading(true);

    if (!authState || !authState.isAuthenticated) {
      return setSubmitError("User is not authenticated.");
    }
    if (!messageId) {
      return setSubmitError("Message does not exist.");
    }
    if (!reply) {
      return setSubmitError("Reply cannot be empty.");
    }

    const adminReplyMessage: AdminReplyModel = new AdminReplyModel(
      messageId,
      reply
    );
    try {
      const response = await axios.put(
        "/api/messages/secure/admin/message",
        adminReplyMessage
      );
      if (response.status == 200) {
        setIsSubmitLoading(false);
        fetchMessages();
      }
    } catch (error: any) {
      setSubmitError(error.message);
      setIsSubmitLoading(false);
      console.log(error);
    }
  };
  return (
    <MessagesContainer>
      {messages.length > 0 &&
        messages
          .map((message: MessageModel) => (
            <MessageContainer key={message.title}>
              <MessageDiv>
                <h3>
                  Ticket #{message.id} - {message.title}
                </h3>
                <UserSpan>{message.userEmail}</UserSpan>
                <p>{message.question}</p>

                <hr />
                <h3>Response</h3>
                <Form onSubmit={(e) => postReply(e, message.id)}>
                  {submitError && (
                    <ErrorMessageDiv>{submitError}</ErrorMessageDiv>
                  )}
                  <Form.Group className="mb-3">
                    <Form.Label>Admin Response</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      required
                      placeholder="Type your reply here..."
                      onChange={(e) => setReply(e.target.value)}
                    />
                  </Form.Group>
                  <SubmitButton type="submit" disabled={isSubmitLoading}>
                    {isSubmitLoading ? "Submitting" : "Submit"}
                  </SubmitButton>
                </Form>
              </MessageDiv>
            </MessageContainer>
          ))
          .reverse()}
    </MessagesContainer>
  );
};

export default ActiveQuestionsDisplay;
