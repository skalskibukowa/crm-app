import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginForm from './LoginForm/Pages/LoginForm';
import LoginTest from './LoginForm/Pages/LoginTest';
import RegisterForm from './LoginForm/Pages/RegisterForm';
import Dashboard from './Project/Pages/Dashboard';
import Navbar from './Project/Pages/Navbar';


const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/form" element={<LoginTest />}/>
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/navbar" element={<Navbar /> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;