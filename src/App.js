import "bootstrap/dist/css/bootstrap.css"
import { Route, Routes } from "react-router-dom";
import './App.css';

import Landing from './pages/Landing';
import Out from "./pages/Out";
import Login from "./pages/User/Login";
import SignUp from "./pages/User/SignUp";
import AdminLogin from "./pages/Admin/Login"
import AdminSignup from "./pages/Admin/SignUp"
import {Profile, Classes, Edit, Courses as StudentCourses} from "./pages/Dashboard/Students";
import {Dashboard, Student, Fees, Teachers, Courses} from "./pages/Dashboard/Admin";
import 'react-toastify/dist/ReactToastify.css';
import AuthContextProvider from "./contexts/AuthContext";
import "react-multi-carousel/lib/styles.css";
import { Categories, CourseDetail, CourseList, CourseProfile } from "./pages/Courses";


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
              <Route path="profile/edit" element={<Edit  />} />
              <Route path="courses" element={<StudentCourses />} />
            </Route>
            <Route path="categories" element={<Out />}>
              <Route path="" element={<Categories  />} />
              <Route path=":id" element={<CourseDetail />} />
              <Route path=":id/:path" element={<CourseList />} />
              <Route path=":id/:path/:profile" element={<CourseProfile />} />
            </Route>
            <Route path="admin">
              <Route path="" element={<Dashboard />} />
              <Route path="students" element={<Student />} />
              <Route path="fees" element={<Fees />} />
              <Route path="teachers" element={<Teachers />} />
              <Route path="courses" element={<Courses />} />
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
