'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

const AuthPage = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const { login } = useAuth();

  const handleLogin = () => {
    // Mock user login
    login({ name: 'Medical Student', email: 'student@synapse.com', role: 'student' });
  };

  const handleSignup = () => {
    // Mock user signup and login
    login({ name: 'New Student', email: 'new@synapse.com', role: 'student' });
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md" style={{ perspective: '1000px' }}>
        <div
          className={`relative w-full h-full transition-transform duration-700`}
          style={{ transformStyle: 'preserve-3d', transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
        >
          {/* Login Form */}
          <div className="absolute w-full h-full" style={{ backfaceVisibility: 'hidden' }}>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold text-center text-primary mb-6">Login</h2>
              <form>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="login-email">
                    Email
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="login-email"
                    type="email"
                    placeholder="you@example.com"
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="login-password">
                    Password
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="login-password"
                    type="password"
                    placeholder="******************"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <button
                    className="bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                    onClick={handleLogin}
                  >
                    Sign In
                  </button>
                  <a className="inline-block align-baseline font-bold text-sm text-secondary hover:text-blue-800" href="#">
                    Forgot Password?
                  </a>
                </div>
                <p className="text-center text-gray-500 text-xs mt-6">
                  Don't have an account?{' '}
                  <button type="button" onClick={handleFlip} className="font-bold text-secondary hover:underline">
                    Sign Up
                  </button>
                </p>
              </form>
            </div>
          </div>

          {/* Signup Form */}
          <div className="absolute w-full h-full" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold text-center text-primary mb-6">Sign Up</h2>
              <form>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="signup-name">
                    Full Name
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                    id="signup-name" type="text" placeholder="John Doe"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="signup-email">
                    Email
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                    id="signup-email" type="email" placeholder="you@example.com"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="signup-password">
                    Password
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                    id="signup-password" type="password" placeholder="******************"
                  />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="field">
                        Primary Field
                    </label>
                    <select id="field" className="shadow border rounded w-full py-2 px-3 text-gray-700">
                        <option>Medical Student</option>
                        <option>Nursing Student</option>
                        <option>Pharmacy Student</option>
                    </select>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="signup-institution">
                    University / Institution
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                    id="signup-institution" type="text" placeholder="University of Medicine"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="signup-grad-year">
                    Expected Graduation Year
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                    id="signup-grad-year" type="number" placeholder="2027"
                  />
                </div>
                <button
                  className="bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded w-full"
                  type="button"
                  onClick={handleSignup}
                >
                  Create Account
                </button>
                <p className="text-center text-gray-500 text-xs mt-6">
                  Already have an account?{' '}
                  <button type="button" onClick={handleFlip} className="font-bold text-secondary hover:underline">
                    Login
                  </button>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
