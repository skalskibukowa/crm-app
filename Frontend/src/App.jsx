import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import LoginForm from './LoginForm/Pages/LoginForm';
import LoginTest from './LoginForm/Pages/LoginTest';
import RegisterForm from './registerForm/Pages/RegisterForm';
import Dashboard from './Project/Pages/Dashboard';
import Navbar from './Project/Pages/Navbar';
import LoginFormTest from './LoginForm/Pages/LoginFormTest';
import Test from './LoginForm/Pages/Test';
import DashboardsTest from './Project/Pages/DashboardsTest';
import {APP_ROUTES} from '../src/utils/constants';
import UserDetails from './LoginForm/Pages/UserDetails';
import { getTokenFromLocalStorage } from './lib/common';
import { useEffect } from 'react';
import PageNotFound from './PageNotFound/PageNotFound';

const App = () => {

    // Get the token from local storage
  const token = getTokenFromLocalStorage();



  if (!token) {
    // Render login and register pages when there is no token
    return (
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    );
  }

  // Render the rest of the pages when token is available
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/navbar" element={<Navbar />} />
      <Route path={APP_ROUTES.DASHBOARD} element={<DashboardsTest />} />
      <Route path="/userDetails/:userId" element={<UserDetails />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};


export default App;