import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, createUserWithEmailAndPassword, db, doc } from '../../firebase';
import { updateProfile } from 'firebase/auth';
import { setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button';

const Register = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const isFormValid = () => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
  
    if (!password.match(passwordRegex)) {
      toast("Password must be between 6 to 20 characters, and include at least one numeric digit, one uppercase, and one lowercase letter.", {
        position: "bottom-right",
        type: "error",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "dark",
      });
      return false;
    }

    if (password !== confirmPassword) {
      toast("Passwords do not match.", {
        position: "bottom-right",
        type: "error",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "dark",
      });
      return false;
    }

    return true;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormValid()) {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        const uid = user.uid;
        
        await updateProfile(user, {
          displayName: username,
        });
        
        const docRef = doc(db, "users", uid);
        await setDoc(docRef, {
          displayName: username,
          username: username,
          uid: uid,
          email: email,
          isAdmin: false,
          subscription: false,
          subscriptionEnd: null,
          subscriptionStart: null,
          subscriptionStatus: "Free",
          createdAt: new Date(),
        });

        toast(`Registration Successful. ${username}`, {
            position: "bottom-right",
            type: "success",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            theme: "dark",
        });
        navigate('/');
      } catch (error) {
        alert(error.message);
        console.log(error.message);
        console.log(error.code);
      }
    }
  }
  
  return (
    <div className="flex h-screen">
      <div className="w-1/2 bg-zinc-900 p-8 flex flex-col h-full border-white border-opacity-25 relative">
        <img
          src="https://cdn.pixabay.com/photo/2021/02/03/14/58/geometric-5978243_960_720.jpg"
          className="absolute inset-0 w-full h-full object-cover opacity-20 border" /* Adjusted class */
          alt="Background"
        />
        <h1 className="text-2xl font-bold text-white drop-shadow-md">OPTIFIT</h1>
        {/* <h1 className="text-7xl font-extrabold text-white">OPTIFIT</h1>
        <p className="text-gray-500 text-center text-xl">The only fitness tracker you'll ever need</p> */}
      </div>
      <div className="w-1/2 bg-zinc-950 p-8 flex flex-col justify-center items-center h-full">
        <h1 className="text-4xl text-white font-extrabold">Create an account</h1>
        <div className='m4 w-1/2 p-4 rounded-md shadow-md'>
          <p className="text-gray-500 text-center text-l">Enter your email and password to login</p>
          <form onSubmit={handleSubmit}>
            <Input
                id="email"
                placeholder="name@example.com"
                type="email"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                value={email}
                className='w-full p-2 rounded-md shadow-md m-2'
                onChange={(event) => setEmail(event.target.value)}
                required
            />
            <Input
              id="username"
              placeholder="username"
              type="text"
              autoCapitalize="none"
              autoComplete="username"
              autoCorrect="off"
              value={username}
              className='w-full p-2 rounded-md shadow-md m-2'
              onChange={(event) => setUsername(event.target.value)}
              required
            />
            <Input
              id="password"
              placeholder="password"
              type="password"
              autoCapitalize="none"
              autoComplete="current-password"
              autoCorrect="off"
              value={password}
              className='w-full p-2 rounded-md shadow-md m-2'
              onChange={(event) => setPassword(event.target.value)}
              required
            />
            <Input
              id="confirmPassword"
              placeholder="confirm password"
              type="password"
              autoCapitalize="none"
              autoComplete="current-password"
              autoCorrect="off"
              value={confirmPassword}
              className='w-full p-2 rounded-md shadow-md m-2'
              onChange={(event) => setConfirmPassword(event.target.value)}
              required
            />
            <Button className='w-full p-2  shadow-md m-2'>Register</Button>
            <Button variant="secondary" className='w-full p-2  shadow-md m-2 -mt-1' onClick={()=>{navigate('/')}}>Go Back</Button>
          </form>
          </div>
      </div>
    </div>
  )  
}

export default Register;