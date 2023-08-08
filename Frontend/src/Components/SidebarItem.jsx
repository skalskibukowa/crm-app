import React, {useState} from 'react'

const SidebarItem = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSubMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <li className="mb-2">
        <button
            className="flex items-center justify-between p-2 hover:bg-gray-700 rounded-md w-full text-left"
            onClick={toggleSubMenu}
        >
            {title} <span className="text-sm">{isOpen ? '▼' : '►'}</span>
        </button>
        {isOpen && <ul className="ml-4">{children}</ul>}
        </li>
    );
}

export default SidebarItem