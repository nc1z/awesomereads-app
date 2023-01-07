// Using JSX according to Okta Documentation
import { Redirect } from "react-router-dom";
import { useOktaAuth } from "@okta/okta-react";
import Spinner from "react-bootstrap/Spinner";

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
    <div></div>
  );
};

export default LoginWidget;
