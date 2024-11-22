import React from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/firebase'; // Adjust the path to your Firebase configuration file

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth); // Sign out the user
      navigate('/login'); // Redirect to login page
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div>
      <h1>Home</h1>
      <button onClick={handleLogout}>Log Out</button>
    </div>
  );
};

export default Home;
