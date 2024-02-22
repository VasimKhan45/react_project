import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Login from "./Login/Login";
import Home from "./Home/Home";
import NewNotes from "./NewNotes/NewNotes";
import Registration from "./Registration/Registration";

function App() {
  const homePageValue = sessionStorage.getItem("HomePage");
  const LoginPage = sessionStorage.getItem("LoginPage");
  const [login,setLogin] = useState(false);

  useEffect(() => {
    if (window.location.pathname === "/") {
      sessionStorage.removeItem("HomePage");
      sessionStorage.removeItem("LoginPage");
    }
  }, [login]);

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Login setLogin={setLogin} />} />
          <Route
            path="/home"
            element={LoginPage ? <Home /> : <Navigate to="/" />}
          />
          <Route
            path="/newnotes"
            element={homePageValue ? <NewNotes /> : <Navigate to="/" />}
          />
          <Route
            path="/register"
            element={<Registration />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
