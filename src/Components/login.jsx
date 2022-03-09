import React from 'react'
import {useState} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

function Login() {
    const [email, setEmail] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
     if(email === "ola@dea.com"){
         <Link to="/todos"/>
     }       

        setEmail("");
    }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          required
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input type="submit" value="Log in" />
      </form>
    </div>
  );
}

export default Login