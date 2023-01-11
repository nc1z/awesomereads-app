import { Link } from "react-router-dom";
import styled from "styled-components";

const UtilsDiv = styled.div`
  position: fixed;
  top: 36%;
`;

export const StyledLink = styled(Link)`
  font-size: 12px;
  color: var(--main-white);
  background-color: var(--main-orange);
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.1rem 0.6rem;
  font-family: inherit;
  cursor: pointer;
  width: max-content;

  &:hover {
    color: var(--main-white);
    background-color: var(--main-red);
  }
  &:active {
    color: var(--main-white);
    background-color: var(--main-red);
  }
`;

export default UtilsDiv;
