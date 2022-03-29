import axios from "axios";

const initialState = {
  todos: [],
  loggedInUser: {},
  registeredUser: "",
};

const myData = function (data) {
  let myId;
  myId = data.newTodo._id;
  return myId;
};

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case "setRegisteredUser":
      console.log(action);
      return { ...state, registeredUser: action.payload };
    case "setLoggedInUser":
      return { ...state, loggedInUser: action.payload };

    case "logout":
      return { ...state, loggedInUser: {}, todos: [] };

    case "SetTodo":
      return {
        ...state,
        todos: action.payload,
      };

    case "AddTodo":
      axios
        .post(
          "https://todolist-appli.herokuapp.com/todos/addTodo",
          action.payload
        )
        .then((res) => {
          let activityId = myData(res.data);
          let user = {
            userId: state.loggedInUser.user.userId,
            activityId,
          };
          axios
            .post(`https://todolist-appli.herokuapp.com/user/addTodo`, user)
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
      return { ...state, todos: [...state.todos, action.payload] };

    case "RemoveTodo":
      axios
        .delete("http://localhost:5000/todos/removeTodo", {
          data: action.payload,
        })
        .catch((err) => console.log(err));
      return {
        ...state,
        todos: state.todos.filter((el) => el._id != action.payload._id),
      };

    case "ToggleTodo":
      let todo = {
        _id: action.payload._id,
        completed: !action.payload.completed,
      };

      axios.put(
        "https://todolist-appli.herokuapp.com/todos/toggleCompleted",
        todo
      );

      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo._id === action.payload._id) {
            return {
              ...todo,
              completed: !todo.completed,
            };
          } else {
            return todo;
          }
        }),
      };

    default:
      return state;
  }
};

export default Reducer;
