import React, {useState} from 'react';
import SidebarItem from './SidebarItem';


const SidebarNav = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen">
      <div
        className={`bg-gray-800 text-white sidebar w-96 ${isSidebarOpen ? '' : 'closed'}`}
      >
        <div className="p-4">
          <h1 className="text-2xl font-semibold">Sidebar</h1>
        </div>
        <nav className="p-4">
          <ul>
            <li className="mb-2">
              <a
                href="#"
                className="flex items-center justify-between p-2 bg-gray-700 rounded-md w-full"
              >
                Dashboard
              </a>
            </li>
            <SidebarItem title="Products">
              <li className="mb-1">
                <a href="#" className="block p-2 hover:bg-gray-700 rounded-md">
                  All Products
                </a>
              </li>
              <li className="mb-1">
                <a href="#" className="block p-2 hover:bg-gray-700 rounded-md">
                  Add New
                </a>
              </li>
            </SidebarItem>
            <SidebarItem title="Orders">
              <li className="mb-1">
                <a href="#" className="block p-2 hover:bg-gray-700 rounded-md">
                  Pending Orders
                </a>
              </li>
              <li className="mb-1">
                <a href="#" className="block p-2 hover:bg-gray-700 rounded-md">
                  Completed Orders
                </a>
              </li>
            </SidebarItem>
          </ul>
        </nav>
      </div>
      
      <div className="flex-1 p-4">
        {/* Main content goes here */}
      </div>
    </div>
  );
}

export default SidebarNav