import { Routes, Route } from 'react-router-dom';
import LoginForm from './LoginForm/Pages/LoginForm';
import RegisterForm from './registerForm/Pages/RegisterForm';
import {APP_ROUTES} from '../src/utils/constants';
import UserDetails from './LoginForm/Pages/UserDetails';
import { getTokenFromLocalStorage } from './lib/common';
import PageNotFound from './PageNotFound/PageNotFound';

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
    </Routes>
  );
};


export default App;