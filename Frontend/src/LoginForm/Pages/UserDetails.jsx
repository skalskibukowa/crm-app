import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { getTokenFromLocalStorage } from '../../lib/common';
import Logout from '../Components/Logout';
import { API_ROUTES, APP_ROUTES } from '../../utils/constants';

const UserDetails = () => {
  const [user, setUser] = useState({});
  const [error, setError] = useState(null);

  const { userId } = useParams();

  const token = getTokenFromLocalStorage();

  const navigate = useNavigate();

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
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {error ? (
        <p>{error}</p>
      ) : (
        <>
          <h2>User Detail</h2>

          {user && (
            <>
               <p>User name: {user.firstName}</p>
              <p>User type: {user.surname}</p>
              <p>User email: {user.email}</p>
              <p>User job title: {user.jobTitle}</p>
              <p>User image: {user.image}</p>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Link to={`/${userId}/edit`}>
            <button style={{ marginRight: 10 }}>Edit user</button>
          </Link>

          <Link to={"/"}>
            <button style={{ marginRight: 10 }}>Back to Homepage </button>
          </Link>

          <button style={{ marginRight: 10 }} onClick={() => deleteUser()}>
            Delete user
          </button>

          <Logout />
        </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default UserDetails;
