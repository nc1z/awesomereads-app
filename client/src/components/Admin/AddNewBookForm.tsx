import { useOktaAuth } from "@okta/okta-react";
import axios from "axios";
import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import setAuthToken from "../../Auth/axiosConfig";
import AddBookRequestModel from "../../models/AddBookRequestModel";

const SubmitButton = styled.button`
  color: var(--main-white);
  font-size: 0.8rem;
  font-weight: 700;

  &:hover {
    background-color: var(--main-red);
  }
`;

const ErrorMessageDiv = styled.div`
  color: var(--main-white);
  background-color: var(--main-red);
  padding: 0.2rem 0.8rem;
  max-width: max-content;
  border-radius: 0.5rem;
  font-size: 1rem;
  margin: 1rem 0;
`;

const SuccessDiv = styled.div`
  color: var(--main-gray);
  font-size: 16px;
  font-weight: 600;
  text-transform: uppercase;
  background-color: var(--main-yellow);
  border-radius: 0.5rem;
  padding: 0.3rem;
  max-width: max-content;
  margin: 1rem 0;
`;

const AddNewBookForm = () => {
  // Form State
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [copies, setCopies] = useState(0);
  const [category, setCategory] = useState("FE");
  const [uploadedImage, setUploadedImage] = useState<any>(null);

  const [submitSuccess, setSubmitSuccess] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);

  // Auth State
  const navigate = useNavigate();
  const { authState } = useOktaAuth();
  setAuthToken();

  // Image Base64 Conversion
  const base64ImageConversion = async (e: any) => {
    if (e.target.files[0]) {
      getBase64(e.target.files[0]);
    }
  };

  const getBase64 = (file: any) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setUploadedImage(reader.result);
    };
    reader.onerror = (error) => {
      console.log("Error", error);
    };
  };

  // Default settings
  const setDefaults = () => {
    setTitle("");
    setAuthor("");
    setDescription("");
    setCopies(0);
    setCategory("FE");
    setUploadedImage(null);
  };

  // Add Book Function
  const addBook = async (e: any) => {
    e.preventDefault();
    setIsSubmitLoading(true);

    if (!authState || !authState.isAuthenticated) {
      return navigate("/login");
    }

    if (!title || !author || !description || !category || copies < 0) {
      setIsSubmitLoading(false);
      return setSubmitError("Please fill out all form fields");
    }

    const newBook: AddBookRequestModel = new AddBookRequestModel(
      title,
      author,
      description,
      copies,
      category
    );

    newBook.img = uploadedImage;

    try {
      const response = await axios.post("/api/admin/secure/add/book", newBook);
      if (response.statusText === "OK") {
        setIsSubmitLoading(false);
        setSubmitSuccess(`Success! New book: "${title}" added.`);
        setDefaults();
      }
      setIsSubmitLoading(false);
    } catch (error: any) {
      setSubmitSuccess("");
      setSubmitError(error.message);
      setIsSubmitLoading(false);
      console.log(error);
    }
  };

  return (
    <Form onSubmit={addBook}>
      <Form.Group className="mb-3">
        <Form.Label>Title</Form.Label>
        <Form.Control
          required
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Author</Form.Label>
        <Form.Control
          required
          onChange={(e) => setAuthor(e.target.value)}
          value={author}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control
          required
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Copies</Form.Label>
        <Form.Control
          as="input"
          type="number"
          required
          onChange={(e) => setCopies(Number(e.target.value))}
          value={String(copies)}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Category</Form.Label>
        <Form.Select
          onChange={(e) => setCategory(e.target.value)}
          value={category}
        >
          <option>FE</option>
          <option>BE</option>
          <option>Data</option>
          <option>DevOps</option>
        </Form.Select>
      </Form.Group>
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Select Book Cover Image</Form.Label>
        <Form.Control type="file" onChange={(e) => base64ImageConversion(e)} />
      </Form.Group>
      <SubmitButton type="submit" disabled={isSubmitLoading}>
        {isSubmitLoading ? "Submitting" : "Submit"}
      </SubmitButton>
      {submitError && <ErrorMessageDiv>{submitError}</ErrorMessageDiv>}
      {submitSuccess && <SuccessDiv>{submitSuccess}</SuccessDiv>}
    </Form>
  );
};

export default AddNewBookForm;
