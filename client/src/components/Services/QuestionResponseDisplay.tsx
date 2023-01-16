import React from "react";
import { Container } from "react-bootstrap";
import styled from "styled-components";
import MessageModel from "../../models/MessageModel";

interface QuestionResponseDisplayProps {
  messages: MessageModel[];
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

const QuestionResponseDisplay = ({
  messages,
}: QuestionResponseDisplayProps) => {
  if (messages.length <= 0) {
    return <MessagesContainer>No messages sent.</MessagesContainer>;
  }
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
                {message.response ? (
                  <>
                    <UserSpan>{message.adminEmail}</UserSpan>
                    <p>{message.response}</p>
                  </>
                ) : (
                  <p>
                    <em>Pending response from admin</em>
                  </p>
                )}
              </MessageDiv>
            </MessageContainer>
          ))
          .reverse()}
    </MessagesContainer>
  );
};

export default QuestionResponseDisplay;
