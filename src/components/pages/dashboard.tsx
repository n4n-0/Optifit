import React, { useState, useEffect } from 'react';
import { signOut, auth } from '../../firebase'
import { toast } from 'react-toastify';

import { Link } from 'react-router-dom';

const Dashboard = ({ user }) => {
  const logout = async () => {
    console.log()
    try {
      await signOut(auth);
      toast(`You have been logged out.`, {
        position: "bottom-right",
        type: "success",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "dark",
      })
    } catch (error) {
      console.error(error);
      toast("Error logging out.", {
        position: "bottom-right",
        type: "error",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "dark",
      })
    }
  }
  
  return (
    <div>
      <h1>Welcome, {user.email}!</h1>
      <p>You are logged in as {user.email}.</p>
      <p>
        <Link to="/register">Register</Link> |{' '}
        <Link to="/" onClick={logout}>Log out</Link>
      </p>
    </div>
  );
};

export default Dashboard;