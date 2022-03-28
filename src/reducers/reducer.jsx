import axios from "axios";

const initialState = {
  todos: [],
  loggedInUser: {},
};

const myData = function (data) {
  let myId;
  myId = data.newTodo._id;
  console.log(myId);
  return myId;
};

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case "setLoggedInUser":
      console.log(action);
      return { ...state, loggedInUser: action.payload };

    case "logout":
      return { ...state, loggedInUser: {}, todos: [] };

    case "SetTodo":
      console.log("*****************");
      console.log(action);
      console.log("****************");
      return {
        ...state,
        todos: action.payload,
      };

    case "AddTodo":
      console.log(state);
      console.log(action);
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
          console.log("°°°°°", user);
          axios
            .post(`https://todolist-appli.herokuapp.com/user/addTodo`, user)
            .then((res) => console.log("$$$$$", res))
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
      return { ...state, todos: [...state.todos, action.payload] };

    case "RemoveTodo":
      console.log("====", action.payload);
      axios
        .delete("http://localhost:5000/todos/removeTodo", {
          data: action.payload,
        })
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err));
      return {
        ...state,
        todos: state.todos.filter((el) => el._id != action.payload._id),
      };

    case "ToggleTodo":
      console.log(state);
      let todo = {
        _id: action.payload._id,
        completed: !action.payload.completed,
      };

      axios
        .put("https://todolist-appli.herokuapp.com/todos/toggleCompleted", todo)
        .then((res) => console.log(res.data));

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
