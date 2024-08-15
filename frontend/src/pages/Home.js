// src/pages/Home.js
import React from 'react';
import Navbar from '../composants/Navbar';

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <h1>Welcome to Our Application</h1>
        <p>This is the home page. Use the navigation bar to register or log in.</p>
      </div>
    </div>
  );
};

export default Home;
