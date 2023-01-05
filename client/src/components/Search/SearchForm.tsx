import React, { useEffect, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import styled from "styled-components";

interface SearchFormProps {
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
}

const InputForm = styled(Form)`
  width: 60%;
`;

const SearchButton = styled(Button)`
  background-color: var(--main-orange);
  color: var(--main-white);
  font-weight: 600;
  border: none;
  font-size: 1.3rem;

  &:hover {
    color: var(--main-white) !important;
    background-color: var(--main-red) !important;
  }

  &:active {
    color: var(--main-white) !important;
    background-color: var(--main-red) !important;
  }
`;

const SearchForm = ({ setSearchText }: SearchFormProps) => {
  const [inputText, setInputText] = useState("");

  const handleSearch = (e: any) => {
    e.preventDefault();
    setSearchText(inputText);
    setInputText("");
  };

  return (
    <InputForm onSubmit={(e: any) => handleSearch(e)}>
      <InputGroup>
        <Form.Control
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Search by author or title"
          aria-label="Search by author or title"
          value={inputText}
        />
        <SearchButton variant="warning" type="submit">
          Search
        </SearchButton>
      </InputGroup>
    </InputForm>
  );
};

export default SearchForm;
