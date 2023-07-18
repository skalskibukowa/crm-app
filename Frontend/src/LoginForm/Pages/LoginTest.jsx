import React from 'react';
import axios from 'axios';
import { Link, redirect, json } from "react-router-dom";

import { useState } from 'react';

const LoginTest = () => {

    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
  
    const handleEmailAddress = e => {
      setEmailAddress(e.target.value);
    }
  
    const handlePassword = e => {
      setPassword(e.target.value);
    }

    const  handleLogin = async e => {
        e.preventDefault();
  
        const data = JSON.stringify({
          email: setEmailAddress,
          password: setPassword 
        })

        const customConfing = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        // Make a POST request using Axios
         const response = await axios.post("http://localhost:8081/api/v1/login", data, customConfing)
    
          if(response.status === 422 || response.status === 401) {
            console.log(response.json())
            return response;
          }
      
          if(!response.ok) {
            throw json ({ message: 'Could not authenticate user.' }, { status: 500})
          }
  
          console.log(setEmailAddress);
          console.log(setPassword);
          console.log(response.data.data);
          return redirect('/userList');
      }
  
  return (
    <div className="w-full max-w-xs">
    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleLogin}>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
          Username
        </label>
        <input 
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" 
        type="text" 
        placeholder="Username"
        value={emailAddress}
        onChange={handleEmailAddress} />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
          Password
        </label>
        <input 
            className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
            id="password" 
            type="password" 
            placeholder="******************"
            value={password}
            onChange={handlePassword} />
        <p className="text-red-500 text-xs italic">Please choose a password.</p>
      </div>
      <div className="flex items-center justify-between">
        <button 
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
        type="submit">
          Sign In
        </button>
        <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
          Forgot Password?
        </a>
      </div>
    </form>
    <p className="text-center text-gray-500 text-xs">
      &copy;2020 Acme Corp. All rights reserved.
    </p>
  </div>
  )
};

export default LoginTest;