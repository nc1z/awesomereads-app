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

const AdminRouteContainer = styled.div`
  // border: 5px solid red;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AdminRow = styled(Row)`
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

const Admin = () => {
  // Tab Keys State
  const [key, setKey] = useState("first");

  const { authState } = useOktaAuth();

  return (
    <AdminRouteContainer>
      <Tab.Container
        activeKey={key}
        onSelect={(k) => setKey(k ? k : "first")}
        defaultActiveKey="first"
      >
        <AdminRow>
          <Col sm={3}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item className="Navitem">
                <Nav.Link
                  eventKey="first"
                  className={`Navtablink ${key == "first" && "Navtabactive"}`}
                >
                  Add new book
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  eventKey="second"
                  className={`Navtablink ${key == "second" && "Navtabactive"}`}
                >
                  Manage Books
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  eventKey="third"
                  className={`Navtablink ${key == "third" && "Navtabactive"}`}
                >
                  Messages
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey="first">
                <div>Add New Book Form</div>
              </Tab.Pane>
              <Tab.Pane eventKey="second">
                <div>Change Quantity Form</div>
              </Tab.Pane>
              <Tab.Pane eventKey="third">
                <div>Reply to messages</div>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </AdminRow>
      </Tab.Container>
    </AdminRouteContainer>
  );
};

export default Admin;
