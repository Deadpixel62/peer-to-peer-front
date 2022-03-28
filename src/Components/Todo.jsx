import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AddTodo } from "../actions";
import { useSelector } from "react-redux";

function Todo() {
  const [userInput, setUserInput] = useState({ title: "", description: "" });
  const loggedInUser = useSelector((state) => state.loggedInUser);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setUserInput({ title: e.target.value, completed: false });
  };

  const handleDescription = (e) => {
    setUserInput({ ...userInput, description: e.target.value });
  };

  const handleDate = (e) => {
    setUserInput({ ...userInput, date: e.target.value });
    console.log(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    userInput.title.trim().length != 0
      ? dispatch(AddTodo(userInput))
      : alert("Please enter a To-Do");
    setUserInput({ title: "", description: "" });
  };

  return (
    <div>
      <form
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        onSubmit={(e) => {
          loggedInUser.user
            ? handleSubmit(e)
            : alert("Please login to add a To-Do");
        }}
      >
        <input
          required
          type="text"
          value={userInput.title}
          placeholder="Enter a Todo"
          onChange={handleChange}
        />
        <input
          type="text"
          onChange={handleDescription}
          value={userInput.description}
          style={{ width: "30%" }}
          placeholder="Enter a description.."
        />

        <input type="date" onChange={handleDate} />

        <input value="Add todo" type="submit" />
      </form>
    </div>
  );
}

export default Todo;
