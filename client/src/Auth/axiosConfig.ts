import axios from "axios";
import { useOktaAuth } from "@okta/okta-react";

const setAuthToken = () => {
  const { authState } = useOktaAuth();
  axios.defaults.headers.common["Authorization"] = "";
  delete axios.defaults.headers.common["Authorization"];

  if (!authState) {
    return;
  }

  const token = authState.accessToken?.accessToken;
  if (token) {
    axios.defaults.headers.common["authorization"] = `Bearer ${token}`;
  }
};

export default setAuthToken;
