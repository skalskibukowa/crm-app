import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Link, redirect, json } from "react-router-dom";

import { useState } from 'react';

  const LoginForm = () => {

  const backgroundImageStyle = {
    backgroundImage: "url('https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg')" // "url('https://picsum.photos/1920/1080')",
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
    <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
            <div>
                <img src="https://storage.googleapis.com/devitary-image-host.appspot.com/15846435184459982716-LogoMakr_7POjrN.png"
                    className="w-32 mx-auto" />
            </div>
            <div className="mt-12 flex flex-col items-center">
                <h1 className="text-2xl xl:text-3xl font-extrabold">
                    Sign up
                </h1>
                <p className="mt-5"> Welcome to the CRM App </p>
                <div className="w-full flex-1 mt-8">

                    <div className="mx-auto max-w-xs">
                      <form >
                        <input
                            className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                            type="email"
                            placeholder="email"
                            name="email"    
                            //ref={register({ required: true, pattern: /^\S+@\S+$/i })} 
                           //  {errors.email && <p>This field is required and should be a valid email address.</p>}
                            />
                        
                        <input
                            className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                            type="password"
                            placeholder="Password"
                            name="password"
                           // ref={register({ required: true })} 
                          //   {errors.password && <p>This field is required.</p>}
                            />
                         
                        <Link to="/dashboard">
                            <button
                                className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                                type="submit">
                                <svg
                                    className="w-6 h-6 -ml-2"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2" // Update attribute name to strokeWidth
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    >
                                    <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                    <circle cx="8.5" cy="7" r="4" />
                                    <path d="M20 8v6M23 11h-6" />
                                    </svg>
                                <span className="ml-3">
                                    Sign Up
                                </span>
                            </button>
                        </Link>
                        
                        </form>

                        <Link to="/register">
                            <button
                                className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                                <svg 
                                className="w-6 h-6 -ml-2" 
                                fill="none" 
                                stroke="currentColor" 
                                strokeWidth="2"
                                strokeLinecap="round" 
                                strokeLinejoin="round"
                                >
                                    <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                    <circle cx="8.5" cy="7" r="4" />
                                    <path d="M20 8v6M23 11h-6" />
                                </svg>
                                <span className="ml-3">
                                    Register
                                </span>
                            </button> 
                        </Link>

                        <p className="mt-6 text-xs text-gray-600 text-center">
                            I agree to abide by templatana's
                            <a href="#" className="border-b border-gray-500 border-dotted">
                                Terms of Service
                            </a>
                            and its
                            <a href="#" className="border-b border-gray-500 border-dotted">
                                Privacy Policy
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
            <div className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
                style={backgroundImageStyle}>
            </div>
        </div>
    </div>
</div>
  );
};

export default LoginForm;