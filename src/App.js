import "bootstrap/dist/css/bootstrap.css";
import { Outlet, Route, Routes } from "react-router-dom";

import "react-quill/dist/quill.snow.css";
import "./App.css";
import "@stripe/stripe-js";

import Out from "./pages/Out";

import {
	Student,
	Fees,
	Profile as AdminProfile,
	Teachers,
	Courses,
	Approve,
	ApproveStudent,
	Edit as AdminEdit,
	Category as AdminCategories,
	CategoryDetails as AdminCategoryDetails,
	Chat as AdminChat,
	CreateCourseCategory,
	CreateCourse as AdminCreateCourse,
	CourseDetails as AdminCourseDetails,
	Bootcamps,
	CreateBootcamp,
	BootcampDetails,
	AddMentor,
	Mentors,
	MentorsDetail,
	Notification,
	Earnings as AdminEarning,
	AdminClassConsole,
	EnrolledStudents,
} from "./pages/Dashboard/Admin";

import AdminDashboard from "./pages/Dashboard/Admin/Dashboard";

import {
	Dashboard as StudentDashboard,
	Profile as StudentProfile,
	Classes as StudentClasses,
	Wishlist,
	Edit as StudentEdit,
	Fees as StudentFees,
	Courses as StudentCourses,
	History as StudentHistory,
	Bootcamps as StudentBootcamps,
	Chat as StudentChat,
	Notification as StudentNotifications,
	MyClasses,
	StudentLive,
	WishlistCheckOut,
} from "./pages/Dashboard/Students";

import StudentHelp from "./pages/Dashboard/Students/Help";
import StudentReferral from "./pages/Dashboard/Students/Referral";
import StudentClassroom from "./pages/Dashboard/Students/Classroom";

import {
	Dashboard as TeacherDashboard,
	Profile as TeachersProfile,
	Classes as TeacherClasses,
	Edit as TeacherEdit,
	Courses as TeacherCourses,
	CreateCourse,
	Earnings,
	Bootcamps as TeacherBootcamps,
	BootcampDetails as TeacherBootcampDetails,
	CourseInfo as TeacherCourseInfo,
	Chat as TeacherChat,
	Notification as TeacherNotifications,
} from "./pages/Dashboard/Teachers";

import TeacherReferral from "./pages/Dashboard/Teachers/Referral";

import {
	Dashboard as AffiliatesDash,
	Sales,
	Income,
	Revenue,
} from "./pages/Dashboard/Affiliate";
import {
	Landing as AffiliateLanding,
	Register as AffiliateRegister,
	Login as AffiliateLogin,
	Verification as AffiliateVerification,
} from "./pages/Affiliate";
import AdminAffiliate from "./pages/Dashboard/Admin/Affiliate";
import AdminCustomizations from "./pages/Dashboard/Admin/Customizations";

import { HIW, HIWAffiliate } from "./pages/HowItWorks";
import "react-toastify/dist/ReactToastify.css";
import AuthContextProvider from "./contexts/Auth";
import "react-multi-carousel/lib/styles.css";
import {
	Categories,
	CourseDetail,
	CourseList,
	CourseProfile,
	NewCourseProfile,
} from "./pages/Courses";
import { Home as BecomeATeacher, Profile } from "./pages/Teacher";
import Career from "./pages/Career";
import All, { Payment } from "./pages/Teacher/Teachers";

import Bootcamp, {
	BootcampDetails as TrainingBootcamp,
	NewBootcampDetailsComponent,
} from "./pages/Bootcamp";
import { BootcampPayment, PaymentStatus } from "./pages/Bootcamp/Payment";
import Policies, {
	TeachingPolicy,
	TermsOfUse,
	EndUserPolicy,
	Cookies,
} from "./pages/PrivacyPolicy";

import { Category as CategoryHome, CategoryDetail } from "./pages/Category";
import { CoursesHome, CourseDetails } from "./pages/Course";

// import About from "./pages/About";
// import Contact from "./pages/Contact";
// import Settings from "./pages/Dashboard/Admin/Settings";

import { Students } from "./pages/Students";
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
import Events, { Event } from "./pages/Events";
import Business from "./Business/pages/landing/business";
import File from "./pages/Dashboard/components/classConsole/File";
import Note from "./pages/Dashboard/components/classConsole/Note";

import Content, {
	ChatComponent,
} from "./pages/Dashboard/components/classConsole/Content";

import Quiz, { Preview } from "./pages/Dashboard/components/classConsole/Quiz";
import Suite, {
	Processed,
	Pending,
} from "./pages/Dashboard/components/classConsole/Suite";
import Classroom from "./pages/Dashboard/components/classConsole/Classroom";

import {
	Intermission,
	LiveClassInfo,
} from "./pages/Dashboard/components/classConsole/Liveclass";
import Live from "./pages/Dashboard/Teachers/Live";

import {
	MentorsProfile,
	EditMentorsProfile,
	MentorsNotification,
	MentorsDashboard,
	MentorsEarnings,
	MentorsScheduler,
	MentorsChat,
	MentorsReferral,
	MentorsHelp,
} from "./pages/Dashboard/Mentors";
import { ConsoleClass } from "./pages/Dashboard/Teachers/Bootcamps";
import ConsoleClasses, {
	ConsoleMessages,
	MyClass,
} from "./pages/Dashboard/components/classConsole/ConsoleClasses";
import ConsoleAssessments from "./pages/Dashboard/components/classConsole/ConsoleAssessments";
import { CreateRoom, VideDiv } from "./utils/video";
import Detail from "./pages/Course/Details";
import AllCourses from "./pages/Courses/allcourses/AllCourses";
import { MainContainer } from "./pages/Dashboard/components/classConsole";
import Articles from "./pages/Events/articles";
import StudentChatModule, {
	ActiveChat,
	StudentGroupContent,
} from "./pages/Dashboard/components/classConsole/Chat/student";

import {
	GroupContent,
	MailDetail,
} from "./pages/Dashboard/components/classConsole/Chat";
import { ProgramPage } from "./components/NewLanding/ExecutiveClasses";
import CourseComponent from "./pages/Courses/allcourses/Course";
import UpComingComponent from "./pages/Bootcamp/Upcoming";
import { Blog, BlogDashboard, MyBlog } from "./pages/Dashboard/components/blog";
import {
	AdminWebinar,
	AdminWebinarDashboard,
	MyWebinar,
} from "./pages/Dashboard/components/webinar";
import LiveChat from "./pages/Dashboard/components/Live/quikkonnet/LiveChat";
import Playground from "./components/Playground";
import CreatePage from "./components/enterprise/Create/Index";
import ManagePage from "./components/enterprise/Manage/Index";
import EnterPriseLogin from "./components/enterprise/Register/EnterPriseLogin";
import EnterpriseSignUp from "./components/enterprise/Register/EnterpriseSignUp";
import EnterPriseForgotPassword from "./components/enterprise/Register/ForgotPassword";
import EnterpriseVerification from "./components/enterprise/Register/Verification";
import EnterpriseOnboarding from "./components/enterprise/EnterpriseOnboarding";
import Pricing from "./components/enterprise/Pricing";
import Creator from "./components/enterprise/Creator";

import ProtectedRoute from "./hoc/LiveClassProtection";
import Home from "./pages/Landing";
import AdLeads from "./pages/Dashboard/Admin/leads";
import Market from "./pages/Dashboard/Admin/leads/marketing";
import { MixpanelConsumer } from "react-mixpanel";
import RedirectPage from "./pages/Bootcamp/Redirect";

import NewHome from "./pages/Landing/landing";
import Abroad from "./components/abroad/pages";
import { EarningCourses, EarningTeacherApplication } from "./pages/Dashboard/Teachers/Earnings";
import { BootcampPaystackPayment } from "./pages/Bootcamp/PaystackPayment";
import Africa from "./components/abroad/pages/Africa";
import ConsoleAnswer from "./pages/Dashboard/Students/Classroom/Answer";
import NewTeacherLanding from "./components/teacher";
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools'


const Login = lazy(() => import("./pages/User/Login"));
const SignUp = lazy(() => import("./pages/User/SignUp"));
const AdminLogin = lazy(() => import("./pages/Admin/Login"));
const AdminSignup = lazy(() => import("./pages/Admin/SignUp"));
const Lounge = lazy(() => import("./pages/Celebrity/Lounge"));
const CelebProfile = lazy(() => import("./pages/Celebs/CelebProfile"));
const BookMentor = lazy(() => import("./pages/Celebs/Booking"));
const AllCelebs = lazy(() => import("./pages/Celebrity/AllCelebs"));
const Email = lazy(() => import("./pages/Confirmation/Email"));
const Confirm = lazy(() => import("./pages/Confirmation/Confirm"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));

const AnotherLanding = lazy(() =>
	import("./components/enterprise/AnotherLanding")
);
const Landing = lazy(() => import("./pages/Landing"));

const TeacherOnBoarding = lazy(() => import("./pages/Teacher/OnBoarding"));
const TeacherProfile = lazy(() => import("./pages/Teacher/TeacherProfile"));
const TeacherSignup = lazy(() => import("./pages/User/TeacherSignup"));

const UserOnBoarding = lazy(() => import("./pages/Students/OnBoarding"));
const Verification = lazy(() => import("./pages/User/Verification"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Settings = lazy(() => import("./pages/Dashboard/Admin/Settings"));
const LiveClass = lazy(() =>
	import("./pages/Dashboard/components/Live/LiveClass")
);

const TeachersHelp = lazy(() => import("./pages/Dashboard/Teachers/Help"));

const HIWStudent = lazy(() => import("./pages/HowItWorks/HIWStudent"));
const HIWTeacher = lazy(() => import("./pages/HowItWorks/HIWTeacher"));
const TeachersLanding = lazy(() => import("./pages/Teachers"));
const ComingSoon = lazy(() => import("./pages/Classes/Available/ComingSoon"));
//MENTORS
// const {MentorsProfile} = lazy(() => import("./pages/Dashboard/Mentors"));

console.log("window", window.location.href.includes("gotocourse"));
console.log(process.env.NODE_ENV);

const webLocation = window.location.href.includes("gotocourse");

function App() {
	return (
		<MixpanelConsumer>
			{(mixpanel) => <MyApp mixpanel={mixpanel} />}
		</MixpanelConsumer>
	);
}
function MyApp({ mixpanel }) {
	// if (
	//   !process.env.NODE_ENV ||
	//   process.env.NODE_ENV === "development" ||
	//   webLocation
	// ) {
	// if(process.env.NODE_ENV !== 'development' ){

	return (
		<AuthContextProvider>
			<SyllabusContextProvider>
				{/* <ReactQueryDevtools initialIsOpen={false} /> */}
				<Suspense fallback={<Loader />}>
					<Routes>
						<Route path="/" element={<Out />}>
							{/* <Route index element={<NewHome mixpanel={mixpanel} />} /> */}
							{/* <Route
								path="create-with-gotocourse"
								element={<AnotherLanding />}
							/>
							<Route path="create" element={<CreatePage />} />
							<Route path="manage" element={<ManagePage />} />
							<Route path="pricing" element={<Pricing />} /> */}

							{/* <Route path="school/login" element={<EnterPriseLogin />} />
							<Route path="school/signup" element={<EnterpriseSignUp />} />
							<Route
								path="enterprise-forgot"
								element={<EnterPriseForgotPassword />}
							/> */}
							{/* <Route
								path="enterprise-verify"
								element={<EnterpriseVerification />}
							/> */}
							{/* <Route
								path="enterprise-onboarding"
								element={<EnterpriseOnboarding />}
							/> */}
							{/* <Route path="creator-landing" element={<Creator />} /> */}

							{/* <Route index element={<Cart />} /> */}
							{/* <Route path="learn-on-gotocourse" element={<Out />}>
								<Route index element={<Landing />} />
								</Route> */}
							{/* <Route path="africa" element={<Out />}>
								<Route index element={<Africa />} />
								<Route path="train-to-work" element={<Abroad />} />
								<Route path="women-in-tech" element={<Abroad />} />

							</Route> */}


							<Route
								index
								element={<Landing mixpanel={mixpanel} />}
							/>
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
							{/* <Route path="become-a-teacher" element={<BecomeATeacher />} /> */}

							<Route path="gotocourse-teacher" element={<NewTeacherLanding />} />
							<Route path="become-a-teacher" element={<TeachersLanding />} />
							<Route path="student/classroom" element={<StudentClassroom />} />
							<Route path="coming-soon" element={<ComingSoon />} />
							<Route path="redirect" element={<RedirectPage />} />

							<Route path="tester" element={<NewHome />} />

							{/* NEW GENERAL LIVE CLASS COMPONENT */}
							<Route
								path="class/:classId/live/stream"
								element={
									<ProtectedRoute>
										<VideDiv />
									</ProtectedRoute>
								}
							/>

							<Route path="category" element={<Out />}>
								<Route index element={<CourseComponent />} />
								{/* <Route
                    path="upcoming"
                    element={<UpComingComponent />}
                  /> */}
								<Route path=":id" element={<CourseComponent />} />
							</Route>

							<Route path="categories" element={<Out />}>
								<Route index element={<CategoryHome />} />
								<Route path=":id" element={<Out />}>
									<Route index element={<CategoryDetail />} />
									<Route path="courses" element={<CoursesHome />} />
									<Route path="courses/:profile/:id" element={<Out />}>
										<Route index element={<NewBootcampDetailsComponent />} />
										{/* <Route path="payment" element={<ComingSoon />} /> */}
										<Route path="payment" element={<BootcampPayment />} />
										<Route path="pay" element={<BootcampPaystackPayment />} />

										{/* <Route path="payment" element={<BootcampPaystackPayment />} /> */}
										<Route
											path="payment/success"
											element={<PaymentStatus success={true} />}
										/>
										<Route path="payment/error" element={<PaymentStatus />} />
										{/* FORMERLY COURSES */}
										{/* <Route index element={<Detail />} /> */}
										{/* <Route path="payment" element={<Payment />} /> */}
									</Route>
								</Route>
							</Route>


							<Route
								path="bootcamp-training"
								element={<NewBootcampDetailsComponent />}
							/>
							<Route path="bootcamp" element={<Bootcamp />} />
							<Route path="bootcamp/payment" element={<BootcampPayment />} />
							<Route
								path="payment/success"
								element={<PaymentStatus success={true} />}
							/>
							<Route path="payment/error" element={<PaymentStatus />} />

							<Route path="career" element={<Career />} />
							<Route path="students" element={<Students />} />
							<Route path="user-authentication" element={<Verification />} />
							<Route path="user-onboarding" element={<UserOnBoarding />} />
							<Route path="qualifications" element={<CheckList />} />

							<Route path="events&articles" element={<Out />}>
								<Route index element={<Events />} />
								<Route path=":id" element={<Event />} />
								<Route path="articles/:title/:id" element={<Articles />} />
							</Route>

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

							{/* STUDENTS */}
							{/* <Route path="student" element={<ComingSoon student={true} />}> */}
							<Route path="student" element={<Out />}>
								<Route path="" element={<StudentDashboard mixpanel={mixpanel} />} />
								<Route path="profile" element={<StudentProfile />} />
								<Route path="classes" element={<StudentClasses />} />
								<Route path="bootcamps" element={<StudentBootcamps />} />
								<Route path="myclasses" element={<MyClasses />} />
								<Route path="profile/edit" element={<StudentEdit />} />
								<Route path="courses" element={<StudentCourses />} />
								<Route path="wishlist" element={<Wishlist />} />
								<Route path="wishlist-checkout" element={<WishlistCheckOut />} />
								<Route path="history" element={<StudentHistory />} />
								<Route path="payment" element={<StudentFees />} />

								<Route path="chat" element={<StudentChat />} />
								{/* <Route path="help" element={<StudentHelp />} /> */}
								<Route path="help" element={<HIWStudent />} />
								<Route path="referral" element={<StudentReferral />} />
								<Route path="notifications" element={<StudentNotifications />} />

								<Route path="live-class" element={<Out />}>
									<Route index element={<StudentLive />} />
									<Route path="live" element={<LiveClass />} />
									<Route path="connect" element={<Intermission />} />
								</Route>

								<Route path="console" element={<Content />}>
									<Route path="myclasses" element={<Out />}>
										<Route index element={<ConsoleClasses />} />
										<Route path=":id" element={<Out />}>
											<Route index element={<StudentChatModule />} />
										</Route>
										<Route path="mail" element={<Out />}>
											<Route index element={<ChatComponent />} />
											<Route path="details" element={<StudentGroupContent />} />
											<Route path="group/:groupID" element={<StudentGroupContent />} />
											{/* <Route path="chat/:userId" element={<MailDetail />} /> */}
										</Route>
										<Route path="class" element={<Out />}>
											<Route path=":classId" element={<Out />}>
												<Route path="live-class" element={<Out />}>
													<Route index element={<LiveClassInfo />} />
													<Route path="live" element={<LiveClass />} />
													<Route path="connect/:liveId" element={<Out />}>
														<Route index element={<Intermission />} />
														<Route path="stream" element={<VideDiv />} />
													</Route>
												</Route>
											</Route>
										</Route>
									</Route>
									<Route path="assessments" element={<ConsoleAssessments />} />
									<Route path="answers" element={<ConsoleAnswer />} />
									<Route path="messages" element={<ConsoleMessages />} />
								</Route>
								<Route
									path="class-console/class/:id"
									element={<StudentClassroom />}
								/>
								<Route path="myclass/:id/mail/chat" element={<LiveChat />} />
							</Route>

							{/* <Route path="console" element={<Content />}>
                  <Route path="myclasses" element={<Out />}>
                    <Route index element={<ConsoleClasses />} />
                    <Route path=":id" element={<StudentChatModule />} />
                    <Route path=":id/chat" element={<ActiveChat />} />
                  </Route>
                  <Route path="assessments" element={<ConsoleAssessments />} />
                  <Route path="liveclass" element={<Out />} />
                </Route> */}

							{/* MENTORS */}

							<Route path="mentors" element={<Out />}>
								<Route index element={<All type="mentors" />} />
								<Route path=":id" element={<Out />}>
									<Route index element={<TeacherProfile type="mentors" />} />
								</Route>
							</Route>

							{/*                   MENTORS DASHBOARD                     */}

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

							{/*                   TEACHERS PAGE                     */}

							<Route path="teachers" element={<Out />}>
								<Route index element={<All type="teachers" />} />
								<Route path=":id" element={<Out />}>
									<Route index element={<TeacherProfile />} />
								</Route>
							</Route>

							{/*                   TEACHERS DASHBOARD                     */}

							<Route path="teacher" element={<Out />}>
								<Route index element={<TeacherDashboard />} />
								<Route path="profile" element={<TeachersProfile />} />
								<Route path="login" element={<Login />} />
								<Route path="on-boarding" element={<TeacherOnBoarding />} />
								<Route path="signup" element={<TeacherSignup />} />
								<Route path="enrollments" element={<TeacherClasses />} />

								<Route path="classes" element={<TeacherBootcamps />} />
								<Route
									path="classes/details/:id"
									element={<TeacherBootcampDetails />}
								/>
								<Route path="earnings" element={<Out />}>
									<Route index element={<Earnings />} />
									<Route path="fetch" element={<EarningTeacherApplication />} />
								</Route>
								<Route path="profile/edit" element={<TeacherEdit />} />
								<Route path="courses" element={<TeacherCourses />} />
								<Route path="courses/create" element={<CreateCourse />} />
								<Route
									path="courses/details/:id"
									element={<TeacherCourseInfo />}
								/>
								<Route path="chat" element={<TeacherChat />} />
								<Route
									path="notifications"
									element={<TeacherNotifications />}
								/>
								{/* <Route path="help" element={<TeachersHelp />} /> */}
								<Route path="help" element={<HIWTeacher />} />
								<Route path="referral" element={<TeacherReferral />} />
								<Route path="live-class" element={<Out />}>
									<Route index element={<Live />} />
									<Route path="live" element={<LiveClass />} />
									<Route path="connect" element={<Intermission />} />
								</Route>

								<Route path="class-console" element={<Out />}>
									<Route index element={<ConsoleClass />} />
									<Route path="class" element={<Content />}>
										<Route path=":classId" element={<Out />}>
											<Route index element={<MainContainer />} />
											<Route path="creator-suite" element={<Suite />} />
											<Route path="classroom" element={<Classroom />} />
											<Route path="mail" element={<Out />}>
												<Route index element={<ChatComponent />} />
												<Route path="details" element={<GroupContent />} />
												<Route
													path="group/:groupID"
													element={<GroupContent />}
												/>
												<Route path="chat/:userId" element={<MailDetail />} />
											</Route>
											<Route path="live-class" element={<Out />}>
												<Route index element={<LiveClassInfo />} />
												<Route path="live" element={<LiveClass />} />
												<Route path="connect" element={<Out />}>
													<Route index element={<Intermission />} />
													<Route path="stream" element={<VideDiv />} />
												</Route>
											</Route>

											<Route path="file" element={<File />} />
											<Route path="note" element={<Note />} />
											<Route path="quiz" element={<Out />}>
												<Route index element={<Quiz />} />
												<Route path="preview" element={<Preview />} />
											</Route>
										</Route>
									</Route>
								</Route>
								<Route path="class/:id/mail/chat" element={<LiveChat />} />
							</Route>

							{/*                   AFFILIATES PAGE                     */}

							<Route path="affiliates" element={<AffiliateLanding />} />
							<Route
								path="affiliates/register"
								element={<AffiliateRegister />}
							/>
							<Route path="affiliates/login" element={<AffiliateLogin />} />
							<Route
								path="affiliates/verify"
								element={<AffiliateVerification />}
							/>

							<Route path="affiliate" element={<Out />}>
								<Route path="" element={<AffiliatesDash />} />
								<Route path="sales" element={<Sales />} />
								<Route path="income" element={<Income />} />
								<Route path="revenue" element={<Revenue />} />
								<Route path="bootcamps" element={<TeacherBootcamps />} />
								<Route
									path="bootcamps/details/:id"
									element={<TeacherBootcampDetails />}
								/>
								<Route path="earnings" element={<Earnings />} />
								<Route path="profile/edit" element={<TeacherEdit />} />
								<Route path="courses" element={<TeacherCourses />} />
								<Route path="courses/create" element={<CreateCourse />} />
								<Route
									path="courses/details/:id"
									element={<TeacherCourseInfo />}
								/>
								<Route path="chat" element={<TeacherChat />} />
							</Route>

							{/*                   ADMIN DASHBOARD                     */}

							<Route path="admin">
								<Route path="" element={<AdminDashboard />} />
								<Route path="customize" element={<AdminCustomizations />} />
								<Route path="profile" element={<AdminProfile />} />
								<Route path="students" element={<Out />}>
									<Route index element={<Student />} />
									<Route path="enrolled" element={<EnrolledStudents />} />
								</Route>
								<Route path="students/approve" element={<ApproveStudent />} />
								<Route
									path="students/enrolled/approve"
									element={<ApproveStudent />}
								/>
								<Route path="notifications" element={<Notification />} />
								<Route path="fees" element={<Fees />} />
								<Route path="teachers" element={<Teachers />} />
								<Route path="mentors" element={<Mentors />} />
								<Route path="mentors/detail" element={<MentorsDetail />} />
								<Route
									path="mentors/detail/edit"
									element={<AddMentor edit="mentor" />}
								/>
								<Route path="classes" element={<Bootcamps />} />
								<Route
									path="classes/details/:id"
									element={<BootcampDetails />}
								/>
								<Route path="classes/create" element={<CreateBootcamp />} />
								<Route path="courses" element={<Courses />} />
								<Route
									path="courses/details/:id"
									element={<AdminCourseDetails />}
								/>
								<Route path="courses/create" element={<AdminCreateCourse />} />
								<Route
									path="courses-categories"
									element={<AdminCategories />}
								/>
								<Route
									path="courses-categories/details/:id"
									element={<AdminCategoryDetails />}
								/>
								<Route
									path="courses-categories/new"
									element={<CreateCourseCategory />}
								/>

								<Route path="teachers/approve" element={<Approve />} />
								<Route path="teachers/create/mentor" element={<AddMentor />} />
								<Route path="profile/edit" element={<AdminEdit />} />
								<Route path="chat" element={<AdminChat />} />
								<Route path="settings" element={<Settings />} />
								<Route path="ad-leads" element={<AdLeads />} />
								<Route path="marketing-leads" element={<Market />} />
								<Route path="earnings" element={<Out />}>
									<Route index element={<AdminEarning />} />
									<Route path="courses" element={<EarningCourses />} />


								</Route>
								<Route path="affiliate" element={<AdminAffiliate />} />
								<Route path="blog" element={<Out />}>
									<Route index element={<BlogDashboard />} />
									<Route path=":id" element={<MyBlog />} />
									<Route path="create" element={<Blog />} />
								</Route>
								<Route path="webinar" element={<Out />}>
									<Route index element={<AdminWebinarDashboard />} />
									<Route path=":id" element={<MyWebinar />} />
									<Route path="create" element={<AdminWebinar />} />
								</Route>

								{/* <Route path="class-console" element={<Out />}>
                    <Route index element={<AdminClassConsole />} />
                    <Route path=":id" element={<Content />}>
                      <Route path="file" element={<File />} />
                      <Route path="note" element={<Note />} />
                      <Route path="quiz" element={<Out />}>
                        <Route index element={<Quiz />} />
                        <Route path="preview" element={<Preview />} />
                      </Route>
                    </Route>
                  </Route> */}

								<Route path="class-console" element={<Out />}>
									<Route index element={<AdminClassConsole />} />
									<Route path="class" element={<Content />}>
										<Route path=":classId" element={<Out />}>
											<Route index element={<MainContainer />} />
											<Route path="creator-suite" element={<Suite />} />
											<Route path="classroom" element={<Classroom />} />
											<Route path="mail" element={<Out />}>
												<Route index element={<ChatComponent />} />
												<Route path="details" element={<GroupContent />} />
												<Route
													path="group/:groupID"
													element={<GroupContent />}
												/>
												<Route path="chat/:userId" element={<MailDetail />} />
											</Route>
											<Route path="live-class" element={<Out />}>
												<Route index element={<LiveClassInfo />} />
												<Route path="live" element={<LiveClass />} />
												<Route path="connect/:liveId" element={<Out />}>
													<Route index element={<Intermission />} />
													<Route path="stream" element={<VideDiv />} />
												</Route>
											</Route>

											<Route path="file" element={<File />} />
											<Route path="note" element={<Note />} />
											<Route path="quiz" element={<Out />}>
												<Route index element={<Quiz />} />
												<Route path="preview" element={<Preview />} />
											</Route>
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
								{/* <Route path="login" element={<AdminLogin />} /> */}
								{/* <Route
                    					path="signup"
                    					element={<AdminSignup />}
                  				/> */}
							</Route>
						</Route>

						{/* FOR CREATE */}
						<Route path="/school" element={<Out />}>
							<Route index element={<Creator />} />
							<Route path="create" element={<CreatePage />} />
							<Route path="manage" element={<ManagePage />} />
							<Route path="pricing" element={<Pricing />} />
							<Route path="login" element={<EnterPriseLogin />} />
							<Route path="signup" element={<EnterpriseSignUp />} />
							<Route path="forgot" element={<EnterPriseForgotPassword />} />
							<Route path="verify" element={<EnterpriseVerification />} />
							<Route path="onboarding" element={<EnterpriseOnboarding />} />

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
								<Route
									path="mentors/detail/edit"
									element={<AddMentor edit="mentor" />}
								/>
								<Route path="classes" element={<Bootcamps />} />
								<Route
									path="classes/details/:id"
									element={<BootcampDetails />}
								/>
								<Route path="classes/create" element={<CreateBootcamp />} />
								<Route path="courses" element={<Courses />} />
								<Route
									path="courses/details/:id"
									element={<AdminCourseDetails />}
								/>
								<Route path="courses/create" element={<AdminCreateCourse />} />
								<Route
									path="courses-categories"
									element={<AdminCategories />}
								/>
								<Route
									path="courses-categories/details/:id"
									element={<AdminCategoryDetails />}
								/>
								<Route
									path="courses-categories/new"
									element={<CreateCourseCategory />}
								/>
								<Route path="teachers/approve" element={<Approve />} />
								<Route path="teachers/create/mentor" element={<AddMentor />} />
								<Route path="profile/edit" element={<AdminEdit />} />
								<Route path="chat" element={<AdminChat />} />
								<Route path="settings" element={<Settings />} />
								<Route path="earnings" element={<AdminEarning />} />
								<Route path="affiliate" element={<AdminAffiliate />} />
								<Route path="blog" element={<Out />}>
									<Route index element={<BlogDashboard />} />
									<Route path=":id" element={<MyBlog />} />
									<Route path="create" element={<Blog />} />
								</Route>
								<Route path="webinar" element={<Out />}>
									<Route index element={<AdminWebinarDashboard />} />
									<Route path=":id" element={<MyWebinar />} />
									<Route path="create" element={<AdminWebinar />} />
								</Route>
								<Route path="class-console" element={<Out />}>
									<Route index element={<AdminClassConsole />} />
									<Route path="class" element={<Content />}>
										<Route path=":classId" element={<Out />}>
											<Route index element={<MainContainer />} />
											<Route path="creator-suite" element={<Suite />} />
											<Route path="classroom" element={<Classroom />} />
											<Route path="mail" element={<Out />}>
												<Route index element={<ChatComponent />} />
												<Route path="details" element={<GroupContent />} />
												<Route
													path="group/:groupID"
													element={<GroupContent />}
												/>
												<Route path="chat/:userId" element={<MailDetail />} />
											</Route>

											<Route path="live-class" element={<Out />}>
												<Route index element={<LiveClassInfo />} />
												<Route path="live" element={<LiveClass />} />
												<Route path="connect" element={<Out />}>
													<Route index element={<Intermission />} />
													<Route path="stream" element={<VideDiv />} />
												</Route>
											</Route>

											<Route path="file" element={<File />} />
											<Route path="note" element={<Note />} />
											<Route path="quiz" element={<Out />}>
												<Route index element={<Quiz />} />
												<Route path="preview" element={<Preview />} />
											</Route>
										</Route>
									</Route>
								</Route>

								{/* <Route path="live-class" element={<Out />}>
                    <Route index element={<Live />} />
                    <Route path="live" element={<LiveClass />} />
                    <Route path="connect" element={<Intermission />} />
                  </Route> */}
							</Route>

							<Route path="teacher" element={<Out />}>
								<Route index element={<TeacherDashboard />} />
								<Route path="profile" element={<TeachersProfile />} />
								<Route path="login" element={<Login />} />
								<Route path="on-boarding" element={<TeacherOnBoarding />} />
								<Route path="signup" element={<TeacherSignup />} />
								<Route path="enrollments" element={<TeacherClasses />} />

								<Route path="classes" element={<TeacherBootcamps />} />
								<Route
									path="classes/details/:id"
									element={<TeacherBootcampDetails />}
								/>
								<Route path="earnings" element={<Earnings />} />
								<Route path="profile/edit" element={<TeacherEdit />} />
								<Route path="courses" element={<TeacherCourses />} />
								<Route path="courses/create" element={<CreateCourse />} />
								<Route
									path="courses/details/:id"
									element={<TeacherCourseInfo />}
								/>
								<Route path="chat" element={<TeacherChat />} />
								<Route
									path="notifications"
									element={<TeacherNotifications />}
								/>
								{/* <Route path="help" element={<TeachersHelp />} /> */}
								<Route path="help" element={<HIWTeacher />} />
								<Route path="referral" element={<TeacherReferral />} />
								<Route path="live-class" element={<Out />}>
									<Route index element={<Live />} />
									<Route path="live" element={<LiveClass />} />
									<Route path="connect" element={<Intermission />} />
								</Route>

								<Route path="class-console" element={<Out />}>
									<Route index element={<ConsoleClass />} />
									<Route path="class" element={<Content />}>
										<Route path=":classId" element={<Out />}>
											<Route index element={<MainContainer />} />
											<Route path="creator-suite" element={<Suite />} />
											<Route path="classroom" element={<Classroom />} />
											<Route path="mail" element={<Out />}>
												<Route index element={<ChatComponent />} />
												<Route path="details" element={<GroupContent />} />
												<Route
													path="group/:groupID"
													element={<GroupContent />}
												/>
												<Route path="chat/:userId" element={<MailDetail />} />
											</Route>

											<Route path="live-class" element={<Out />}>
												<Route index element={<LiveClassInfo />} />
												<Route path="live" element={<LiveClass />} />
												<Route path="connect" element={<Out />}>
													<Route index element={<Intermission />} />
													<Route path="stream" element={<VideDiv />} />
												</Route>
											</Route>

											<Route path="file" element={<File />} />
											<Route path="note" element={<Note />} />
											<Route path="quiz" element={<Out />}>
												<Route index element={<Quiz />} />
												<Route path="preview" element={<Preview />} />
											</Route>
										</Route>
									</Route>
								</Route>
								<Route path="class/:id/mail/chat" element={<LiveChat />} />
							</Route>
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
								{/* <Route path="help" element={<StudentHelp />} /> */}
								<Route path="help" element={<HIWStudent />} />
								<Route path="referral" element={<StudentReferral />} />
								<Route
									path="notifications"
									element={<StudentNotifications />}
								/>

								<Route path="live-class" element={<Out />}>
									<Route index element={<StudentLive />} />
									<Route path="live" element={<LiveClass />} />
									<Route path="connect" element={<Intermission />} />
								</Route>

								<Route path="console" element={<Content />}>
									<Route path="myclasses" element={<Out />}>
										<Route index element={<ConsoleClasses />} />
										<Route path=":id" element={<StudentChatModule />} />
										<Route path=":id/chat" element={<ActiveChat />} />
									</Route>
									<Route path="assessments" element={<ConsoleAssessments />} />
									<Route path="liveclass" element={<Out />} />
								</Route>
								<Route
									path="class-console/class/:id"
									element={<StudentClassroom />}
								/>
							</Route>
							<Route
								path="*"
								element={<h1 className="text-center">Page Not Found</h1>}
							/>
						</Route>
						<Route path="enterprise" element={<Business />} />
						<Route
							path="*"
							element={<h1 className="text-center">Page Not Found</h1>}
						/>
					</Routes>
				</Suspense>
			</SyllabusContextProvider>
		</AuthContextProvider>
	);
	// }
	// return (
	//   <AuthContextProvider>
	//     <SyllabusContextProvider>
	//       <Suspense fallback={<Loader />}>
	//         <Routes>
	//           <Route path="/" element={<Out />}>
	//             <Route index element={<Creator />} />
	//             <Route path="school">
	//               <Route path="admin">
	//                 <Route
	//                   path=""
	//                   element={<AdminDashboard />}
	//                 />
	//                 <Route
	//                   path="profile"
	//                   element={<AdminProfile />}
	//                 />
	//                 <Route
	//                   path="students"
	//                   element={<Student />}
	//                 />
	//                 <Route
	//                   path="students/approve"
	//                   element={<ApproveStudent />}
	//                 />
	//                 <Route
	//                   path="notifications"
	//                   element={<Notification />}
	//                 />
	//                 <Route path="fees" element={<Fees />} />
	//                 <Route
	//                   path="teachers"
	//                   element={<Teachers />}
	//                 />
	//                 <Route
	//                   path="mentors"
	//                   element={<Mentors />}
	//                 />
	//                 <Route
	//                   path="mentors/detail"
	//                   element={<MentorsDetail />}
	//                 />
	//                 <Route
	//                   path="mentors/detail/edit"
	//                   element={<AddMentor edit="mentor" />}
	//                 />
	//                 <Route
	//                   path="classes"
	//                   element={<Bootcamps />}
	//                 />
	//                 <Route
	//                   path="classes/details/:id"
	//                   element={<BootcampDetails />}
	//                 />
	//                 <Route
	//                   path="classes/create"
	//                   element={<CreateBootcamp />}
	//                 />
	//                 <Route
	//                   path="courses"
	//                   element={<Courses />}
	//                 />
	//                 <Route
	//                   path="courses/details/:id"
	//                   element={<AdminCourseDetails />}
	//                 />
	//                 <Route
	//                   path="courses/create"
	//                   element={<AdminCreateCourse />}
	//                 />
	//                 <Route
	//                   path="courses-categories"
	//                   element={<AdminCategories />}
	//                 />
	//                 <Route
	//                   path="courses-categories/details/:id"
	//                   element={<AdminCategoryDetails />}
	//                 />
	//                 <Route
	//                   path="courses-categories/new"
	//                   element={<CreateCourseCategory />}
	//                 />
	//                 <Route
	//                   path="teachers/approve"
	//                   element={<Approve />}
	//                 />
	//                 <Route
	//                   path="teachers/create/mentor"
	//                   element={<AddMentor />}
	//                 />
	//                 <Route
	//                   path="profile/edit"
	//                   element={<AdminEdit />}
	//                 />
	//                 <Route
	//                   path="chat"
	//                   element={<AdminChat />}
	//                 />
	//                 <Route
	//                   path="settings"
	//                   element={<Settings />}
	//                 />
	//                 <Route
	//                   path="earnings"
	//                   element={<AdminEarning />}
	//                 />
	//                 <Route
	//                   path="affiliate"
	//                   element={<AdminAffiliate />}
	//                 />
	//                 <Route path="blog" element={<Out />}>
	//                   <Route
	//                     index
	//                     element={<BlogDashboard />}
	//                   />
	//                   <Route
	//                     path=":id"
	//                     element={<MyBlog />}
	//                   />
	//                   <Route
	//                     path="create"
	//                     element={<Blog />}
	//                   />
	//                 </Route>
	//                 <Route path="webinar" element={<Out />}>
	//                   <Route
	//                     index
	//                     element={<AdminWebinarDashboard />}
	//                   />
	//                   <Route
	//                     path=":id"
	//                     element={<MyWebinar />}
	//                   />
	//                   <Route
	//                     path="create"
	//                     element={<AdminWebinar />}
	//                   />
	//                 </Route>
	//                 <Route
	//                   path="class-console"
	//                   element={<Out />}
	//                 >
	//                   <Route
	//                     index
	//                     element={<AdminClassConsole />}
	//                   />
	//                   <Route
	//                     path="class"
	//                     element={<Content />}
	//                   >
	//                     <Route
	//                       path=":classId"
	//                       element={<Out />}
	//                     >
	//                       <Route
	//                         index
	//                         element={<MainContainer />}
	//                       />
	//                       <Route
	//                         path="creator-suite"
	//                         element={<Suite />}
	//                       />
	//                       <Route
	//                         path="classroom"
	//                         element={<Classroom />}
	//                       />
	//                       <Route
	//                         path="mail"
	//                         element={<Out />}
	//                       >
	//                         <Route
	//                           index
	//                           element={
	//                             <ChatComponent />
	//                           }
	//                         />
	//                         <Route
	//                           path="details"
	//                           element={
	//                             <GroupContent />
	//                           }
	//                         />
	//                         <Route
	//                           path="group/:groupID"
	//                           element={
	//                             <GroupContent />
	//                           }
	//                         />
	//                         <Route
	//                           path="chat/:userId"
	//                           element={<MailDetail />}
	//                         />
	//                       </Route>
	//                       <Route
	//                         path="file"
	//                         element={<File />}
	//                       />
	//                       <Route
	//                         path="note"
	//                         element={<Note />}
	//                       />
	//                       <Route
	//                         path="quiz"
	//                         element={<Out />}
	//                       >
	//                         <Route
	//                           index
	//                           element={<Quiz />}
	//                         />
	//                         <Route
	//                           path="preview"
	//                           element={<Preview />}
	//                         />
	//                       </Route>
	//                     </Route>
	//                   </Route>
	//                 </Route>

	//                 <Route path="live-class" element={<Out />}>
	//                   <Route index element={<Live />} />
	//                   <Route
	//                     path="live"
	//                     element={<LiveClass />}
	//                   />
	//                   <Route
	//                     path="connect"
	//                     element={<Intermission />}
	//                   />
	//                 </Route>
	//               </Route>
	//               <Route path="teacher" element={<Out />}>
	//                 <Route
	//                   index
	//                   element={<TeacherDashboard />}
	//                 />
	//                 <Route
	//                   path="profile"
	//                   element={<TeachersProfile />}
	//                 />
	//                 <Route path="login" element={<Login />} />
	//                 <Route
	//                   path="on-boarding"
	//                   element={<TeacherOnBoarding />}
	//                 />
	//                 <Route
	//                   path="signup"
	//                   element={<TeacherSignup />}
	//                 />
	//                 <Route
	//                   path="enrollments"
	//                   element={<TeacherClasses />}
	//                 />

	//                 <Route
	//                   path="classes"
	//                   element={<TeacherBootcamps />}
	//                 />
	//                 <Route
	//                   path="classes/details/:id"
	//                   element={<TeacherBootcampDetails />}
	//                 />
	//                 <Route
	//                   path="earnings"
	//                   element={<Earnings />}
	//                 />
	//                 <Route
	//                   path="profile/edit"
	//                   element={<TeacherEdit />}
	//                 />
	//                 <Route
	//                   path="courses"
	//                   element={<TeacherCourses />}
	//                 />
	//                 <Route
	//                   path="courses/create"
	//                   element={<CreateCourse />}
	//                 />
	//                 <Route
	//                   path="courses/details/:id"
	//                   element={<TeacherCourseInfo />}
	//                 />
	//                 <Route
	//                   path="chat"
	//                   element={<TeacherChat />}
	//                 />
	//                 <Route
	//                   path="notifications"
	//                   element={<TeacherNotifications />}
	//                 />
	//                 {/* <Route path="help" element={<TeachersHelp />} /> */}
	//                 <Route
	//                   path="help"
	//                   element={<HIWTeacher />}
	//                 />
	//                 <Route
	//                   path="referral"
	//                   element={<TeacherReferral />}
	//                 />
	//                 <Route path="live-class" element={<Out />}>
	//                   <Route index element={<Live />} />
	//                   <Route
	//                     path="live"
	//                     element={<LiveClass />}
	//                   />
	//                   <Route
	//                     path="connect"
	//                     element={<Intermission />}
	//                   />
	//                 </Route>

	//                 <Route
	//                   path="class-console"
	//                   element={<Out />}
	//                 >
	//                   <Route
	//                     index
	//                     element={<ConsoleClass />}
	//                   />
	//                   <Route
	//                     path="class"
	//                     element={<Content />}
	//                   >
	//                     <Route
	//                       path=":classId"
	//                       element={<Out />}
	//                     >
	//                       <Route
	//                         index
	//                         element={<MainContainer />}
	//                       />
	//                       <Route
	//                         path="creator-suite"
	//                         element={<Suite />}
	//                       />
	//                       <Route
	//                         path="classroom"
	//                         element={<Classroom />}
	//                       />
	//                       <Route
	//                         path="mail"
	//                         element={<Out />}
	//                       >
	//                         <Route
	//                           index
	//                           element={
	//                             <ChatComponent />
	//                           }
	//                         />
	//                         <Route
	//                           path="details"
	//                           element={
	//                             <GroupContent />
	//                           }
	//                         />
	//                         <Route
	//                           path="group/:groupID"
	//                           element={
	//                             <GroupContent />
	//                           }
	//                         />
	//                         <Route
	//                           path="chat/:userId"
	//                           element={<MailDetail />}
	//                         />
	//                       </Route>

	//                       <Route
	//                         path="live-class"
	//                         element={<Out />}
	//                       >
	//                         <Route
	//                           index
	//                           element={
	//                             <LiveClassInfo />
	//                           }
	//                         />
	//                         <Route
	//                           path="live"
	//                           element={<LiveClass />}
	//                         />
	//                         <Route
	//                           path="connect"
	//                           element={<Out />}
	//                         >
	//                           <Route
	//                             index
	//                             element={
	//                               <Intermission />
	//                             }
	//                           />
	//                           <Route
	//                             path="stream"
	//                             element={
	//                               <VideDiv />
	//                             }
	//                           />
	//                         </Route>
	//                       </Route>

	//                       <Route
	//                         path="file"
	//                         element={<File />}
	//                       />
	//                       <Route
	//                         path="note"
	//                         element={<Note />}
	//                       />
	//                       <Route
	//                         path="quiz"
	//                         element={<Out />}
	//                       >
	//                         <Route
	//                           index
	//                           element={<Quiz />}
	//                         />
	//                         <Route
	//                           path="preview"
	//                           element={<Preview />}
	//                         />
	//                       </Route>
	//                     </Route>
	//                   </Route>
	//                 </Route>
	//                 <Route
	//                   path="class/:id/mail/chat"
	//                   element={<LiveChat />}
	//                 />
	//               </Route>
	//               <Route path="student" element={<Out />}>
	//                 <Route
	//                   path=""
	//                   element={<StudentDashboard />}
	//                 />
	//                 <Route
	//                   path="profile"
	//                   element={<StudentProfile />}
	//                 />
	//                 <Route
	//                   path="classes"
	//                   element={<StudentClasses />}
	//                 />
	//                 <Route
	//                   path="bootcamps"
	//                   element={<StudentBootcamps />}
	//                 />
	//                 <Route
	//                   path="myclasses"
	//                   element={<MyClasses />}
	//                 />
	//                 <Route
	//                   path="profile/edit"
	//                   element={<StudentEdit />}
	//                 />
	//                 <Route
	//                   path="courses"
	//                   element={<StudentCourses />}
	//                 />
	//                 <Route
	//                   path="wishlist"
	//                   element={<Wishlist />}
	//                 />
	//                 <Route
	//                   path="history"
	//                   element={<StudentHistory />}
	//                 />
	//                 <Route
	//                   path="payment"
	//                   element={<StudentFees />}
	//                 />
	//                 <Route
	//                   path="chat"
	//                   element={<StudentChat />}
	//                 />
	//                 {/* <Route path="help" element={<StudentHelp />} /> */}
	//                 <Route
	//                   path="help"
	//                   element={<HIWStudent />}
	//                 />
	//                 <Route
	//                   path="referral"
	//                   element={<StudentReferral />}
	//                 />
	//                 <Route
	//                   path="notifications"
	//                   element={<StudentNotifications />}
	//                 />

	//                 <Route path="live-class" element={<Out />}>
	//                   <Route
	//                     index
	//                     element={<StudentLive />}
	//                   />
	//                   <Route
	//                     path="live"
	//                     element={<LiveClass />}
	//                   />
	//                   <Route
	//                     path="connect"
	//                     element={<Intermission />}
	//                   />
	//                 </Route>

	//                 <Route path="console" element={<Content />}>
	//                   <Route
	//                     path="myclasses"
	//                     element={<Out />}
	//                   >
	//                     <Route
	//                       index
	//                       element={<ConsoleClasses />}
	//                     />
	//                     <Route
	//                       path=":id"
	//                       element={<StudentChatModule />}
	//                     />
	//                     <Route
	//                       path=":id/chat"
	//                       element={<ActiveChat />}
	//                     />
	//                   </Route>
	//                   <Route
	//                     path="assessments"
	//                     element={<ConsoleAssessments />}
	//                   />
	//                   <Route
	//                     path="liveclass"
	//                     element={<Out />}
	//                   />
	//                 </Route>
	//                 <Route
	//                   path="class-console/class/:id"
	//                   element={<StudentClassroom />}
	//                 />
	//               </Route>
	//             </Route>
	//             {/* <Route   element={ <p>Hello this is gotocourse create</p> } /> */}
	//           </Route>
	//         </Routes>
	//       </Suspense>
	//     </SyllabusContextProvider>
	//   </AuthContextProvider>
	// );
}

export default App;
