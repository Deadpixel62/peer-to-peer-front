import axios from 'axios';
import React from 'react'
import {useState} from 'react'


function Signup() {
    const [user, setUser] = useState({
        email:""
    })

const handleSubmit = (e)=> {
    e.preventDefault();

    axios.post("http://localhost:4000/signup", user)
    .then((res) => console.log(res));

    setUser({email:""})
}

  return (
    <div>
      <form onSubmit={handleSubmit}>
      Sign up :
        <input
          type="email"
          required
          placeholder="Enter your sign up email"
          value={user.email}
          onChange={(e) => setUser({email: e.target.value })}
        />
      
        <input type="submit" value="Sign up" />
      </form>
    </div>
  );
}

export default Signup