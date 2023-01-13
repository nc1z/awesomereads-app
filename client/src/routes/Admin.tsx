import { useOktaAuth } from "@okta/okta-react";
import React, { useState } from "react";
import { Col, Nav, Row, Tab } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import AddNewBookForm from "../components/Admin/AddNewBookForm";
import ChangeQuantityForm from "../components/Admin/ChangeQuantityForm";
import ReplyMessages from "../components/Admin/ReplyMessages";

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
  const navigate = useNavigate();

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
              <Nav.Item>
                <Nav.Link
                  className="Navtablink"
                  onClick={() => navigate("/loans")}
                >
                  My Loans
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  className="Navtablink"
                  onClick={() => navigate("/services")}
                >
                  My Services
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey="first">
                <AddNewBookForm />
              </Tab.Pane>
              <Tab.Pane eventKey="second">
                <ChangeQuantityForm />
              </Tab.Pane>
              <Tab.Pane eventKey="third">
                <ReplyMessages />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </AdminRow>
      </Tab.Container>
    </AdminRouteContainer>
  );
};

export default Admin;
