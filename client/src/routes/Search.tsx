import React from "react";
import styled from "styled-components";
import SearchDisplay from "../components/Search/SearchDisplay";

const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Search = () => {
  return (
    <SearchContainer>
      <SearchDisplay />
    </SearchContainer>
  );
};

export default Search;
