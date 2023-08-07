import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { getTokenFromLocalStorage } from '../../lib/common';
import { API_ROUTES, APP_ROUTES } from '../../utils/constants';
import { PaperClipIcon } from '@heroicons/react/20/solid';
import DeleteButton from '../Components/deleteButton';
import HomePageButton from '../Components/HomePageButton';
import EditUserButton from '../Components/EditUserButton';
import LogoutButton from '../Components/LogoutButton';

const UserDetails = () => {
  const [user, setUser] = useState({});
  const [error, setError] = useState(null);

  // Add state variables for editable fields
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [surname, setSurname] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [image, setImage] = useState('');
  const [about, setAbout] = useState('');

  // State variable to track if the edit modal is open or closed
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const { userId } = useParams();

  const token = getTokenFromLocalStorage();

  const navigate = useNavigate();

   // Implement a function to save the edited user data
   const saveUserDetails = async () => {
    try {
      const response = await axios.put(
        API_ROUTES.UPDATE_USER(userId),
        {
          email,
          firstName,
          surname,
          jobTitle,
          image,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setUser(response.data.user);
        setError(null); // Clear any previous error state if the API call succeeds
      } else {
        setError('Failed to update user'); // Set the error state in case the API call fails
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Error updating user details'); // Set the error state in case of any error during the API call
    }
  };

  // Function to open the edit modal
  const openEditModal = () => {
    // Copy the user details to the state variables for editing
    setEmail(user.email);
    setFirstName(user.firstName);
    setSurname(user.surname);
    setJobTitle(user.jobTitle);
    setImage(user.image);

    setIsEditModalOpen(true);
  };

  // Function to close the edit modal
  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const getUserDetails = async () => {
    try {
      const response = await axios.get(API_ROUTES.GET_USER(userId), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setUser(response.data.user);
        setError(null); // Clear any previous error state if the API call succeeds
      } else {
        setError('User not found or API error'); // Set the error state in case the API call fails
        setUser({});
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Error fetching user details'); // Set the error state in case of any error during the API call
      setUser({});
    }
  };


  useEffect(() => {
    if(!token) {
      navigate(APP_ROUTES.SIGN_IN);
    } else {
      getUserDetails()
    }
  }, [token]);



  return (
    <div className='flex justify-center'>
      <div className="max-w-screen-xl m-4 sm:m-10 bg-white shadow sm:rounded-lg border-gray-900">
              <div className="px-4 sm:px-0 border-gray-900">
                <h3 className="text-base font-semibold leading-7 text-gray-900">Employee information</h3>
                <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Personal Details</p>
              </div>
              <div className="mt-4 border-t border-spacing-3 border-gray-900">
                <dl className="divide-y border-gray-900">
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">Photo</dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{user.image}</dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">Full name</dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{user.firstName} {user.surname}</dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">Job title</dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{user.jobTitle}</dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">Email address</dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{user.email}</dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">Salary expectation</dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">$120,000 - TBD</dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">About</dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa consequat. Excepteur
                      qui ipsum aliquip consequat sint. Sit id mollit nulla mollit nostrud in ea officia proident. Irure nostrud
                      pariatur mollit ad adipisicing reprehenderit deserunt qui eu.
                    </dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">Attachments</dt>
                    <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      <ul role="list" className="divide-y divide-gray-900 rounded-md border border-gray-900 mx-20">
                        <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                          <div className="flex w-0 flex-1 items-center">
                            <PaperClipIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                            <div className="ml-4 flex min-w-0 flex-1 gap-2">
                              <span className="truncate font-medium">resume_back_end_developer.pdf</span>
                              <span className="flex-shrink-0 text-gray-400">2.4mb</span>
                            </div>
                          </div>
                          <div className="ml-4 flex-shrink-0">
                            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                              Download
                            </a>
                          </div>
                        </li>
                        <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                          <div className="flex w-0 flex-1 items-center">
                            <PaperClipIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                            <div className="ml-4 flex min-w-0 flex-1 gap-2">
                              <span className="truncate font-medium">coverletter_back_end_developer.pdf</span>
                              <span className="flex-shrink-0 text-gray-400">4.5mb</span>
                            </div>
                          </div>
                          <div className="ml-4 flex-shrink-0">
                            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                              Download
                            </a>
                          </div>
                        </li>
                      </ul>
                    </dd>
                  </div>
                </dl>
              </div>
            <div className='flex justify-center gap-4'>
              <EditUserButton onClick={openEditModal} />
              <DeleteButton />
              <HomePageButton /> 
              <LogoutButton />
            </div>
            </div>
            {isEditModalOpen && (
        <div className="fixed inset-0 z-10 overflow-y-auto bg-opacity-50 bg-gray-900 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8">
            <h3 className="text-base font-semibold leading-7 text-gray-900">Edit User Details</h3>
            <div className="mt-4">
              {/* Input fields for editing */}
              <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Photo:</label>
                <input
                  type="text"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 w-full"
                />
                <label className="block text-gray-700 text-sm font-bold mb-2">First Name:</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 w-full"
                />
                <label className="block text-gray-700 text-sm font-bold mb-2">Surname:</label>
                <input
                  type="text"
                  value={surname}
                  onChange={(e) => setSurname(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 w-full"
                />
                <label className="block text-gray-700 text-sm font-bold mb-2">Email address:</label>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 w-full"
                />
                <label className="block text-gray-700 text-sm font-bold mb-2">Job Title:</label>
                <input
                  type="text"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 w-full"
                />
              </div>
              {/* ... (other input fields) */}
            </div>
            <div className="flex justify-end">
              <button
                onClick={closeEditModal}
                className="mr-2 px-4 py-2 text-sm font-medium text-gray-900 bg-gray-200 rounded-md"
              >
                Cancel
              </button>
              {/* Add a save button within the modal */}
              <button
                onClick={() => {
                  saveUserDetails(); // Implement saveUserDetails function to update the user details
                  closeEditModal();
                }}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
  );
};

export default UserDetails;
