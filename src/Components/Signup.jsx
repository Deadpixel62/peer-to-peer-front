import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { setLoggedInUser, logout, setRegisteredUser } from "../actions";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [user, setUser] = useState({ email: "" });
  const [loggedIn, setloggedIn] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const usr = {
    userId: "62417f573109654fa462d04b",
  };

  useEffect(() => {
    const activeUser = localStorage.getItem("user");
    if (activeUser) {
      const foundUser = JSON.parse(activeUser);
      dispatch(setLoggedInUser(foundUser.user));
      axios
        .get(`http://localhost:5000/user/${foundUser.user.userId}`)
        .then((res) => setloggedIn(res.data))
        .catch((err) => console.log(err));
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/register", user)
      .then((res) => navigate("/login"))
      .catch((err) => console.log(err));

    dispatch(setRegisteredUser(user.email));
    setUser({ email: "" });
  };

  const handleLogout = () => {
    setloggedIn();
    dispatch(logout());
    localStorage.clear();
  };

  if (loggedIn) {
    return (
      <div className="App">
        {loggedIn.email} is logged in, please logout to register a new account.
        <button onClick={handleLogout}>logout</button>
      </div>
    );
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Register:</h1>
        <input
          type="email"
          required
          placeholder="Enter your sign up email"
          value={user.email}
          onChange={(e) => setUser({ email: e.target.value })}
        />
        <input type="submit" value="Sign up" />
      </form>
    </div>
  );
}

export default Signup;
