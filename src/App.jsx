import { Route, Routes } from "react-router-dom";
import "./App.css";

import Header from "./components/Header";
import Home from "./pages/Home";
import Details from "./pages/Details";


function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/details/:line" element={<Details />} />
    </Routes>
  );
}

export default App;
