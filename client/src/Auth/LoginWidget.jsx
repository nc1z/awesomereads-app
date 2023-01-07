// Using JSX according to Okta Documentation
import { Redirect } from "react-router-dom";
import { useOktaAuth } from "@okta/okta-react";
import Spinner from "react-bootstrap/Spinner";
import OktaSignInWidget from "./OktaSignInWidget";

const LoginWidget = ({ config }) => {
  const { oktaAuth, authState } = useOktaAuth();
  const onSuccess = (tokens) => {
    oktaAuth.handleLoginRedirect(tokens);
  };
  const onError = (error) => {
    console.log("Sign in error: " + error);
  };

  if (!authState) {
    return (
      <Spinner animation="border" role="status" variant="warning"></Spinner>
    );
  }
  return authState.isAuthenticated ? (
    <Redirect to={{ pathname: "/" }} />
  ) : (
    <OktaSignInWidget config={config} onSuccess={onSuccess} onError={onError} />
  );
};

export default LoginWidget;
