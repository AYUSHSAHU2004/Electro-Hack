import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; // Use Navigate for redirection
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/firebase';
import axios from 'axios';
import Login from './Pages/Login/Login';
import SignUp from './Pages/SignUp/SignUp';
import Home from './Pages/Home/Home';
import Navbar from './components/Navbar';
import UserDashboard from './Pages/UserDashboard/UserDashboard';

const App = () => {
  const [user, setUser] = useState(null);
  const [isEmailValid, setIsEmailValid] = useState(false);


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user); // Set the user state
        try {
          // Check email in the "Public" database
          let response = await axios.get(
            `http://localhost:5000/users/checkPublic/${user.email}`
          );
          
          if (response.status === 200) {
            setIsEmailValid(true); // Email exists in Public database
            localStorage.setItem("Role","PUBLIC");
            return; // Exit early since the email is valid
          }
        } catch (error) {
          console.warn("Email not found in Public database. Checking Auth database...");
        }
  
        // If not found in Public, check email in the "Auth" database
        try {
          const response = await axios.get(
            `http://localhost:5000/users/checkAuth/${user.email}`
          );
          
          if (response.status === 200) {
            localStorage.setItem("Role","AUTHORITY");
            setIsEmailValid(true); // Email exists in Auth database
          } else {
            setIsEmailValid(false); // Email does not exist in either database
          }
        } catch (error) {
          console.error("Error validating email in Auth database:", error);
          setIsEmailValid(false); // Handle second API failure
        }
      } else {
        setUser(null); // Reset user state if not logged in
        setIsEmailValid(false); // Reset email validation state
      }
    });
  
    // Cleanup the listener when the component unmounts
    return () => unsubscribe();
  }, []);
  

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={user ? <Home /> : <Navigate to="/login" />} // Redirect to /login if no user
        />
        <Route
          path="/login"
          element={(user && isEmailValid )? <Navigate to="/" /> : <Login onLogin={setUser}/>} // Redirect to / if user is logged in
        />
        <Route
          path="/SignUp"
          element=<SignUp onLogin={setUser}/>
        />
        <Route
          path="/user/post/issue"
          element=<UserDashboard onLogin={setUser}/>
        />
      </Routes>
    </Router>
  );
};

export default App;
