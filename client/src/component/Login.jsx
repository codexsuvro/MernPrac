import React, { useState } from 'react';
import axios from "axios";
import "./LSstyle.css";
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {

    const navigate = useNavigate();
  const [value, setValue] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const login = await axios.post("http://localhost:5000/login", value);

      // Handle the login response as needed
      console.log(login.data);
      // You can set authentication state or redirect after successful login
      navigate("/home");
    } catch (error) {
      console.error("Error during login: ", error);
    }
  };

  return (
    <div className='container'>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input name='email' onChange={handleChange} value={value.email} placeholder='Email' />
        <input name='password' type='password' onChange={handleChange} value={value.password} placeholder='Password' />
        <button type='submit'>Login</button>
      </form>
      <p>Create account now! <Link to="/">Signup</Link></p>
    </div>
  );
};

export default Login;
