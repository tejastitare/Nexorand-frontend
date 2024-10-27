import React, { useState } from 'react';
import axios from 'axios';

const Registration = () => {
  
  const [formData, setFormData] = useState({ email: '', password: '' });
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:7000/api/user/v1/register', formData);
      alert('Registration Successful!');
    } catch (error) {
      console.error(error);
    }
  };
  
  return (
    <form className="max-w-md mx-auto p-4" onSubmit={handleSubmit}>
      <h2 className="text-xl font-bold mb-4">Register</h2>
      <input
        type="email"
        className="block w-full mb-2 p-2 border border-gray-300 rounded"
        placeholder="Email"
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      <input
        type="password"
        className="block w-full mb-2 p-2 border border-gray-300 rounded"
        placeholder="Password"
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      />
      <button className="bg-blue-500 text-white p-2 rounded" type="submit">
        Register
      </button>
    </form>
  );
};

export default Registration;
