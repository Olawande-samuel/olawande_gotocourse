import "bootstrap/dist/css/bootstrap.css"
import { Route, Routes } from "react-router-dom";
import './App.css';

import Landing from './pages/Landing';
import Out from "./pages/Out";
import Login from "./pages/User/Login";
import SignUp from "./pages/User/SignUp";
import AdminLogin from "./pages/Admin/Login"
import AdminSignup from "./pages/Admin/SignUp"
import {Profile, Classes} from "./pages/Dashboard/Students";
import {Dashboard} from "./pages/Dashboard/Admin";
import 'react-toastify/dist/ReactToastify.css';
import AuthContextProvider from "./contexts/AuthContext";



function App() {
  return (
    <AuthContextProvider>
      <Routes>
        <Route path="/" element={<Out />}>
          <Route index element={<Landing />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="students" element={<Out />}>
              <Route path="" element={<Profile  />} />
              <Route path="classes" element={<Classes  />} />
            </Route>
            <Route path="admin">
              <Route path="" element={<Dashboard />} />
            </Route>
            <Route path="admin" element={<Out />}>
              <Route path="login" element={<AdminLogin />} />
              <Route path="signup" element={<AdminSignup />} />
            </Route>
        </Route>
        <Route path="*" element={<h1 className="text-center">Page Not Found</h1>} />
      </Routes>
    </AuthContextProvider>
  );
}

export default App;
