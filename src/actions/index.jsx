export const SetTodo = (todoList) => {
    return {
      type: 'SetTodo',
      payload: todoList
    }
  }

export const AddTodo = (userInput) => {
    return {
        type: "AddTodo",
        payload: userInput
    }
}

export const RemoveTodo = (todo) => {
    return {
        type: "RemoveTodo",
        payload: todo
    }
}

export const ToggleTodo = (todo) => {
    return {
        type:"ToggleTodo",
        payload: todo
    }
}