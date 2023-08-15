import React from 'react'
import SidebarNav from '../Components/SidebarNav'
import UserDetails from './UserDetails';

const AboutMe = () => {
    return (
        <div className="flex h-screen">
           <SidebarNav />
           <div className="flex-1 p-4">
               <UserDetails />
           </div>
        </div>
     )
}

export default AboutMe