import React from 'react';

const SignupPage = () => {
  return (
    <div className="p-6 max-w-md mx-auto mt-10 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
      <form>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Name</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-md focus:outline-none"
            placeholder="Enter your name"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Email</label>
          <input
            type="email"
            className="w-full px-4 py-2 border rounded-md focus:outline-none"
            placeholder="Enter your email"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Password</label>
          <input
            type="password"
            className="w-full px-4 py-2 border rounded-md focus:outline-none"
            placeholder="Enter your password"
          />
        </div>
        <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignupPage;
