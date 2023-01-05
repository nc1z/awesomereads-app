import React from "react";
import styled from "styled-components";

const SearchContainer = styled.div`
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

const Search = () => {
  return <SearchContainer>Search</SearchContainer>;
};

export default Search;
