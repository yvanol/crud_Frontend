import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex flex-col items-center justify-center text-white">
      <h1 className="text-5xl font-bold mb-6">Welcome to Product Manager</h1>
      <p className="text-xl mb-8">Manage your products with ease and efficiency.</p>
      <Link to="/login" className="btn btn-primary btn-lg">
        Get Started
      </Link>
    </div>
  );
};

export default Home;