import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, signInWithEmailAndPassword } from '../../firebase';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    try {
      signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
        const user = userCredential.user;

        toast(`Welcome back, ${user.displayName}.`, {
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

        navigate('/dashboard')
      }).catch((error) => {
        toast("Invalid Credentials.", {
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
      });
    } catch (error) {
      console.error(error.code);
      toast("Invalid Credentials.", {
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
        <h1 className="text-4xl text-white font-extrabold">Login in to your account</h1>
        <div className='m4 w-1/2 p-4 rounded-md shadow-md'>
          <p className="text-gray-500 text-center text-l">Enter your email and password to login</p>
          <form onSubmit={onSubmit}>
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
            />
            <Button className='w-full p-2 rounded-md shadow-md m-2'>Login</Button>
            <p className="text-gray-500 text-center text-l">Don't have an account? <Link to="/register" className='text-primary hover:scale-50'>Sign up</Link></p>
          </form>
          </div>
      </div>
    </div>
  )  
}

export default Login;