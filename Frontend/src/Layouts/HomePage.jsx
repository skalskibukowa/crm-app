import React from 'react'
import SidebarNav from '../Components/SidebarNav'
import BarChart from '../Components/BarChart';
import LineChart from '../Components/LineChart';

const HomePage = () => {

  return (


     <div className="flex h-screen">
        <SidebarNav />
        <div className="flex grow p-4 bg-neutral-50">
            <div className="w-2/5 h-3/5 p-4"> 
               <div className="bg-white rounded-lg border border-zinc-200">
                  <BarChart />
               </div>
               </div>
            <div className="w-2/5 h-3/5 p-4"> 
               <div className="bg-white rounded-lg border border-zinc-200">
                  <LineChart /> 
               </div>
            </div>
      </div>
     </div>
  )
}

export default HomePage;