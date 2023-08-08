import { Routes, Route } from 'react-router-dom';
import LoginForm from '../src/Layouts/LoginForm';
import RegisterForm from '../src/Layouts/RegisterForm';
import {APP_ROUTES} from '../src/Utils/constants';
import UserDetails from '../src/Layouts/UserDetails';
import { getTokenFromLocalStorage } from './lib/common';
import HomePage from './Layouts/HomePage';

const App = () => {

    // Get the token from local storage
  const token = getTokenFromLocalStorage();

  if (!token) {
    // Render login and register pages when there is no token
    return (
      <Routes>
        <Route path={APP_ROUTES.SIGN_IN} element={<LoginForm />} />
        <Route path={APP_ROUTES.REGISTER} element={<RegisterForm />} />
      </Routes>
    );
  }

  // Render the rest of the pages when token is available
  return (
    <Routes>
      <Route path="/userDetails/:userId" element={<UserDetails />} />
      <Route path="/home" element={<HomePage />} />
    </Routes>
  );
};


export default App;