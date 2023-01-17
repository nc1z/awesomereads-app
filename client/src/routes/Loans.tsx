import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import LoansPage from "../components/Loans/LoansPage";
import History from "../components/Loans/History";
import setAuthToken from "../Auth/axiosConfig";
import axios from "axios";
import CurrentLoansModel from "../models/CurrentLoansModel";
import { useOktaAuth } from "@okta/okta-react/";
import UtilsDiv from "../Utils/StyledExports";
import Loading from "../components/Loading/Loading";
import ErrorDiv from "../components/Error/ErrorDiv";
import HistoryModel from "../models/HistoryModel";
import PageDetailsModel from "../models/PageDetailsModel";

const LoansRouteContainer = styled.div`
  //   border: 5px solid red;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoansRow = styled(Row)`
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

const Loans = () => {
  // Tab Keys State
  const [key, setKey] = useState("first");

  // Loans State
  const [currentLoans, setCurrentLoans] = useState<CurrentLoansModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const { authState } = useOktaAuth();
  setAuthToken();

  // History State
  const [history, setHistory] = useState<HistoryModel[]>([]);

  // Pagination State for History
  const [page, setPage] = useState(0);
  const [pageDetails, setPageDetails] = useState<PageDetailsModel>({
    number: 0,
    size: 0,
    totalElements: 0,
    totalPages: 0,
  });

  const fetchCurrentLoans = async () => {
    try {
      if (authState && authState.isAuthenticated) {
        const { data: response } = await axios.get(
          `/api/books/secure/currentloans`
        );
        if (response) {
          setCurrentLoans(response);
        }
      }
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      setErrorMessage(error.message);
      console.log(error);
    }
  };

  const fetchLoansHistory = async () => {
    try {
      if (authState && authState.isAuthenticated) {
        const { data: response } = await axios.get(
          `/api/histories/search/findBooksByUserEmail?userEmail=${authState.accessToken?.claims.sub}&page=${page}&size=5&sort=returnedDate,desc`
        );
        if (response._embedded.histories) {
          setHistory(response._embedded.histories);
          setPageDetails(response.page);
        }
      }
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      setErrorMessage(error.message);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCurrentLoans();
  }, [authState]);

  useEffect(() => {
    fetchLoansHistory();
  }, [authState, page]);

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
                  Active Loans
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
                <LoansPage
                  currentLoans={currentLoans}
                  fetchCurrentLoans={fetchCurrentLoans}
                  fetchLoansHistory={fetchLoansHistory}
                />
              </Tab.Pane>
              <Tab.Pane eventKey="second">
                <History
                  history={history}
                  fetchLoansHistory={fetchLoansHistory}
                  page={page}
                  setPage={setPage}
                  totalPages={pageDetails.totalPages}
                  pageDetails={pageDetails}
                  isLoading={isLoading}
                  errorMessage={errorMessage}
                />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </LoansRow>
      </Tab.Container>
    </LoansRouteContainer>
  );
};

export default Loans;
