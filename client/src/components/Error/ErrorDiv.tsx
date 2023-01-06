import styled from "styled-components";

interface ErrorProps {
  errorMessage: String;
}

const ErrorContainer = styled.div`
  color: var(--main-white);
  font-size: 16px;
  font-weight: 600;
  text-transform: uppercase;
  background-color: var(--main-red);
  border-radius: 0.5rem;
  padding: 0.3rem;
  max-width: max-content;
  margin: 0 auto;
`;

const ErrorDiv = ({ errorMessage }: ErrorProps) => {
  return <ErrorContainer>{errorMessage}</ErrorContainer>;
};

export default ErrorDiv;
