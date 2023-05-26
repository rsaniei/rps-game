import React from "react";
import "./App.scss";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Game from "./pages/Game";
import RequiredName from "./RequiredName";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <RequiredName>
                <Game />
              </RequiredName>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
