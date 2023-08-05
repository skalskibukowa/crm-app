import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../lib/customHooks';
import { API_ROUTES, APP_ROUTES } from '../../utils/constants';
import { storeTokenInLocalStorage } from '../../lib/common';

const LoginFormTest = () => {

  const navigate = useNavigate();
  const  { authenticated, setUser } = useUser(); // Destructure setUser and setAuthenticated from the custom hook

  if (authenticated) {
    navigate(APP_ROUTES.DASHBOARD)
  }

  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
 
  const handleEmailAddress = (e) => {
    setEmailAddress(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const userData = {
      email: emailAddress,
      password: password,
    };

    try {
      const response = await axios.post(API_ROUTES.SIGN_IN, userData);
      const { token, userId } = response.data;
      console.log('Login successful!', response.data);
      window.alert('You are logged in');
      storeTokenInLocalStorage(token);

      setUser(userId);

      navigate(`/userDetails/${userId}`);
    } catch (error) {
      window.alert('Try again');
      console.log('Login failed!', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
          <form className="w-full max-w-sm items py-80" onSubmit={handleLogin}>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" >
                  Email
                </label>
              </div>
              <div className="md:w-2/3">
                <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
                id="inline-full-name" 
                type="email" 
                placeholder='email'
                value={emailAddress}
                onChange={handleEmailAddress} />
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                  Password
                </label>
              </div>
              <div className="md:w-2/3">
                <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
                id="inline-password" 
                type="password" 
                placeholder="******************"
                value={password}
                onChange={handlePassword} />
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3"></div>
              <label className="md:w-2/3 block text-gray-500 font-bold">
                <input className="mr-2 leading-tight" 
                type="checkbox" />
                <span className="text-sm">
                  Remember me!
                </span>
              </label>
            </div>
            <div className="md:flex md:items-center">
              <div className="md:w-1/3"></div>
              <div className="md:w-2/3">
                <button className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" 
                type="submit">
                  Sign Up
                </button>
              </div>
            </div>
      </form>
    </div>
</div>
  
  )
}

export default LoginFormTest;