import React from 'react';

const EditUserButton = (props) => {
  
  return (
    <button
      onClick={props.onClick}
      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
    >
      Edit
    </button>
  );
};

export default EditUserButton;