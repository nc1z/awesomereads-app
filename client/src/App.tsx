import { Container } from "react-bootstrap";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import NavigationMenu from "./components/Nav/NavigationMenu";
import Home from "./routes/Home";
import Login from "./routes/Login";
import styled from "styled-components";
import Search from "./routes/Search";
import Book from "./routes/Book";
import { oktaConfig } from "./lib/oktaConfig";
import { OktaAuth, toRelativeUrl } from "@okta/okta-auth-js";
import { LoginCallback, Security } from "@okta/okta-react";
import Loading from "./components/Loading/Loading";
import ProtectedRoute from "./Auth/ProtectedRoute";
import Services from "./routes/Services";
import Reviews from "./routes/Reviews";
import Loans from "./routes/Loans";
import Admin from "./routes/Admin";

const AppContainer = styled(Container)`
  // border: 10px solid white;
  height: 100vh;
  position relative;
`;

const UtilsDiv = styled.div`
  position: fixed;
  top: 36%;
`;

const oktaAuth = new OktaAuth(oktaConfig);

function App() {
  const navigate = useNavigate();

  const customAuthHandler = () => {
    navigate("/login");
  };

  const restoreOriginalUri = async (_oktaAuth: any, originalUri: any) => {
    navigate(toRelativeUrl(originalUri || "/", window.location.origin));
  };

  return (
    <AppContainer>
      <Security
        oktaAuth={oktaAuth}
        restoreOriginalUri={restoreOriginalUri}
        onAuthRequired={customAuthHandler}
      >
        <NavigationMenu />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/login/callback"
            element={
              <LoginCallback
                loadingElement={
                  <UtilsDiv>
                    <Loading />
                  </UtilsDiv>
                }
              />
            }
          />
          <Route path="/book/:bookId" element={<Book />} />
          <Route path="/reviews/:bookId" element={<Reviews />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/services" element={<Services />} />
            <Route path="/loans" element={<Loans />} />
            <Route path="/admin" element={<Admin />} />
          </Route>
        </Routes>
      </Security>
    </AppContainer>
  );
}

export default App;
