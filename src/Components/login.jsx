import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { setLoggedInUser, logout } from "../actions";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function Login() {
  const [user, setUser] = useState({ email: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const activeUser = localStorage.getItem("user");
    if (activeUser) {
      const foundUser = JSON.parse(activeUser);
      dispatch(setLoggedInUser(foundUser));
      console.log(foundUser);
      axios
        .get(`http://localhost:5000/user/${foundUser.user.userId}`)
        .then((res) => {
          setUser(res.data);
        });
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user.email);
    axios
      .post("http://localhost:5000/login", user)
      .then((res) => {
        console.log(res);
        dispatch(setLoggedInUser(res.data));
        navigate("/");
        localStorage.setItem("user", JSON.stringify(res.data));
        const foundUser = res.data.user;
        console.log("======", foundUser);
        axios
          .get(`http://localhost:5000/user/${foundUser.user.userId}`)
          .then((res) => {
            setUser(res.data);
            console.log("======", res);
          });
      })
      .catch((err) => console.log(err));
  };

  const handleLogout = () => {
    setUser({ email: "" });
    dispatch(logout());
    localStorage.clear();
  };
  const asur = {
    userId: "62417f573109654fa462d04b",
    email: "bmed@hotmail.com",
  };

  if (user._id) {
    return (
      <div style={{ marginBottom: "40vh" }}>
        {user.email} is loggged in
        <button onClick={handleLogout}>logout</button>
        <ul style={{ listStyleType: "none", margin: "0" }}>
          {user.todo.map((item) => {
            return <li key={item._id}>{item.title} </li>;
          })}
        </ul>
      </div>
    );
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          required
          placeholder="Enter your email"
          value={user.email}
          onChange={(e) => setUser({ email: e.target.value })}
        />
        <input type="submit" value="Log in" />
      </form>
    </div>
  );
}

export default Login;
