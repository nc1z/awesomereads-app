import { useOktaAuth } from "@okta/okta-react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Loading from "../components/Loading/Loading";
import UtilsDiv from "../Utils/StyledExports";

const LoginContainer = styled.div`
  //   border: 10px solid white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 1.25rem;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 20%;
`;

const AuthButton = styled.button`
  color: var(--main-white);
  font-weight: 700;

  &:hover {
    background-color: var(--main-red);
  }
`;

const Login = () => {
  const { authState, oktaAuth } = useOktaAuth();
  const [userInfo, setUserInfo] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    await oktaAuth.signInWithRedirect();
  };

  const handleLogout = async () => {
    setIsLoading(true);
    await oktaAuth.signOut();
  };

  const fetchUser = () => {
    if (!authState || !authState.isAuthenticated) {
      setUserInfo(null);
    } else {
      oktaAuth.getUser().then((info) => {
        setUserInfo(info);
      });

      const token = authState.accessToken?.accessToken;
      if (token) {
        axios.defaults.headers.common["authorization"] = `Bearer ${token}`;
      }
    }
  };

  useEffect(() => {
    fetchUser();
  }, [authState, oktaAuth]);

  if (!authState) {
    return (
      <UtilsDiv className="container m-4">
        <Loading />
      </UtilsDiv>
    );
  }

  // if (authState.isAuthenticated && userInfo) {
  //   console.log("retrieved userinfo: ");
  //   console.log(userInfo);
  //   console.log("Logged in AuthState: ");
  //   console.log(authState);
  // } else {
  //   console.log("No userinfo: ");
  //   console.log(userInfo);
  // }

  if (!authState.isAuthenticated) {
    return (
      <LoginContainer>
        <img src="/images/undraw-read-1.svg" className="svgart" />
        <h3>To read is to voyage through time.</h3>
        <AuthButton onClick={handleLogin} disabled={isLoading && true}>
          Login
        </AuthButton>
      </LoginContainer>
    );
  }

  if (authState.isAuthenticated && !userInfo) {
    return (
      <LoginContainer>
        <img src="/images/undraw-read-1.svg" className="svgart" />
        <div>Loading user information...</div>
        <AuthButton onClick={handleLogout} disabled={isLoading && true}>
          Sign out
        </AuthButton>
      </LoginContainer>
    );
  }

  return (
    <LoginContainer>
      <img src="/images/undraw-read-1.svg" className="svgart" />
      <div>Email: {userInfo.email}</div>
      <div>Name: {userInfo.name}</div>
      <div>Last Logged in: {userInfo.headers.date}</div>
      <AuthButton onClick={handleLogout} disabled={isLoading && true}>
        Sign out
      </AuthButton>
    </LoginContainer>
  );
};

export default Login;
