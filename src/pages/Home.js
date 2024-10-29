import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <div className="flex flex-col items-center p-10">
    <h1 className="text-4xl font-bold mb-4">Welcome to Clinikally Delivery App</h1>
    <Link to="/products" className="text-blue-500 hover:underline">
      View Products
    </Link>
  </div>
);

export default Home;
