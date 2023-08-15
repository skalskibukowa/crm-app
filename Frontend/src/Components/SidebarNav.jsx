import React, {useState} from 'react';
import SidebarItem from './SidebarItem';
import LogoutButton from './LogoutButton';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { API_ROUTES } from '../Utils/constants';
import { getTokenFromLocalStorage } from '../lib/common';
import jwtDecode from 'jwt-decode';


const SidebarNav = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
    };

    const token = getTokenFromLocalStorage();

    const decodedToken = jwtDecode(token);
    const userId = decodedToken.userId;

    const getUserDetails = async () => {
      try {
        const response = await axios.get(API_ROUTES.GET_USER(userId), {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (response.status === 200) {
          setUser(response.data.user);
          setError(null); // Clear any previous error state if the API call succeeds
        } else {
          setError('User not found or API error'); // Set the error state in case the API call fails
          setUser({});
        }
      } catch (error) {
        console.error('Error:', error);
        setError('Error fetching user details'); // Set the error state in case of any error during the API call
        setUser({});
      }
    };

    console.log("userId:", userId);

  return (

    <aside>
      {isSidebarOpen && (
      <div className="h-full w-[20rem] bg-neutral-50" >
        
        <div className="p-4">
        <button onClick={toggleSidebar}>Toogle Bar</button>
          <h1 className="text-2xl font-semibold">Sidebar</h1>
        </div>
        
        <nav className="p-4">
          <ul>
           

            <li className="mb-2">
              <a
                href="/home"
                className="flex items-center justify-between p-2 hover:bg-gray-200 rounded-md w-full"
              >
                Home Page
              </a>
            </li>
            <li className="mb-2">
              <a
                href="/AboutMe"
                className="flex items-center justify-between p-2 hover:bg-gray-200 rounded-md w-full"
              >
                About me
              </a>
            </li>
            <li className="mb-2">
              <a
                href="#"
                className="flex items-center justify-between p-2 hover:bg-gray-200 rounded-md w-full"
              >
                My Projects
              </a>
            </li>

            <SidebarItem title="Certifications">
            <li className="mb-1">
                <a href="#" className="block p-2 hover:bg-gray-200 rounded-md">
                  Azure
                </a>
              </li>
              <li className="mb-1">
                <a href="#" className="block p-2 hover:bg-gray-200 rounded-md">
                  AWS
                </a>
              </li>
              <li className="mb-1">
                <a href="#" className="block p-2 hover:bg-gray-200 rounded-md">
                  Other
                </a>
              </li>
            </SidebarItem>

            <SidebarItem title="Apps">
            <li className="mb-1">
                <a href="#" className="block p-2 hover:bg-gray-200 rounded-md">
                  Holiday APPs
                </a>
              </li>
              <li className="mb-1">
                <a href="#" className="block p-2 hover:bg-gray-200 rounded-md">
                  Desk reservation
                </a>
              </li>
              <li className="mb-1">
                <a href="#" className="block p-2 hover:bg-gray-200 rounded-md">
                  Customers
                </a>
              </li>
            </SidebarItem>


            <SidebarItem title="Projects">
              <li className="mb-1">
                
                <Link to={`/userDetails/${userId}`} onClick={getUserDetails} className="block p-2 hover:bg-gray-200 rounded-md">
                  Team A
                </Link>
              </li>
              <li className="mb-1">
                <a href="#" className="block p-2 hover:bg-gray-200 rounded-md">
                  Team B
                </a>
              </li>
            </SidebarItem>
          </ul>
        </nav>
        <div className="flex flex-end m-3">
          <LogoutButton />
        </div>
        
      </div>
      )}


      {!isSidebarOpen && (
        <>
          <div className="absolute top-4 left-4">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded border-spacing-1" onClick={toggleSidebar}>
                Open SideBar
              </button>
            </div>
            <div className="absolute bottom-4 left-4">
                <LogoutButton />
            </div>
          </>
      )}
      
      </aside>
  );
}

export default SidebarNav