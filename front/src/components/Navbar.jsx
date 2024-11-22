import React, { useState } from 'react';
import { Link } from 'react-router-dom';


const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const userRole = localStorage.getItem("Role");

  return (
    <nav className="bg-indigo-500 p-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <img src="civic safty long.png" alt="Logo" className="h-10 mr-4 invert-[1] brightness-0" />
        </div>
        <div className="hidden md:flex space-x-4">
          <Link to="/about" className="text-white hover:text-gray-300">About</Link>
         {
            userRole === 'PUBLIC' ? (
              <>
                <Link to="/profile" className="text-white hover:text-gray-300">Profile</Link>
                <Link to="/reports" className="text-white hover:text-gray-300">Reports</Link>
                <Link to="/login" className="text-white hover:text-gray-300">Log Out</Link>
              </>
            ) : userRole === 'AUTHORITY' ? (
              <>
                <Link to="/dashboard" className="text-white hover:text-gray-300">Dashboard</Link>
                <Link to="/manage-reports" className="text-white hover:text-gray-300">Manage Reports</Link>
                <Link to="/login" className="text-white hover:text-gray-300">Log Out</Link>
              </>
            ) : null
        } 
        </div>
        <button 
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>
      {isMenuOpen && (
        <div className="md:hidden">
          <Link to="/about" className="block text-white py-2">About</Link>
          {
            userRole === 'PUBLIC' ? (
              <>
                <Link to="/profile" className="block text-white py-2">Profile</Link>
                <Link to="/reports" className="block text-white py-2">Reports</Link>
              </>
            ) : userRole === 'AUTHORITY' ? (
              <>
                <Link to="/dashboard" className="block text-white py-2">Dashboard</Link>
                <Link to="/manage-reports" className="block text-white py-2">Manage Reports</Link>
              </>
            ) : null
        }
        </div>
      )}
    </nav>
  );
};

export default Navbar;
