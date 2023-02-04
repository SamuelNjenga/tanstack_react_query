import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Tweet from "./components/tweets/Tweet";
import User from "./components/users/User";
import Home from "./pages/Home";

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />{" "}
          <Route path="/users" element={<User />} />{" "}
          <Route path="/tweets" element={<Tweet />} />{" "}
        </Routes>
      </Router>
    </div>
  );
};

export default App;
