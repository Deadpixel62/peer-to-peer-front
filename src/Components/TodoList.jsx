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
      <ul>
        {todos.map((todo) => {
          return (
            <li
              style={{ display: "flex", justifyContent: "space-between" }}
              key={todo.id}
              className={todo.completed ? "completed" : ""}
            >
              <button onClick={() => dispatch(ToggleTodo(todo))}>Toggle</button>
              <p>{todo.title} </p>
              <span>{todo.description}</span>

              {todo.date ? <span>Due date : {todo.date}</span> : null}

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
