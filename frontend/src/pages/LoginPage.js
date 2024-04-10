// src/pages/LoginPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/authService'; // Assuming this is the path to your authService

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(''); // Reset error message

    try {
      console.log("I was here");
      const data = await login(email, password); // Call the login service
      
      // Store the token and role in localStorage or another appropriate place
      localStorage.setItem('token', data.token);
      if (data.role) {
        localStorage.setItem('role', data.role); // Store role if provided
      }

      // Redirect the user based on their role
      // Adjust the paths as necessary for your application
      if (data.role === 'admin') {
        navigate('/admin/home');
      } else if (data.role === 'technician') {
        navigate('/technician/home');
      } else {
        navigate('/dashboard'); // Or a general dashboard if role isn't matched
      }
    } catch (err) {
      // Handle login failure
      setError('Login failed. Please check your credentials and try again.');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
