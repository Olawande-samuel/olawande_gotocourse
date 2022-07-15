import "bootstrap/dist/css/bootstrap.css"
import { Route, Routes } from "react-router-dom";
import './App.css';
import'@stripe/stripe-js'

import Landing from './pages/Landing';
import Out from "./pages/Out";
import Login from "./pages/User/Login";
import SignUp from "./pages/User/SignUp";
import AdminLogin from "./pages/Admin/Login"
import AdminSignup from "./pages/Admin/SignUp"
import {Dashboard, Student, Fees, Teachers, Courses, Approve, Edit as AdminEdit, Category as AdminCategories, CategoryDetails as AdminCategoryDetails, Chat as AdminChat,
  CreateCourseCategory, CreateCourse as AdminCreateCourse, CourseDetails as AdminCourseDetails, Bootcamps, CreateBootcamp, BootcampDetails, AddMentor,Mentors, MentorsDetail, Notification} from "./pages/Dashboard/Admin";
import {Profile as StudentProfile, Classes as StudentClasses, Wishlist, Edit as StudentEdit,
   Courses as StudentCourses, History as StudentHistory, Bootcamps as StudentBootcamps} from "./pages/Dashboard/Students";
import {Profile as TeacherDashboard, Classes as TeacherClasses, Edit as TeacherEdit, 
  Courses as TeacherCourses, CreateCourse, Earnings, Bootcamps as TeacherBootcamps, BootcampDetails as TeacherBootcampDetails, CourseInfo as TeacherCourseInfo,  } from "./pages/Dashboard/Teachers";
import 'react-toastify/dist/ReactToastify.css';
import AuthContextProvider from "./contexts/Auth";
import "react-multi-carousel/lib/styles.css";
import { Categories, CourseDetail, CourseList, CourseProfile } from "./pages/Courses";
import {Home as BecomeATeacher, Profile} from "./pages/Teacher";
import All, {Payment, PaymentStatus} from "./pages/Teacher/Teachers";
import TeacherProfile from "./pages/Teacher/TeacherProfile";
import TeacherSignup from "./pages/User/TeacherSignup";
import SyllabusContextProvider from "./contexts/Syllabus";
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";
import Bootcamp from "./pages/Bootcamp";
import Policies from "./pages/PrivacyPolicy";
import About from "./pages/About";
import Contact from "./pages/Contact";

 

function App() {
  return (
    <AuthContextProvider>
      <SyllabusContextProvider>
      <Routes>
        <Route path="/" element={<Out />}>
          <Route index element={<Landing />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="policies" element={<Policies />} />
            <Route path="about-us" element={<About />} />
            <Route path="contact-us" element={<Contact />} />
            <Route path="bootcamp" element={<Bootcamp />} />
            <Route path="bootcamp/payment" element={<Payment />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="change-password" element={<ResetPassword />} />
            <Route path="become-a-teacher" element={<BecomeATeacher />} />
            <Route path="payment/success" element={<PaymentStatus success={true} />} />
            <Route path="payment/error" element={<PaymentStatus />} />


            <Route path="students" element={<Out />}>
              <Route path="" element={<StudentProfile  />} />
              <Route path="classes" element={<StudentClasses  />} />
              <Route path="bootcamps" element={<StudentBootcamps  />} />
              <Route path="profile/edit" element={<StudentEdit  />} />
              <Route path="courses" element={<StudentCourses />} />
              <Route path="wishlist" element={<Wishlist />} />
              <Route path="history" element={<StudentHistory />} />
            </Route>

            <Route path="mentors" element={<Out/>}>
              <Route index element={<All type="mentors" />} />
              <Route path=":id" element={<Out />} >
              ` <Route index element={<TeacherProfile type="mentors" />} />
                {/* <Route path="payment" element={<Payment />} /> */}
              </Route>
            </Route>
            <Route path="teachers" element={<Out/>}>
              <Route index element={<All  type="teachers" />} />
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
              <Route path="bootcamps" element={<TeacherBootcamps  />} />
              <Route path="bootcamps/details/:id" element={<TeacherBootcampDetails />} />
              <Route path="earnings" element={<Earnings  />} />
              <Route path="profile/edit" element={<TeacherEdit  />} />
              <Route path="courses" element={<TeacherCourses />} />
              <Route path="courses/create" element={<CreateCourse />} />
              <Route path="courses/details/:id" element={<TeacherCourseInfo />} />
            </Route>
            <Route path="categories" element={<Out />}>
              <Route path="" element={<Categories  />} />
              <Route path=":id" element={<Out />}  >
                <Route index element={<CourseDetail />} />
                <Route path="courses" element={<CourseList />} />
                <Route path="courses/:profile" element={<Out />}>
                  <Route index element={<CourseProfile />} />
                  <Route path="payment" element={<Payment />} />
                  

                </Route>
              </Route>
            </Route>
            <Route path="admin">
              <Route path="" element={<Dashboard />} />
              <Route path="students" element={<Student />} />
              <Route path="notifications" element={<Notification />} />
              <Route path="fees" element={<Fees />} />
              <Route path="teachers" element={<Teachers />} />
              <Route path="mentors" element={<Mentors />} />
              <Route path="mentors/detail" element={<MentorsDetail />} />
              <Route path="mentors/detail/edit" element={<AddMentor edit="mentor" />} />
              <Route path="bootcamps" element={<Bootcamps />} />
              <Route path="bootcamps/details/:id" element={<BootcampDetails />} />
              <Route path="bootcamps/create" element={<CreateBootcamp />} />
              <Route path="courses" element={<Courses />} />
              <Route path="courses/details/:id" element={<AdminCourseDetails />} />
              <Route path="courses/create" element={<AdminCreateCourse />} />
              <Route path="courses-categories" element={<AdminCategories />} />
              <Route path="courses-categories/details/:id" element={<AdminCategoryDetails />} />
              <Route path="courses-categories/new" element={<CreateCourseCategory />} />
              <Route path="teachers/approve" element={<Approve />} />
              <Route path="teachers/create/mentor" element={<AddMentor />} />
              <Route path="profile/edit" element={<AdminEdit />} />
              <Route path="chat" element={<AdminChat />} />
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
