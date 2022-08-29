import "./App.css";
import React, { Fragment } from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  // Redirect,
} from "react-router-dom";

// import { toast } from "react-toastify";

import Dashboard from "./Components/Dashboard";
import Login from "./Components/Login";
import Register from "./Components/Register";

function App() {
  return (
    <Fragment>
      <div className="container">
        <Routes>
          <Route exact path="login" element={<Login />} />
          <Route
            exact
            path="/register"
            render={(props) => <Register {...props} />}
          />
          <Route
            exact
            path="/dashboard"
            render={(props) => <Dashboard {...props} />}
          />
        </Routes>
      </div>
    </Fragment>
  );
}

export default App;
