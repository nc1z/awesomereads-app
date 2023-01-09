import React, { useState } from "react";
import styled from "styled-components";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import LoansPage from "../components/Loans/LoansPage";
import History from "../components/Loans/History";

const LoansRouteContainer = styled.div`
  //   border: 5px solid red;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoansRow = styled(Row)`
  //   border: 5px solid white;
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

const Loans = () => {
  const [key, setKey] = useState("first");
  return (
    <LoansRouteContainer>
      <Tab.Container
        activeKey={key}
        onSelect={(k) => setKey(k ? k : "first")}
        defaultActiveKey="first"
      >
        <LoansRow>
          <Col sm={3}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item className="Navitem">
                <Nav.Link
                  eventKey="first"
                  className={`Navtablink ${key == "first" && "Navtabactive"}`}
                >
                  Loans
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  eventKey="second"
                  className={`Navtablink ${key == "second" && "Navtabactive"}`}
                >
                  My history
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey="first">
                <LoansPage />
              </Tab.Pane>
              <Tab.Pane eventKey="second">
                <History />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </LoansRow>
      </Tab.Container>
    </LoansRouteContainer>
  );
};

export default Loans;
