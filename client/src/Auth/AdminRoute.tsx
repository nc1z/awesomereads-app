import React, { useEffect } from "react";
import { useOktaAuth } from "@okta/okta-react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Loading from "../components/Loading/Loading";
import styled from "styled-components";

const UtilsDiv = styled.div`
  position: fixed;
  top: 36%;
`;

const AdminRoute = () => {
  const { oktaAuth, authState } = useOktaAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authState) {
      return;
    }

    if (!authState?.isAuthenticated) {
      navigate("/login");
    }
  }, [oktaAuth, !!authState, authState?.isAuthenticated]);

  if (!authState || !authState?.isAuthenticated) {
    return (
      <UtilsDiv className="container m-4">
        <Loading />
      </UtilsDiv>
    );
  }

  if (authState.accessToken?.claims.userType === undefined) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default AdminRoute;
