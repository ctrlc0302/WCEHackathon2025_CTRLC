import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase'; // Import Firebase auth

const LoginForm = () => {
  const [email, setEmail] = useState(''); // Use email instead of username
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert('Login successful');
      navigate('/Home');
    } catch (error) {
      setError(error.message);
    }
  };

  const handleForgotPassword = () => {
    console.log('Forgot password');
    // You can implement password reset logic here if needed
  };

  return (
    <div className="w-87 bg-white/90 rounded-lg p-12 shadow-lg">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 text-center mb-4">
          Login | Sign up
        </h2>
      </div>

      {/* Email Input */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full border border-gray-300 rounded-md p-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          required
        />
      </div>

      {/* Password Input */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          className="w-full border border-gray-300 rounded-md p-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          required
        />
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {/* Login Button */}
      <button
        onClick={handleLogin}
        className="w-full bg-blue-600 text-white font-bold text-lg py-3 rounded-md hover:bg-blue-700 transition"
      >
        LOGIN
      </button>

      {/* Forgot Password */}
      <button
        onClick={handleForgotPassword}
        className="text-blue-600 text-sm hover:underline w-full text-center mt-4"
      >
        Forgot Password?
      </button>
    </div>
  );
};

export default LoginForm;
