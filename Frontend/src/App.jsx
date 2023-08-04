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

const App = () => {

    // Get the token from local storage
  const token = getTokenFromLocalStorage();

  // Use the navigate hook to redirect to the login page if token is not available
  const navigate = useNavigate();


  useEffect(() => {
    if (!token) {
      navigate('/register');
    }
  }, [token]);

  return (
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/form" element={<LoginTest />}/>
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/loginTest" element={<LoginFormTest />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/navbar" element={<Navbar /> } />
        <Route path="/test" element={<Test />} />
        <Route path={APP_ROUTES.DASHBOARD} element={<DashboardsTest />} />
        <Route path="/userDetails/:userId" element={<UserDetails />} />
      </Routes>
  );
}

export default App;