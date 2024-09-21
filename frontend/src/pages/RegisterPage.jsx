import React, { useState } from 'react';
import axiosInstance from '../api/axios';  // Axios instance to make requests to the backend

const RegisterPage = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '', phone_number: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosInstance.post('register/', formData)  // Send POST request to /register/
      .then((response) => {
        setMessage('Registration successful. You can now login.');
      })
      .catch((error) => {
        setMessage('Registration failed.');
      });
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input name="username" type="text" placeholder="Username" onChange={handleChange} />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} />
        <input name="phone_number" type="text" placeholder="Phone Number" onChange={handleChange} />
        <button type="submit">Register</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default RegisterPage;
