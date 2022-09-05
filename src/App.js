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
import {Student, Fees, Teachers, Courses, Approve, Edit as AdminEdit, Category as AdminCategories, CategoryDetails as AdminCategoryDetails, Chat as AdminChat,
  CreateCourseCategory, CreateCourse as AdminCreateCourse, CourseDetails as AdminCourseDetails, Bootcamps, CreateBootcamp, BootcampDetails, AddMentor,Mentors, MentorsDetail, Notification, Earnings as AdminEarning} from "./pages/Dashboard/Admin";
import AdminDashboard from "./pages/Dashboard/Admin/Dashboard";


import {Dashboard as StudentDashboard,Profile as StudentProfile, Classes as StudentClasses, Wishlist, Edit as StudentEdit, Fees as StudentFees,
   Courses as StudentCourses, History as StudentHistory, Bootcamps as StudentBootcamps, Chat as StudentChat, Notification as StudentNotifications} from "./pages/Dashboard/Students";
import StudentHelp from "./pages/Dashboard/Students/Help";
import StudentReferral from "./pages/Dashboard/Students/Referral";


import {Dashboard as TeacherDashboard,  Profile as TeachersProfile, Classes as TeacherClasses, Edit as TeacherEdit, 
  Courses as TeacherCourses, CreateCourse, Earnings, Bootcamps as TeacherBootcamps, BootcampDetails as TeacherBootcampDetails, CourseInfo as TeacherCourseInfo, Chat as TeacherChat , Notification as TeacherNotifications } from "./pages/Dashboard/Teachers";
import TeachersHelp from "./pages/Dashboard/Teachers/Help";
  
import {Dashboard as AffiliatesDash, Sales, Income, Revenue} from "./pages/Dashboard/Affiliate"
import {Landing as AffiliateLanding, Register as AffiliateRegister, Login as AffiliateLogin, Verification as AffiliateVerification} from "./pages/Affiliate";
import AdminAffiliate from "./pages/Dashboard/Admin/Affiliate";

import HIW, {HIWStudent, HIWTeacher, HIWAffiliate}from "./pages/HowItWorks"
import 'react-toastify/dist/ReactToastify.css';
import AuthContextProvider from "./contexts/Auth";
import "react-multi-carousel/lib/styles.css";
import { Categories, CourseDetail, CourseList, CourseProfile } from "./pages/Courses";
import {Home as BecomeATeacher, Profile} from "./pages/Teacher";
import Career from "./pages/Career";
import All, {Payment, PaymentStatus} from "./pages/Teacher/Teachers";
import TeacherOnBoarding from "./pages/Teacher/OnBoarding";
import TeacherProfile from "./pages/Teacher/TeacherProfile";
import TeacherSignup from "./pages/User/TeacherSignup";
import SyllabusContextProvider from "./contexts/Syllabus";
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";
import Bootcamp, {BootcampDetails as TrainingBootcamp} from "./pages/Bootcamp";
import Policies, {TeachingPolicy, TermsOfUse, EndUserPolicy, Cookies} from "./pages/PrivacyPolicy";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Settings from "./pages/Dashboard/Admin/Settings";

import {Students} from "./pages/Students"
import UserOnBoarding from "./pages/Students/OnBoarding";
import Verification from "./pages/User/Verification";
import {Landing as CelebLanding} from "./pages/Celebrity";
import Lounge from "./pages/Celebrity/Lounge";
import CelebProfile from "./pages/Celebs/CelebProfile";

function App() {
  return (
    <AuthContextProvider>
      <SyllabusContextProvider>
      <Routes>
        <Route path="/" element={<Out />}>
          <Route index element={<Landing />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="privacy-policy" element={<Policies />} />
            <Route path="terms-of-use" element={<TermsOfUse />} />
            <Route path="cookies" element={<Cookies />} />
            <Route path="end-user-policy" element={<EndUserPolicy />} />
            <Route path="teaching-policy" element={<TeachingPolicy />} />
            <Route path="about-us" element={<About />} />
            <Route path="contact-us" element={<Contact />} />
            <Route path="bootcamp-training" element={<TrainingBootcamp />} />
            <Route path="bootcamp" element={<Bootcamp />} />
            <Route path="bootcamp/payment" element={<Payment />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="change-password" element={<ResetPassword />} />
            <Route path="become-a-teacher" element={<BecomeATeacher />} />
            <Route path="payment/success" element={<PaymentStatus success={true} />} />
            <Route path="payment/error" element={<PaymentStatus />} />
            <Route path="career" element={<Career />} />
            <Route path="students" element={<Students  />} />
            <Route path="user-authentication" element={<Verification  />} />
            <Route path="user-onboarding" element={<UserOnBoarding />} />            
            
            <Route path="lounge" element={<Out/>}>
              <Route index element={<CelebLanding />} />
              <Route path="how-it-works" element={<HIW />} />
              <Route path="mentors" element={<Out/>}>
                <Route index element={<Lounge />} />
                <Route path=":id" element={<CelebProfile />} />
              </Route>
            </Route>

            <Route path="affiliate-how-it-works" element={<HIWAffiliate />} />
            <Route path="teachers-how-it-works" element={<HIWTeacher />} />
            <Route path="student-how-it-works" element={<HIWStudent />} />



            <Route path="student" element={<Out />}>
              <Route path="" element={<StudentDashboard  />} />
              <Route path="profile" element={<StudentProfile  />} />
              <Route path="classes" element={<StudentClasses  />} />
              <Route path="bootcamps" element={<StudentBootcamps  />} />
              <Route path="profile/edit" element={<StudentEdit  />} />
              <Route path="courses" element={<StudentCourses />} />
              <Route path="wishlist" element={<Wishlist />} />
              <Route path="history" element={<StudentHistory />} />
              <Route path="payment" element={<StudentFees />} />
              <Route path="chat" element={<StudentChat />} />
              <Route path="help" element={<StudentHelp />} />
              <Route path="referral" element={<StudentReferral />} />
              <Route path="notifications" element={<StudentNotifications />} /> 
            </Route>

            <Route path="mentors" element={<Out/>}>
              <Route index element={<All type="mentors" />} />
              <Route path=":id" element={<Out />} >
              <Route index element={<TeacherProfile type="mentors" />} />
                {/* <Route path="payment" element={<Payment />} /> */}
              </Route>
            </Route>
            
            <Route path="teachers" element={<Out/>}>
              <Route index element={<All  type="teachers" />} />
              <Route path=":id" element={<Out />} >
               <Route index element={<TeacherProfile />} />
                {/* <Route path="payment" element={<Payment />} /> */}
              </Route>
            </Route>
            <Route path="teacher" element={<Out />}>
              <Route index element={<TeacherDashboard  />} /> 
              <Route path="profile" element={<TeachersProfile  />} /> 
              <Route path="login" element={<Login />} />
              <Route path="on-boarding" element={<TeacherOnBoarding />} />
              <Route path="signup" element={<TeacherSignup />} />
              <Route path="classes" element={<TeacherClasses  />} />
              <Route path="bootcamps" element={<TeacherBootcamps  />} />
              <Route path="bootcamps/details/:id" element={<TeacherBootcampDetails />} />
              <Route path="earnings" element={<Earnings />} />
              <Route path="profile/edit" element={<TeacherEdit  />} />
              <Route path="courses" element={<TeacherCourses />} />
              <Route path="courses/create" element={<CreateCourse />} />
              <Route path="courses/details/:id" element={<TeacherCourseInfo />} />
              <Route path="chat" element={<TeacherChat />} />
              <Route path="notifications" element={<TeacherNotifications />} />
              <Route path="help" element={<TeachersHelp />} />
            </Route>
            <Route path="affiliates" element={<AffiliateLanding />} />
            <Route path="affiliates/register" element={<AffiliateRegister />} />
            <Route path="affiliates/login" element={<AffiliateLogin />} />
            <Route path="affiliates/verify" element={<AffiliateVerification />} />
            
            <Route path="affiliate" element={<Out />}>
              <Route path="" element={<AffiliatesDash  />} /> 
              <Route path="sales" element={<Sales />} />
              <Route path="income" element={<Income />} />
              <Route path="revenue" element={<Revenue  />} />
              <Route path="bootcamps" element={<TeacherBootcamps  />} />
              <Route path="bootcamps/details/:id" element={<TeacherBootcampDetails />} />
              <Route path="earnings" element={<Earnings />} />
              <Route path="profile/edit" element={<TeacherEdit  />} />
              <Route path="courses" element={<TeacherCourses />} />
              <Route path="courses/create" element={<CreateCourse />} />
              <Route path="courses/details/:id" element={<TeacherCourseInfo />} />
              <Route path="chat" element={<TeacherChat />} />
            </Route>
            <Route path="categories" element={<Out />}>
              <Route index element={<Categories  />} />
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
              <Route path="" element={<AdminDashboard />} />
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
              <Route path="settings" element={<Settings />} />
              <Route path="earnings" element={<AdminEarning />} />
              <Route path="affiliate" element={<AdminAffiliate />} />
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
