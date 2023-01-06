import { Container } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import NavigationMenu from "./components/Nav/NavigationMenu";
import Home from "./routes/Home";
import Login from "./routes/Login";
import Signup from "./routes/Signup";
import styled from "styled-components";
import Search from "./routes/Search";
import Book from "./routes/Book";

const AppContainer = styled(Container)`
  // border: 10px solid white;
  height: 100vh;
  position relative;
`;

function App() {
  return (
    <AppContainer>
      <NavigationMenu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/book" element={<Book />} />
      </Routes>
    </AppContainer>
  );
}

export default App;
