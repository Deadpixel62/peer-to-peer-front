import axios from "axios"

const initialState = {
    todos: []
}

const Reducer = (state = initialState, action) => {
    switch(action.type) {

        case "SetTodo":
            console.log("*****************")
            console.log(action.payload)
            console.log("****************")
            return {
             ...state, todos : action.payload
            };


        case "incrementCounter":
            console.log(state.counter);
            return {...state, counter : state.counter +1};

        case "AddTodo":
            console.log(state.todos);
            console.log(action.payload);
            axios.post("http://localhost:4000/todo/addTodo", action.payload)
            .then(res => console.log(res.data));
            return {...state, todos: [...state.todos, action.payload]}; 

        case "RemoveTodo":
            console.log(action.payload);
            axios.post("http://localhost:4000/todo/removeTodo", action.payload)
            .then(res => console.log(res.data));
            return {...state, todos: state.todos.filter((el) => el.id != action.payload.id)};  
            
        case "ToggleTodo":
                console.log(action.payload);
          
            return {...state, todos: state.todos.map((todo) => {
                if (todo.id === action.payload.id) {
                  let completed = !todo.completed;
                  return { ...todo, completed };
                }
                return todo;
              }),
            };           

            
      

            
        default:
            return state    

    }
}

export default Reducer;