import { useOktaAuth } from "@okta/okta-react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import setAuthToken from "../../Auth/axiosConfig";
import MessageModel from "../../models/MessageModel";
import PageDetailsModel from "../../models/PageDetailsModel";
import UtilsDiv from "../../Utils/StyledExports";
import ErrorDiv from "../Error/ErrorDiv";
import Loading from "../Loading/Loading";
import BooksPagination from "../Search/BooksPagination";
import ActiveQuestionsDisplay from "./ActiveQuestionsDisplay";

const ReplyMessages = () => {
  // Messages & Responses State
  const [messages, setMessages] = useState<MessageModel[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Pagination State
  const [page, setPage] = useState(0);
  const [pageDetails, setPageDetails] = useState<PageDetailsModel>({
    number: 0,
    size: 0,
    totalElements: 0,
    totalPages: 0,
  });

  // Auth State
  const { authState } = useOktaAuth();
  setAuthToken();

  const fetchMessages = async () => {
    if (!authState || !authState.isAuthenticated) {
      return setErrorMessage("User is not authenticated.");
    }

    try {
      const { data: response } = await axios.get(
        `/api/messages/search/findByClosed?closed=false&page=${page}&size=5`
      );

      if (page > response.page.totalPages) {
        setPage(0);
      }

      if (response._embedded.messages) {
        setMessages(response._embedded.messages);
        setPageDetails(response.page);
        setIsLoading(false);
      }
    } catch (error: any) {
      setErrorMessage(error.message);
      setIsLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [page]);

  if (isLoading) {
    return (
      <UtilsDiv className="container m-4 position-relative">
        <Loading />
      </UtilsDiv>
    );
  }

  if (errorMessage) {
    return (
      <UtilsDiv className="container m-4 position-relative">
        <ErrorDiv errorMessage={errorMessage} />
      </UtilsDiv>
    );
  }
  return (
    <>
      <BooksPagination
        page={page}
        setPage={setPage}
        totalPages={pageDetails.totalPages}
      />
      <ActiveQuestionsDisplay messages={messages} />
      <BooksPagination
        page={page}
        setPage={setPage}
        totalPages={pageDetails.totalPages}
      />
    </>
  );
};

export default ReplyMessages;
