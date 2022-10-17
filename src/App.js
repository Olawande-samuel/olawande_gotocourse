import "bootstrap/dist/css/bootstrap.css"
import { Route, Routes } from "react-router-dom";
import './App.css';
import '@stripe/stripe-js'

import Landing from './pages/Landing';
import Out from "./pages/Out";


import {
  Student, Fees, Profile as AdminProfile, Teachers, Courses, Approve, ApproveStudent, Edit as AdminEdit, Category as AdminCategories, CategoryDetails as AdminCategoryDetails, Chat as AdminChat,
  CreateCourseCategory, CreateCourse as AdminCreateCourse, CourseDetails as AdminCourseDetails, Bootcamps, CreateBootcamp, BootcampDetails, AddMentor, Mentors, MentorsDetail, Notification, Earnings as AdminEarning, AdminClassConsole
} from "./pages/Dashboard/Admin";

import AdminDashboard from "./pages/Dashboard/Admin/Dashboard";


import {
  Dashboard as StudentDashboard, Profile as StudentProfile, Classes as StudentClasses, Wishlist, Edit as StudentEdit, Fees as StudentFees,
  Courses as StudentCourses, History as StudentHistory, Bootcamps as StudentBootcamps, Chat as StudentChat, Notification as StudentNotifications, MyClasses, StudentLive
} from "./pages/Dashboard/Students";

import StudentHelp from "./pages/Dashboard/Students/Help";
import StudentReferral from "./pages/Dashboard/Students/Referral";
import StudentClassroom from "./pages/Dashboard/Students/Classroom";


import {
  Dashboard as TeacherDashboard, Profile as TeachersProfile, Classes as TeacherClasses, Edit as TeacherEdit,
  Courses as TeacherCourses, CreateCourse, Earnings, Bootcamps as TeacherBootcamps, BootcampDetails as TeacherBootcampDetails, CourseInfo as TeacherCourseInfo, Chat as TeacherChat, Notification as TeacherNotifications
} from "./pages/Dashboard/Teachers";

import TeachersHelp from "./pages/Dashboard/Teachers/Help";
import TeacherReferral from "./pages/Dashboard/Teachers/Referral";

import { Dashboard as AffiliatesDash, Sales, Income, Revenue } from "./pages/Dashboard/Affiliate"
import { Landing as AffiliateLanding, Register as AffiliateRegister, Login as AffiliateLogin, Verification as AffiliateVerification } from "./pages/Affiliate";
import AdminAffiliate from "./pages/Dashboard/Admin/Affiliate";

import HIW, { HIWStudent, HIWTeacher, HIWAffiliate } from "./pages/HowItWorks"
import 'react-toastify/dist/ReactToastify.css';
import AuthContextProvider from "./contexts/Auth";
import "react-multi-carousel/lib/styles.css";
import { Categories, CourseDetail, CourseList, CourseProfile, NewCourseProfile } from "./pages/Courses";
import { Home as BecomeATeacher, Profile } from "./pages/Teacher";
import Career from "./pages/Career";
import All, { Payment } from "./pages/Teacher/Teachers";

import Bootcamp, { BootcampDetails as TrainingBootcamp, NewBootcampDetailsComponent } from "./pages/Bootcamp";
import { BootcampPayment, PaymentStatus } from "./pages/Bootcamp/Payment";
import Policies, { TeachingPolicy, TermsOfUse, EndUserPolicy, Cookies } from "./pages/PrivacyPolicy";

import { Category as CategoryHome, CategoryDetail } from "./pages/Category";
import { CoursesHome, CourseDetails } from "./pages/Course";

// import About from "./pages/About";
// import Contact from "./pages/Contact";
// import Settings from "./pages/Dashboard/Admin/Settings";

import { Students } from "./pages/Students"
// import UserOnBoarding from "./pages/Students/OnBoarding";
// import Verification from "./pages/User/Verification";
import { Landing as CelebLanding } from "./pages/Celebrity";
// import Lounge from "./pages/Celebrity/Lounge";
// import CelebProfile from "./pages/Celebs/CelebProfile";
// import AllCelebs from "./pages/Celebrity/AllCelebs";
// import Email from "./pages/Confirmation/Email";
// import Confirm from "./pages/Confirmation/Confirm";
import { AvailableClasses } from "./pages/Classes";
import SyllabusContextProvider from "./contexts/Syllabus";

// import TeacherOnBoarding from "./pages/Teacher/OnBoarding";
// import TeacherProfile from "./pages/Teacher/TeacherProfile";
// import TeacherSignup from "./pages/User/TeacherSignup";

// import ResetPassword from "./pages/ResetPassword";
// import ForgotPassword from "./pages/ForgotPassword";
// import Login from "./pages/User/Login";
// import SignUp from "./pages/User/SignUp";
// import AdminLogin from "./pages/Admin/Login"
// import AdminSignup from "./pages/Admin/SignUp"

import { Suspense, lazy } from "react";
import Loader from "./components/Loader";
import CheckList from "./pages/Teacher/checkList";
import Events from "./pages/Events";
import Business from "./Business/pages/landing/business";
import File from "./pages/Dashboard/components/classConsole/File";
import Note from "./pages/Dashboard/components/classConsole/Note";

import Content, { ChatComponent } from "./pages/Dashboard/components/classConsole/Content";

import Quiz, { Preview } from "./pages/Dashboard/components/classConsole/Quiz";
import Suite, {Processed, Pending} from "./pages/Dashboard/components/classConsole/Suite";
import Classroom from "./pages/Dashboard/components/classConsole/Classroom";

import { Intermission, LiveClassInfo } from "./pages/Dashboard/components/classConsole/Liveclass";
import Live from "./pages/Dashboard/Teachers/Live";

import { MentorsProfile, EditMentorsProfile, MentorsNotification, MentorsDashboard, MentorsEarnings, MentorsScheduler, MentorsChat, MentorsReferral, MentorsHelp } from "./pages/Dashboard/Mentors";
import { ConsoleClass } from "./pages/Dashboard/Teachers/Bootcamps";
import ConsoleClasses, { MyClass } from "./pages/Dashboard/components/classConsole/ConsoleClasses";
import ConsoleAssessments from "./pages/Dashboard/components/classConsole/ConsoleAssessments";
import { CreateRoom, VideDiv } from "./utils/video";
import Detail from "./pages/Course/Details";
import AllCourses from "./pages/Courses/allcourses/AllCourses";




const Login = lazy(() => import("./pages/User/Login"))
const SignUp = lazy(() => import("./pages/User/SignUp"))
const AdminLogin = lazy(() => import("./pages/Admin/Login"))
const AdminSignup = lazy(() => import("./pages/Admin/SignUp"))
const Lounge = lazy(() => import("./pages/Celebrity/Lounge"))
const CelebProfile = lazy(() => import("./pages/Celebs/CelebProfile"))
const BookMentor = lazy(() => import("./pages/Celebs/Booking"));
const AllCelebs = lazy(() => import("./pages/Celebrity/AllCelebs"))
const Email = lazy(() => import("./pages/Confirmation/Email"))
const Confirm = lazy(() => import("./pages/Confirmation/Confirm"))
const ResetPassword = lazy(() => import("./pages/ResetPassword"))
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"))

const TeacherOnBoarding = lazy(() => import("./pages/Teacher/OnBoarding"))
const TeacherProfile = lazy(() => import("./pages/Teacher/TeacherProfile"))
const TeacherSignup = lazy(() => import("./pages/User/TeacherSignup"))

const UserOnBoarding = lazy(() => import("./pages/Students/OnBoarding"));
const Verification = lazy(() => import("./pages/User/Verification"));
const About = lazy(() => import("./pages/About"))
const Contact = lazy(() => import("./pages/Contact"))
const Settings = lazy(() => import("./pages/Dashboard/Admin/Settings"))
const LiveClass = lazy(() => import("./pages/Dashboard/components/Live/LiveClass"))


//MENTORS
// const {MentorsProfile} = lazy(() => import("./pages/Dashboard/Mentors"));









function App() {
  return (
    <AuthContextProvider>
      <SyllabusContextProvider>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Out />}>
              <Route index element={<Landing />} />
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<SignUp />} />
              <Route path="email" element={<Email />} />
              <Route path="confirm" element={<Confirm />} />
              <Route path="privacy-policy" element={<Policies />} />
              <Route path="terms-of-use" element={<TermsOfUse />} />
              <Route path="cookies" element={<Cookies />} />
              <Route path="end-user-policy" element={<EndUserPolicy />} />
              <Route path="teaching-policy" element={<TeachingPolicy />} />
              <Route path="about-us" element={<About />} />
              <Route path="contact-us" element={<Contact />} />
              <Route path="courses" element={<AllCourses />} />
              <Route path="forgot-password" element={<ForgotPassword />} />
              <Route path="change-password" element={<ResetPassword />} />
              <Route path="become-a-teacher" element={<BecomeATeacher />} />
              <Route path="student/classroom" element={<StudentClassroom />} />

              <Route path="tester" element={<CreateRoom />} />
              <Route path="video-chat" element={<VideDiv />} />

              <Route path="categories" element={<Out />}>
                <Route index element={<CategoryHome />} />
                <Route path=":id" element={<Out />}  >
                  <Route index element={<CategoryDetail />} />
                  <Route path="courses" element={<CoursesHome />} />
                  <Route path="courses/:profile" element={<Out />}>
                    <Route index element={<Detail />} />
                    <Route path="payment" element={<Payment />} />
                  </Route>
                </Route>
              </Route>

              <Route path="bootcamp-training" element={<NewBootcampDetailsComponent />} />
              <Route path="bootcamp" element={<Bootcamp />} />
              <Route path="bootcamp/payment" element={<BootcampPayment />} />
              <Route path="payment/success" element={<PaymentStatus success={true} />} />
              <Route path="payment/error" element={<PaymentStatus />} />

              <Route path="career" element={<Career />} />
              <Route path="students" element={<Students />} />
              <Route path="user-authentication" element={<Verification />} />
              <Route path="user-onboarding" element={<UserOnBoarding />} />
              <Route path="qualifications" element={<CheckList />} />
              <Route path="events" element={<Events />} />

              <Route path="classes" element={<Out />}>
                <Route index element={<AvailableClasses />} />
                <Route path="class" element={<NewBootcampDetailsComponent />} />
                <Route path="class/payment" element={<BootcampPayment />} />
              </Route>

              <Route path="lounge" element={<Out />}>
                <Route index element={<CelebLanding />} />
                <Route path="how-it-works" element={<HIW />} />
                <Route path="mentors" element={<Out />}>
                  <Route index element={<Lounge />} />
                  <Route path="all" element={<Out />}>
                    <Route index element={<AllCelebs />} />
                    <Route path=":id" element={<CelebProfile />} />
                    <Route path=":id/booking" element={<BookMentor />} />
                  </Route>
                </Route>
              </Route>

              <Route path="affiliate-how-it-works" element={<HIWAffiliate />} />
              <Route path="teachers-how-it-works" element={<HIWTeacher />} />
              <Route path="student-how-it-works" element={<HIWStudent />} />

              <Route path="student" element={<Out />}>
                <Route path="" element={<StudentDashboard />} />
                <Route path="profile" element={<StudentProfile />} />
                <Route path="classes" element={<StudentClasses />} />
                <Route path="bootcamps" element={<StudentBootcamps />} />
                <Route path="myclasses" element={<MyClasses />} />
                <Route path="profile/edit" element={<StudentEdit />} />
                <Route path="courses" element={<StudentCourses />} />
                <Route path="wishlist" element={<Wishlist />} />
                <Route path="history" element={<StudentHistory />} />
                <Route path="payment" element={<StudentFees />} />
                <Route path="chat" element={<StudentChat />} />
                <Route path="help" element={<StudentHelp />} />
                <Route path="referral" element={<StudentReferral />} />
                <Route path="notifications" element={<StudentNotifications />} />

                <Route path="live-class" element={<Out />}>
                  <Route index element={<StudentLive />} />
                  <Route path="live" element={<LiveClass />} />
                  <Route path="connect" element={<Intermission />} />
                </Route>
              </Route>
              <Route path="test" element={<Content />}>
                <Route path="file" element={<File />} />
                <Route path="note" element={<Note />} />
                <Route path="classroom" element={<Classroom />} />
                <Route path='chat' element={<ChatComponent />} />
                <Route path="suite" element={<Suite />} />
                
                <Route path="quiz" element={<Out />}>
                  <Route index element={<Quiz />} />
                  <Route path="preview" element={<Preview />} />
                </Route>
              </Route>

              <Route path="console" element={<Content />}>
                <Route path="myclasses" element={<Out />} >
                  <Route index element={<ConsoleClasses />} />
                  <Route path=":id" element={<MyClass />} />
                </Route>
                <Route path="assessments" element={<ConsoleAssessments />} />
                <Route path="liveclass" element={<Out />} />
              </Route>


              <Route path="mentors" element={<Out />}>
                <Route index element={<All type="mentors" />} />
                <Route path=":id" element={<Out />} >
                  <Route index element={<TeacherProfile type="mentors" />} />
                </Route>
              </Route>

              <Route path="mentor" element={<Out />}>
                <Route index element={<MentorsDashboard />} />
                <Route path="profile" element={<MentorsProfile />} />
                <Route path="profile/edit" element={<EditMentorsProfile />} />
                <Route path="notifications" element={<MentorsNotification />} />
                <Route path="earnings" element={<MentorsEarnings />} />
                <Route path="scheduler" element={<MentorsScheduler />} />
                <Route path="chat" element={<MentorsChat />} />
                <Route path="referral" element={<MentorsReferral />} />
                <Route path="help" element={<MentorsHelp />} />
              </Route>

              <Route path="teachers" element={<Out />}>
                <Route index element={<All type="teachers" />} />
                <Route path=":id" element={<Out />} >
                  <Route index element={<TeacherProfile />} />
                </Route>
              </Route>

              <Route path="teacher" element={<Out />}>
                <Route index element={<TeacherDashboard />} />
                <Route path="profile" element={<TeachersProfile />} />
                <Route path="login" element={<Login />} />
                <Route path="on-boarding" element={<TeacherOnBoarding />} />
                <Route path="signup" element={<TeacherSignup />} />
                <Route path="enrollments" element={<TeacherClasses />} />

                <Route path="classes" element={<TeacherBootcamps />} />
                <Route path="classes/details/:id" element={<TeacherBootcampDetails />} />
                <Route path="earnings" element={<Earnings />} />
                <Route path="profile/edit" element={<TeacherEdit />} />
                <Route path="courses" element={<TeacherCourses />} />
                <Route path="courses/create" element={<CreateCourse />} />
                <Route path="courses/details/:id" element={<TeacherCourseInfo />} />
                <Route path="chat" element={<TeacherChat />} />
                <Route path="notifications" element={<TeacherNotifications />} />
                <Route path="help" element={<TeachersHelp />} />
                <Route path="referral" element={<TeacherReferral />} />
                <Route path="live-class" element={<Out />}>
                  <Route index element={<Live />} />
                  <Route path="live" element={<LiveClass />} />
                  <Route path="connect" element={<Intermission />} />
                </Route>
                <Route path="class-console" element={<Out />}>
                  <Route index element={<ConsoleClass />} />
                  <Route path="class" element={<Content />}>
                    <Route index element={<File />}  />

                    <Route path="creator-suite" element={<Suite />}>
                      <Route index element={<Processed />} />
                      <Route path="processed" element={<Processed />} />
                      <Route path="pending" element={<Pending />} />
                    </Route>                    
                    <Route path="classroom" element={<Classroom />} />

                    <Route path="mail" element={<ChatComponent />} />
                    <Route path="file" element={<File />} />
                    <Route path="note" element={<Note />} />
                    <Route path="quiz" element={<Out />}>
                      <Route index element={<Quiz />} />
                      <Route path="preview" element={<Preview />} />
                    </Route>
                  </Route>
                </Route>
              </Route>
              <Route path="affiliates" element={<AffiliateLanding />} />
              <Route path="affiliates/register" element={<AffiliateRegister />} />
              <Route path="affiliates/login" element={<AffiliateLogin />} />
              <Route path="affiliates/verify" element={<AffiliateVerification />} />

              <Route path="affiliate" element={<Out />}>
                <Route path="" element={<AffiliatesDash />} />
                <Route path="sales" element={<Sales />} />
                <Route path="income" element={<Income />} />
                <Route path="revenue" element={<Revenue />} />
                <Route path="bootcamps" element={<TeacherBootcamps />} />
                <Route path="bootcamps/details/:id" element={<TeacherBootcampDetails />} />
                <Route path="earnings" element={<Earnings />} />
                <Route path="profile/edit" element={<TeacherEdit />} />
                <Route path="courses" element={<TeacherCourses />} />
                <Route path="courses/create" element={<CreateCourse />} />
                <Route path="courses/details/:id" element={<TeacherCourseInfo />} />
                <Route path="chat" element={<TeacherChat />} />
              </Route>



             

              <Route path="admin">
                <Route path="" element={<AdminDashboard />} />
                <Route path="profile" element={<AdminProfile />} />
                <Route path="students" element={<Student />} />
                <Route path="students/approve" element={<ApproveStudent />} />
                <Route path="notifications" element={<Notification />} />
                <Route path="fees" element={<Fees />} />
                <Route path="teachers" element={<Teachers />} />
                <Route path="mentors" element={<Mentors />} />
                <Route path="mentors/detail" element={<MentorsDetail />} />
                <Route path="mentors/detail/edit" element={<AddMentor edit="mentor" />} />
                <Route path="classes" element={<Bootcamps />} />
                <Route path="classes/details/:id" element={<BootcampDetails />} />
                <Route path="classes/create" element={<CreateBootcamp />} />
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
                {/* <Route path="class-console" element={<Out />}>
                  <Route index element={<AdminClassConsole />} />
                  <Route path=":id" element={<Content />}>
                    <Route path="file" element={<FileComponent />} />
                    <Route path="note" element={<NoteComponent />} />
                    <Route path="quiz" element={<Out />}>
                      <Route index element={<QuizComponent />} />
                      <Route path="preview" element={<Preview />} />
                    </Route>
                  </Route>
                </Route> */}

                <Route path="class-console" element={<Out />}>
                  <Route index element={<AdminClassConsole />} />
                  <Route path=":id" element={<Content />}>
                    <Route path="file" element={<File />} />
                    <Route path="note" element={<Note />} />
                    <Route path="quiz" element={<Out />}>
                      <Route index element={<Quiz />} />
                      <Route path="preview" element={<Preview />} />
                    </Route>
                  </Route>
                </Route>
                <Route path="live-class" element={<Out />}>
                  <Route index element={<Live />} />
                  <Route path="live" element={<LiveClass />} />
                  <Route path="connect" element={<Intermission />} />
                </Route>
              </Route>
              <Route path="admin" element={<Out />}>
                <Route path="login" element={<AdminLogin />} />
                <Route path="signup" element={<AdminSignup />} />
              </Route>
              

            </Route>
            <Route path="enterprise" element={<Business />} />
            <Route path="*" element={<h1 className="text-center">Page Not Found</h1>} />
          </Routes>
        </Suspense>
      </SyllabusContextProvider>
    </AuthContextProvider>
  );
}



export default App;
