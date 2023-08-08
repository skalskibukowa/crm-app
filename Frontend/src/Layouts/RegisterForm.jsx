import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { APP_ROUTES, API_ROUTES } from '../Utils/constants';

const RegisterForm = () => {

    const [formData, setFormData] = useState({
        firstName: '',
        surname: '',
        email: '',
        jobTitle: 'Software Engineer',
        password: '',
        confirmPassword: ''
    });
    
    const [isChecked, setIsChecked] = useState(false);
    const [isCheckboxError, setIsCheckboxError] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {

        const {name, value} = e.target;
        setFormData((prevFormData) => ({...prevFormData, [name]: value}))
    };

    const handleCheckboxChange = (e) => {
        setIsChecked(e.target.checked);
        setIsCheckboxError(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate password and confirmPassword match
        if (formData.password !== formData.confirmPassword) {
            window.alert('Password do not match!');
            return;
        }

        if (!isChecked) {
            setIsCheckboxError(true);
            return;
        }

        try {
            const response = await axios.post(API_ROUTES.REGISTER, formData);
            console.log('Registration successful!', response.data);

            window.alert('Registration successful! Please log in.');

            //Redirect to login page
            navigate(APP_ROUTES.SIGN_IN);
        } catch (error) {
            console.log('Registration failed!', error);
            window.alert('Registration failed. Please try again.');
        }
    };



  return (
        <div className="bg-gray-50 dark:bg-gray-900">
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <path fill="#F1C21B" d="M43.6,-67.1C51.8,-62.5,50.6,-42.6,51.4,-27.4C52.2,-12.3,54.9,-2,56.7,10.4C58.5,22.9,59.3,37.5,51.7,43.1C44.2,48.7,28.2,45.3,15.1,47.4C1.9,49.5,-8.5,57.1,-18,56.5C-27.5,55.9,-35.9,47.2,-47.2,38.5C-58.5,29.8,-72.7,21.1,-75.5,10.1C-78.4,-1,-69.9,-14.5,-61.5,-26.1C-53.2,-37.7,-45,-47.5,-34.7,-51.1C-24.5,-54.8,-12.2,-52.5,2.7,-56.7C17.7,-61,35.4,-71.7,43.6,-67.1Z" transform="translate(100 100)" />
        </svg>
            CRM System    
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Create an account
                </h1>
                <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>


                    <div>
                        <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name</label>
                        <input 
                            type="firstName" 
                            name="firstName" 
                            id="firstName" 
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                            placeholder="John" 
                            required=""
                            value={formData.firstName}
                            onChange={handleChange} />
                    </div>

                    <div>
                        <label htmlFor="surname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Surname</label>
                        <input 
                            type="surname" 
                            name="surname" 
                            id="surname" 
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                            placeholder="Smith" 
                            required=""
                            value={formData.surname}
                            onChange={handleChange} />
                    </div>


                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                        <input 
                            type="email" 
                            name="email" 
                            id="email" 
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                            placeholder="name@company.com" 
                            required="" 
                            value={formData.email}
                            onChange={handleChange} />
                    </div>

                    <label class="block">
                        <span className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Job Title</span>
                        <select 
                            className="block w-full mt-1"
                            name="jobTitle"
                            value={formData.jobTitle}
                            onChange={handleChange}
                        >
                            <option value='Software Engineer'>Software Engineer</option>
                            <option value='Manager'>Manager</option>
                            <option value='Sales Person'>Sales Person</option>
                            <option value='Data Analyst'>Data Analyst</option>
                            <option value='Marketing Specialist'>Marketing Specialist</option>
                            <option value='intern'>intern</option>
                        </select>
                    </label>


                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                        <input 
                            type="password" 
                            name="password" 
                            id="password" 
                            placeholder="••••••••" 
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                            required=""
                            value={formData.password}
                            onChange={handleChange} />
                    </div>

                    <div>
                        <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                        <input 
                            type="password" 
                            name="confirmPassword" 
                            id="confirmPassword" 
                            placeholder="••••••••" 
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                            required=""
                            value={formData.confirmPassword}
                            onChange={handleChange} />
                    </div>

                    <div className="flex items-start">
                        <div className="flex items-center h-5">
                            <input 
                                id="terms" 
                                aria-describedby="terms" 
                                type="checkbox" 
                                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" 
                                required=""
                                onChange={handleCheckboxChange}
                                checked={isChecked} />
                        </div>


                        <div className="ml-3 text-sm">
                            <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">
                                I accept the 
                                <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">
                                    Terms and Conditions
                                    </a>
                                    </label>
                        </div>
                    </div>

                    {isCheckboxError && (
                        <p className="text-sm font-medium text-red-500">Please accept the Terms and Conditions.</p>
                    )}

                    <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create an account</button>
                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                        Already have an account? <a href="/Login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</a>
                    </p>
                </form>
            </div>
        </div>
    </div>
    </div>
  );
};

export default RegisterForm;