import React from 'react'
import { useNavigate } from 'react-router-dom'

const EditUserButton = () => {

    const navigate = useNavigate()

    const handleClick = () => {
        navigate('/editPage');
    }

  return (
    <button 
        onClick={handleClick}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Edit
    </button>
  )
}

export default EditUserButton