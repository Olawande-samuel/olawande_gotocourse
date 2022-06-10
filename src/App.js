import "bootstrap/dist/css/bootstrap.css"
import { Route, Routes } from "react-router-dom";
import './App.css';

import Landing from './pages/Landing';
import Out from "./pages/Out";
import Login from "./pages/User/Login";
import SignUp from "./pages/User/SignUp";
import AdminLogin from "./pages/Admin/Login"
import AdminSignup from "./pages/Admin/SignUp"
import {Profile as StudentProfile, Classes as StudentClasses, Edit as StudentEdit, Courses as StudentCourses, History as StudentHistory} from "./pages/Dashboard/Students";
import {Dashboard, Student, Fees, Teachers, Courses, Approve, Edit as AdminEdit, Category as AdminCategories, CreateCourseCategory} from "./pages/Dashboard/Admin";
import {Profile as TeacherDashboard, Classes as TeacherClasses, Edit as TeacherEdit, Courses as TeacherCourses, CreateCourse, Earnings} from "./pages/Dashboard/Teachers";
import 'react-toastify/dist/ReactToastify.css';
import AuthContextProvider from "./contexts/Auth";
import "react-multi-carousel/lib/styles.css";
import { Categories, CourseDetail, CourseList, CourseProfile } from "./pages/Courses";
import {Home as BecomeATeacher, Profile} from "./pages/Teacher";
import All, {Payment} from "./pages/Teacher/Teachers";
import TeacherProfile from "./pages/Teacher/TeacherProfile";
import TeacherSignup from "./pages/User/TeacherSignup";
import SyllabusContextProvider from "./contexts/Syllabus";



function App() {
  return (
    <AuthContextProvider>
      <SyllabusContextProvider>
      <Routes>
        <Route path="/" element={<Out />}>
          <Route index element={<Landing />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="become-a-teacher" element={<BecomeATeacher />} />

            <Route path="students" element={<Out />}>
              <Route path="" element={<StudentProfile  />} />
              <Route path="classes" element={<StudentClasses  />} />
              <Route path="profile/edit" element={<StudentEdit  />} />
              <Route path="courses" element={<StudentCourses />} />
              <Route path="history" element={<StudentHistory />} />
            </Route>

            <Route path="teachers" element={<Out/>}>
              <Route index element={<All />} />
              <Route path=":id" element={<Out />} >
              ` <Route index element={<TeacherProfile />} />
                <Route path="payment" element={<Payment />} />
              </Route>
            </Route>
            <Route path="teacher" element={<Out />}>
              <Route path="" element={<TeacherDashboard  />} /> 
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<TeacherSignup />} />
              <Route path="classes" element={<TeacherClasses  />} />
              <Route path="earnings" element={<Earnings  />} />
              <Route path="profile/edit" element={<TeacherEdit  />} />
              <Route path="courses" element={<TeacherCourses />} />
              <Route path="courses/create" element={<CreateCourse />} />
            </Route>
            <Route path="categories" element={<Out />}>
              <Route path="" element={<Categories  />} />
              <Route path=":id" element={<Out />}  >
                <Route index element={<CourseDetail />} />
                <Route path="courses/:profile" element={<CourseProfile />} />
                <Route path="courses" element={<CourseList />} />
              </Route>
            </Route>
            <Route path="admin">
              <Route path="" element={<Dashboard />} />
              <Route path="students" element={<Student />} />
              <Route path="fees" element={<Fees />} />
              <Route path="teachers" element={<Teachers />} />
              <Route path="courses" element={<Courses />} />
              <Route path="courses-categories" element={<AdminCategories />} />
              <Route path="courses-categories/new" element={<CreateCourseCategory />} />
              <Route path="teachers/approve" element={<Approve />} />
              <Route path="profile/edit" element={<AdminEdit />} />
            </Route>
            <Route path="admin" element={<Out />}>
              <Route path="login" element={<AdminLogin />} />
              <Route path="signup" element={<AdminSignup />} />
            </Route> 
        </Route>
        <Route path="*" element={<h1 className="text-center">Page Not Found</h1>} />
      </Routes>
      </SyllabusContextProvider>
    </AuthContextProvider>
  );
}

export default App;
