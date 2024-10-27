import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext) || {}; // Handle undefined context
  const [showUserDetails, setShowUserDetails] = useState(false);

  const toggleUserDetails = () => setShowUserDetails(!showUserDetails);

  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center text-white">
      <h1 className="text-lg font-bold">Nexorand Leaderboard</h1>
      {user ? (
        <div className="relative">
          <button onClick={toggleUserDetails} className="bg-gray-700 p-2 rounded-full">
            <span>{user.firstName[0]}</span>
          </button>
          {showUserDetails && (
            <div className="absolute right-0 mt-2 w-48 bg-white text-black p-4 rounded shadow-lg">
              <p><strong>Name:</strong> {user.firstName}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Points:</strong> {user.points}</p>
              <button 
                onClick={logout}
                className="mt-2 bg-red-500 text-white p-1 rounded w-full">
                Logout
              </button>
            </div>
          )}
        </div>
      ) : (
        <p>Please log in</p>
      )}
    </nav>
  );
};

export default Navbar;
