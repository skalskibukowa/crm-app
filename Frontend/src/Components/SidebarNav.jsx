import React, {useState} from 'react';
import SidebarItem from './SidebarItem';
import LogoutButton from './LogoutButton';


const SidebarNav = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
    };

  return (
    <div className="flex h-screen">
      {isSidebarOpen && (
      <div
        className="bg-gray-800 text-white sidebar w-96"
      >
        
        <div className="p-4">
        <button onClick={toggleSidebar}>Toogle Bar</button>
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
        <div className="absolute bottom-4 left-4">
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
      
      <div className="flex-1 p-4">
        {/* Main content goes here */}
      </div>
    </div>
  );
}

export default SidebarNav