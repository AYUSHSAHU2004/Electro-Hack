import React, { useState } from 'react';
import axios from 'axios';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../../firebase/firebase';
import { motion } from 'framer-motion';

const SignUp = ({onLogin}) => {
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [location, setLocation] = useState('');
  const [department, setDepartment] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [PublicState, setPublicState] = useState({ email: '', phoneNumber: '' });
  const [AuthorityState, setAuthorityState] = useState({ email: '', phoneNumber: '', location: '', department: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
  
    // Retrieve the email from localStorage
  
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      localStorage.setItem("user",user.email);
      onLogin(user);
      if (role === 'Public') {
        // Send POST request to Public SignUp endpoint
        const response = await axios.post('http://localhost:5000/users/SignUpPublic', {
          email: user.email, // Include email from localStorage
          phoneNumber: PublicState.phoneNumber, // Include phone number from the form
        });
  
        if (response.status === 201) {
          setSuccess('Successfully registered as Public!');
          setPublicState({ phoneNumber: '' }); // Resetting fields after successful registration
        }
      } else if (role === 'Authority') {
        // Send POST request to Authority SignUp endpoint
        const response = await axios.post('http://localhost:5000/users/SignUpAuthority', {
          email: user.email, // Include email from localStorage
          phoneNumber: AuthorityState.phoneNumber, // Include phone number from the form
          location: AuthorityState.location, // Include location from the form
          department: AuthorityState.department, // Include department from the form
        });
  
        if (response.status === 201) {
          setSuccess('Successfully registered as Authority!');
          setAuthorityState({ phoneNumber: '', location: '', department: '' }); // Resetting fields after successful registration
        }
      }
    } catch (error) {
      console.error('Error during user registration:', error);
      setError('Registration failed. Please try again.');
    }
  };
  
  

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handlePublicInputChange = (e) => {
    const { name, value } = e.target;
    setPublicState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAuthorityInputChange = (e) => {
    const { name, value } = e.target;
    setAuthorityState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 50 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5 } },
  };

  const buttonVariants = {
    hover: { scale: 1.1, boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.3)' },
    tap: { scale: 0.95 },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <motion.h2
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1, transition: { duration: 0.3 } }}
      >
        Create Your Account
      </motion.h2>
      <form
        onSubmit={handleSubmit}
        style={{
          marginTop: '20px',
          width: '100%',
          maxWidth: '400px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Role Selection */}
        <select
          value={role}
          onChange={handleRoleChange}
          required
          style={{
            width: '100%',
            padding: '10px',
            marginBottom: '10px',
            fontSize: '16px',
            borderRadius: '5px',
            border: '1px solid #ccc',
          }}
        >
          <option value="">Select Role</option>
          <option value="Public">Public</option>
          <option value="Authority">Authority</option>
        </select>

        {/* Public Role Inputs */}
        {role === 'Public' && (
          <>
            <input
              type="text"
              name="phoneNumber"
              placeholder="Enter your phone number"
              value={PublicState.phoneNumber}
              onChange={handlePublicInputChange}
              required
              style={{
                width: '100%',
                padding: '10px',
                marginBottom: '10px',
                fontSize: '16px',
                borderRadius: '5px',
                border: '1px solid #ccc',
              }}
            />
          </>
        )}

        {/* Authority Role Inputs */}
        {role === 'Authority' && (
          <>
            <input
              type="text"
              name="phoneNumber"
              placeholder="Enter your phone number"
              value={AuthorityState.phoneNumber}
              onChange={handleAuthorityInputChange}
              required
              style={{
                width: '100%',
                padding: '10px',
                marginBottom: '10px',
                fontSize: '16px',
                borderRadius: '5px',
                border: '1px solid #ccc',
              }}
            />
            <input
              type="text"
              name="location"
              placeholder="Enter your location"
              value={AuthorityState.location}
              onChange={handleAuthorityInputChange}
              required
              style={{
                width: '100%',
                padding: '10px',
                marginBottom: '10px',
                fontSize: '16px',
                borderRadius: '5px',
                border: '1px solid #ccc',
              }}
            />
            <input
              type="text"
              name="department"
              placeholder="Enter your department"
              value={AuthorityState.department}
              onChange={handleAuthorityInputChange}
              required
              style={{
                width: '100%',
                padding: '10px',
                marginBottom: '10px',
                fontSize: '16px',
                borderRadius: '5px',
                border: '1px solid #ccc',
              }}
            />
          </>
        )}

        {error && (
          <div
            style={{
              color: 'red',
              marginBottom: '10px',
              fontSize: '14px',
              textAlign: 'center',
            }}
          >
            {error}
          </div>
        )}
        {success && (
          <div
            style={{
              color: 'green',
              marginBottom: '10px',
              fontSize: '14px',
              textAlign: 'center',
            }}
          >
            {success}
          </div>
        )}

        <motion.button
          type="submit"
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          style={{
            width: '100%',
            padding: '10px',
            fontSize: '16px',
            borderRadius: '5px',
            cursor: 'pointer',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
          }}
        >
          Sign Up
        </motion.button>
      </form>
    </motion.div>
  );
};

export default SignUp;
