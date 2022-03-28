import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RemoveTodo, ToggleTodo } from "../actions";
import axios from "axios";

function TodoList() {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  // useEffect(() => {
  //     let mounted = true;
  //     if (mounted) {
  //       axios
  //         .get("http://localhost:4000/todo/getTodos")
  //         .then((res) => {
  //      dispatch(SetTodo(res.data));
  //         });
  //     }

  //   return () => {
  //     mounted = false;
  //   };
  // }, []);

  return (
    <div>
      <ul style={{ margin: "0", padding: "2rem" }}>
        {todos.map((todo) => {
          return (
            <li
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                gap: "1rem",
              }}
              key={todo._id}
              className={todo.completed ? "completed" : ""}
            >
              <button onClick={() => dispatch(ToggleTodo(todo))}>Toggle</button>
              <p>{todo.title} </p>
              <span>{todo.description}</span>
              <div style={{ marginLeft: "auto" }}>
                {todo.date ? <span>Due date : {todo.date}</span> : null}
              </div>
              <button onClick={() => dispatch(RemoveTodo(todo))}>
                Remove Todo
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default TodoList;
