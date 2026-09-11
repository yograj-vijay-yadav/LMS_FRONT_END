import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import RequireAuth from "./Components/Auth/RequireAuth";
import LenisScroll from "./Components/LenisScroll";
import Home from "./Pages/Home";

/** Full-screen fallback shown while a lazily loaded page chunk downloads. */
function PageLoader() {
  return (
    <div
      className="flex min-h-screen w-full flex-col items-center justify-center gap-4 bg-slate-950"
      role="status"
      aria-live="polite"
    >
      <span
        className="inline-block size-8 animate-spin rounded-full border-2 border-slate-700 border-t-rose-500"
        aria-hidden="true"
      />
      <span className="sr-only">Loading page…</span>
    </div>
  );
}

// Route-level code splitting: each page loads on demand
const Aboutus = lazy(() => import("./Pages/AboutUs"));
const SignUp = lazy(() => import("./Pages/SignUp"));
const Login = lazy(() => import("./Pages/Login"));
const CourseList = lazy(() => import("./Pages/Course/CourseList"));
const Contact = lazy(() => import("./Pages/Contact"));
const Denied = lazy(() => import("./Pages/Denied"));
const CourseDescription = lazy(() => import("./Pages/Course/CourseDescription"));
const CreateCourse = lazy(() => import("./Pages/Course/CreateCourse"));
const AddLecture = lazy(() => import("./Pages/Dashboard/AddLecture"));
const AdminDashboard = lazy(() => import("./Pages/Dashboard/AdminDashboard"));
const Profile = lazy(() => import("./Pages/User/Profile"));
const EditProfile = lazy(() => import("./Pages/User/EditProfile"));
const Checkout = lazy(() => import("./Pages/Payments/Checkout"));
const CheckoutSuccess = lazy(() => import("./Pages/Payments/CheckoutSuccess"));
const CheckoutFailure = lazy(() => import("./Pages/Payments/CheckoutFailure"));
const Displaylectures = lazy(() => import("./Pages/Dashboard/Displaylectures"));
const NotFound = lazy(() => import("./Pages/NotFound"));

function App() {
  return (
    <>
      <LenisScroll />
      <Suspense fallback={<PageLoader />}>
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<Aboutus />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/courses" element={<CourseList />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/denied" element={<Denied />} />
        <Route path="/course/description" element={<CourseDescription />} />

        <Route element={<RequireAuth allowedRoles={["ADMIN"]} />}>
          <Route path="/course/create" element={<CreateCourse />} />
          <Route path="/course/addlecture" element={<AddLecture />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={["ADMIN", "USER"]} />}>
          <Route path="/user/profile" element={<Profile />} />
          <Route path="/user/editprofile" element={<EditProfile />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/checkout/success" element={<CheckoutSuccess />} />
          <Route path="/checkout/fail" element={<CheckoutFailure />} />
          <Route path="/course/displaylectures" element={<Displaylectures />} />
        </Route>

        <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
