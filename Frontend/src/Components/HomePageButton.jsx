import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const HomePageButton = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/home');
    }

  return (
    <button 
        onClick={handleClick} 
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Home Page
        </button>
  )
}

export default HomePageButton;