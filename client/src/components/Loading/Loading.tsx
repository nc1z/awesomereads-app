import { useEffect, useState } from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import styled from "styled-components";

const LoadingBar = styled(ProgressBar)`
  background: var(--main-white) !important;
  max-width: 30vw;
  margin: 0 auto;
`;

const Loading = () => {
  const [progress, setProgress] = useState(45);

  useEffect(() => {
    setTimeout(() => setProgress(85), 3000);
  }, []);

  return <LoadingBar variant="warning" striped animated now={progress} />;
};

export default Loading;
