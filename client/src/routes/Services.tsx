import React, { useState } from "react";
import { Col, Nav, Row, Tab } from "react-bootstrap";
import styled from "styled-components";

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
                <div>Question Page</div>
              </Tab.Pane>
              <Tab.Pane eventKey="second">
                <div>Answers Page</div>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </ServicesRow>
      </Tab.Container>
    </ServicesRouteContainer>
  );
};

export default Services;
