import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./routes/Home";
import Login from "./routes/Login";
import Signup from "./routes/Signup";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;
