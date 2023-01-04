import { Container } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Nav/Navbar";
import Home from "./routes/Home";
import Login from "./routes/Login";
import Signup from "./routes/Signup";
import styled from "styled-components";

const AppContainer = styled(Container)`
  border: 10px solid white;
  height: 100vh;
  position relative;
`;

function App() {
  return (
    <AppContainer>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </AppContainer>
  );
}

export default App;
