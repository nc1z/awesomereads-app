import { useOktaAuth } from "@okta/okta-react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Nav, Row, Tab } from "react-bootstrap";
import styled from "styled-components";
import ErrorDiv from "../components/Error/ErrorDiv";
import Loading from "../components/Loading/Loading";
import QuestionForm from "../components/Services/QuestionForm";
import QuestionResponseDisplay from "../components/Services/QuestionResponseDisplay";
import MessageModel from "../models/MessageModel";
import UtilsDiv from "../Utils/StyledExports";

const ServicesRouteContainer = styled.div`
  // border: 5px solid red;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ServicesRow = styled(Row)`
  //   border: 5px solid white;
  color: var(--main-white);
  display: flex;
  width: 100%;
  margin-top: 2rem;
  margin-bottom: 12rem;

  @media (max-width: 480px) {
    gap: 2rem;
    margin-top: 2rem;
    margin-bottom: 10rem;
  }
`;

const Services = () => {
  // Tab Keys State
  const [key, setKey] = useState("first");

  // Messages & Responses State
  const [messages, setMessages] = useState<MessageModel[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const { authState } = useOktaAuth();

  const fetchMessages = async () => {
    try {
      const { data: response } = await axios.get(
        `/api/messages/search/findByUserEmail?userEmail=${authState?.accessToken?.claims.sub}`
      );
      if (response._embedded.messages) {
        setMessages(response._embedded.messages);
        setIsLoading(false);
      }
    } catch (error: any) {
      setErrorMessage(error.message);
      setIsLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

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

  return (
    <ServicesRouteContainer>
      <Tab.Container
        activeKey={key}
        onSelect={(k) => setKey(k ? k : "first")}
        defaultActiveKey="first"
      >
        <ServicesRow>
          <Col sm={3}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item className="Navitem">
                <Nav.Link
                  eventKey="first"
                  className={`Navtablink ${key == "first" && "Navtabactive"}`}
                >
                  Ask a Question
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  eventKey="second"
                  className={`Navtablink ${key == "second" && "Navtabactive"}`}
                >
                  Q&A Responses
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey="first">
                <QuestionForm setKey={setKey} fetchMessages={fetchMessages} />
              </Tab.Pane>
              <Tab.Pane eventKey="second">
                <QuestionResponseDisplay messages={messages} />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </ServicesRow>
      </Tab.Container>
    </ServicesRouteContainer>
  );
};

export default Services;
