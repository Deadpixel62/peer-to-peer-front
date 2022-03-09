import React from 'react'
import './App.css'
import {useSelector, useDispatch} from 'react-redux'
import TodoApp from './Components/todoApp';
import { Routes, Route } from "react-router-dom";
import Login from './Components/login';
import Signup from './Components/Signup';


function App() {
  const count = useSelector((state) => state.counter);


  return (
    <div className="App">
   

<Routes>
   <Route path='/signup' element={<Signup/>}/>
   <Route path='/login' element = {<Login/>}/>
   <Route path='/' element={<TodoApp/>}/>
</Routes>
    


    </div>
  )
}

export default App
