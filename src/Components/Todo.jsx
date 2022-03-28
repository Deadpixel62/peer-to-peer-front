import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AddTodo } from "../actions";

function Todo() {
  const [userInput, setUserInput] = useState({ title: "", description: "" });

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

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          userInput.title.trim().length != 0
            ? dispatch(AddTodo(userInput))
            : alert("Please enter a To-Do");
          setUserInput({ title: "", description: "" });
        }}
      >
        <input
          required
          type="text"
          value={userInput.title}
          placeholder="Enter a Todo"
          onChange={handleChange}
        />
        <textarea
          onChange={handleDescription}
          value={userInput.description}
          placeholder="Enter a description.."
        />
        <label>
          Enter a Due Date:
          <input type="date" onChange={handleDate} />
        </label>
        <input type="submit" />
      </form>
    </div>
  );
}

export default Todo;
