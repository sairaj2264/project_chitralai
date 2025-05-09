import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const [orgCode, setOrgCode] = useState('');
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (orgCode.trim() === '') {
      alert('Please enter an Organization Code.'); // Simple validation
      return;
    }
    localStorage.setItem('orgCode', orgCode);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-6 text-gray-700">Welcome to Chitralai</h1>
        <p className="mb-4 text-gray-600">Please enter your Organization Code to proceed.</p>
        <input
          type="text"
          value={orgCode}
          onChange={(e) => setOrgCode(e.target.value)}
          placeholder="Enter Organization Code"
          className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleGetStarted}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition duration-150 ease-in-out"
        >
          Get Started
        </button>
      </div>
    </div>
  );
}

export default LandingPage;