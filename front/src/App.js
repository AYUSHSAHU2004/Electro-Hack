import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; // Use Navigate for redirection
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/firebase';
import axios from 'axios';
import Login from './Pages/Login/Login';
import SignUp from './Pages/SignUp/SignUp';
import Home from './Pages/Home/Home';

const App = () => {
  const [user, setUser] = useState(null);
  const [isEmailValid, setIsEmailValid] = useState(false);


  useEffect(() => {
    // Listen for changes in the authentication state
    const unsubscribe = onAuthStateChanged(auth, async(user) => {
      if (user) {
        setUser(user); // If the user is logged in, set the user state
        try {
          const response = await axios.get(
            `http://localhost:5000/users/checkPublic/${user.email}`
          );
          if (response.status === 200) {
            setIsEmailValid(true); // Email exists in the database
          } else {
            setIsEmailValid(false);
          }
          if(!isEmailValid){
            const response = await axios.get(
              `http://localhost:5000/users/checkAuth/${user.email}`
            );
            if (response.status === 200) {
              setIsEmailValid(true); // Email exists in the database
            } else {
              setIsEmailValid(false);
            }
          }
        } catch (error) {
          console.error('Error validating email:', error);
          setIsEmailValid(false); // Email not valid
        } 
      } else {
        setUser(null); // If not, set user state to null
      }
    });
    

    // Cleanup the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <Router>
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
      </Routes>
    </Router>
  );
};

export default App;
