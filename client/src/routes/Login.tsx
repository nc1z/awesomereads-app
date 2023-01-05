import React from "react";
import styled from "styled-components";

const LoginContainer = styled.div`
  //   border: 10px solid white;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 20%;
`;

const Login = () => {
  return <LoginContainer>Login</LoginContainer>;
};

export default Login;
