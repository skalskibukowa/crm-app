import React from 'react';
import axios from 'axios';
import { API_ROUTES } from '../Utils/constants';
import {useState } from 'react';


const deleteUser = async (userId) => {
  try {
    await axios.delete(API_ROUTES.GET_USER(userId));
  } catch (error) {
    console.error('Error deleting user:', error);
  }
};


const DeleteButton = ({userId}) => {

  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    await deleteUser(userId);
    setDeleting(false)
  };

  return (
    <button 
      onClick={handleDelete} 
      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      disabled={deleting}
      > {deleting ? 'Deleting...' : 'Delete'}
      </button>
  );
};

export default DeleteButton;