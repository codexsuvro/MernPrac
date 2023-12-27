import React, { useState } from 'react';
import axios from "axios";
import "./LSstyle.css";
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {

  const navigate = useNavigate();

  const [value, setValue] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const register = await axios.post("http://localhost:5000/register", value);
    console.log(register.data);
    navigate("/login");
  };
  return (
    <div className='container'>
    <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
            <input name='name' onChange={handleChange} value={value.name} placeholder='Name' />
            <input name='email' onChange={handleChange} value={value.email} placeholder='Email' />
            <input name='password' onChange={handleChange} value={value.password} placeholder='Password' />
            <button type='submit'>Sign Up</button>
        </form>
        <p>Have an account? <Link to="/login">Login</Link></p>
    </div>
  );
};

export default Signup;