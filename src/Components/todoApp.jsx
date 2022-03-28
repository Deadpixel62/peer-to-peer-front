import React from "react";
import Todo from "./Todo";
import TodoList from "./TodoList";
import { useDispatch, useSelector } from "react-redux";
import { setLoggedInUser, SetTodo } from "../actions";
import { useEffect } from "react";
import axios from "axios";

function TodoApp() {
  const dispatch = useDispatch();

  useEffect(() => {
    const activeUser = localStorage.getItem("user");
    if (activeUser) {
      const foundUser = JSON.parse(activeUser);
      dispatch(setLoggedInUser(foundUser));
      axios
        .get(`http://localhost:5000/user/${foundUser.user.userId}`)
        .then((res) => dispatch(SetTodo(res.data.todo)));
    }
  }, []);

  return (
    <div>
      <Todo />
      <TodoList />
    </div>
  );
}

export default TodoApp;
