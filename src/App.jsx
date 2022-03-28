import React from "react";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import TodoApp from "./Components/todoApp";
import { Routes, Route, Link } from "react-router-dom";
import Login from "./Components/login";
import Signup from "./Components/Signup";

function App() {
  const count = useSelector((state) => state.counter);

  return (
    <div className="App">
      <nav
        style={{
          paddingTop: "2vh",
          display: "flex",
          justifyContent: "flex-end",
          gap: "12px",
          color: "#DFF6FF",
          marginBottom: "2rem",
          padding: "1rem",
        }}
      >
        <div>
          <Link className="lnk" to="/">
            Home{" "}
          </Link>
        </div>
        <Link className="lnk" to="/login">
          Log in{" "}
        </Link>
        <Link className="lnk" to="/signup">
          Register{" "}
        </Link>
      </nav>

      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<TodoApp />} />
      </Routes>
    </div>
  );
}

export default App;
