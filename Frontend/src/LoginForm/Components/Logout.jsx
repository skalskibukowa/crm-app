import React from "react"
import { removeTokenFromLocalStorage } from "../../lib/common"
import { useNavigate } from "react-router-dom"


const Logout = () => {
    
  const navigate = useNavigate()

  const handleLogout = () => {

    removeTokenFromLocalStorage();

    navigate('/login');
  }

    return (
      <button onClick={handleLogout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Sign Out</button>
    )
}

export default Logout