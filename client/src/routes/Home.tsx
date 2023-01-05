import React from "react";
import styled from "styled-components";
import CarouselContainer from "../components/Homepage/CarouselContainer";

const HomeContainer = styled.div`
  // border: 5px solid red;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 20%;
`;

const Home = () => {
  return (
    <HomeContainer>
      <CarouselContainer />
    </HomeContainer>
  );
};

export default Home;
