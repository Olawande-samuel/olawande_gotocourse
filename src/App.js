import "bootstrap/dist/css/bootstrap.css"
import { Route, Routes } from "react-router-dom";
import './App.css';

import Landing from './pages/Landing';
import Out from "./pages/Out";
import Login from "./pages/User/Login";
import SignUp from "./pages/User/SignUp";
import AdminLogin from "./pages/Admin/Login"
import AdminSignup from "./pages/Admin/SignUp"
import {Profile as StudentProfile, Classes as StudentClasses, Edit as StudentEdit, Courses as StudentCourses} from "./pages/Dashboard/Students";
import {Dashboard, Student, Fees, Teachers, Courses, Approve} from "./pages/Dashboard/Admin";
import {Profile as TeacherProfile, Classes as TeacherClasses, Edit as TeacherEdit, Courses as TeacherCourses, CreateCourse} from "./pages/Dashboard/Teachers";
import 'react-toastify/dist/ReactToastify.css';
import AuthContextProvider from "./contexts/AuthContext";
import "react-multi-carousel/lib/styles.css";
import { Categories, CourseDetail, CourseList, CourseProfile } from "./pages/Courses";
import {Home as BecomeATeacher, Profile} from "./pages/Teacher";




function App() {
  return (
    <AuthContextProvider>
      <Routes>
        <Route path="/" element={<Out />}>
          <Route index element={<Landing />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="students" element={<Out />}>
              <Route path="" element={<StudentProfile  />} />
              <Route path="classes" element={<StudentClasses  />} />
              <Route path="profile/edit" element={<StudentEdit  />} />
              <Route path="courses" element={<StudentCourses />} />
            </Route>
            <Route path="teacher" element={<Out/>}>
              <Route path="" element={<BecomeATeacher />} />
              <Route path="profile" element={<Profile />} />
            </Route>
            <Route path="teachers" element={<Out />}>
              <Route path="" element={<TeacherProfile  />} />
              <Route path="classes" element={<TeacherClasses  />} />
              <Route path="profile/edit" element={<TeacherEdit  />} />
              <Route path="courses" element={<TeacherCourses />} />
              <Route path="courses/create" element={<CreateCourse />} />
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
              <Route path="teachers/approve" element={<Approve />} />
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
