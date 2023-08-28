import React, { useState, useEffect } from 'react';
import { signOut, auth } from '../../firebase'
import { toast } from 'react-toastify';

import { Link } from 'react-router-dom';

import NavMenu from '../ui/navigationmenu';
import HeatMap from '../ui/heatmap';
import WorkoutTable from '../ui/workouttable';

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
      <div className="flex flex-col h-screen w-screen bg-zinc-950">
        <NavMenu />
        <div className="ml-20 mr-20">
          <HeatMap user={user} />
        </div>
        <div className='mt-20 ml-20 mr-20'>
          <WorkoutTable user={user} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;