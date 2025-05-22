import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header
      className="text-white p-4 shadow-md"
      style={{
        background: 'linear-gradient(to right, #1E40AF, #2563EB, #3B82F6)', // blue gradient
      }}
    >
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Habit Tracker</h1>
        <nav>
          <Link to="/login" className="mr-6 hover:underline">
            Login
          </Link>
          <Link to="/register" className="hover:underline">
            Register
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
