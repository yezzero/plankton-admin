import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import AdminMain from './page/AdminMain';

function App() {
  return (
    <div className="App">
      <div className="app-container">
        <Router>
          <Routes>
            <Route path="/" element={<AdminMain />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
