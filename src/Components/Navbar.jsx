import { motion } from "motion/react";
import { navlinks } from "../Constants/navlink";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Redux/Slices/AuthSlice";
import { UserCircle } from "lucide-react";

      //  <li><Link to="/">Home</Link></li>
      //       <li><Link to="/admin/dashboard">Admin Dashboard</Link></li>
      //       <li> {isLoggedIn && role === "ADMIN" && (
      //         <Link to="/course/create"> Create new course</Link>
      //       )}</li>
      //       <li><Link to="/courses">All Courses</Link></li>
      //       <li><Link to="/contact">Contact Us</Link></li>
      //       <li><Link to="/about">About Us</Link></li>

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);
  const role = useSelector((state) => state?.auth?.role);

  async function handleLogout(e) {
    e.preventDefault();
    const result = await dispatch(logout());
    if (result?.payload?.success) navigate("/");
  }

  return (
    <motion.nav
      className="fixed inset-x-0 top-0 z-50 py-4"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 250, damping: 70 }}
    >
      {/* Full-width blur background */}
      <div className="absolute inset-0 fixed backdrop-blur-lg bg-black/30 h-16 mt-2 border-b border-white/5" />

      {/* Content container */}
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="flex items-center justify-between h-12">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img
              src="/favicon.ico"
              alt="logo"
              className="h-8 w-auto"
            />
            <span className="text-xl font-bold">SimpliLearn</span>
          </Link>

          {/* Navigation */}
          <div className="flex items-center gap-10">
            {navlinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.href}
                className="hover:text-pink-500 transition"
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* Auth / CTA */}
          <div className="flex items-center gap-4">
            {!isLoggedIn ? (
              <>
                <Link to="/login" className="hover:text-pink-500">
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-6 py-2.5 bg-pink-600 hover:bg-pink-700 rounded-full"
                >
                  Signup
                </Link>
              </>
            ) : (
              <>
                <Link to="/user/profile" className="hover:text-pink-500">
         <UserCircle size={32} />

                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-pink-600 hover:bg-pink-700 rounded-full"
                >
                  Logout
                </button>
              </>
            )}
          </div>

        </div>
      </div>
    </motion.nav>
  );
}














// import { MenuIcon, XIcon } from "lucide-react";
// import { useState } from "react";
// import { motion } from "motion/react";
// import { navlinks } from "../Constants/navlink";
// import { NavLink, useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";

// export default function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);
//   const role = useSelector((state) => state?.auth?.role);

//   async function handleLogout(e) {
//     e.preventDefault();
//     const result = await dispatch(logout());
//     if (result?.payload?.success) navigate("/");
//   }
   

//   return (
//     <>
//       <motion.nav
//         className="fixed w-full py-4"
//         initial={{ y: -100, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ type: "spring", stiffness: 250, damping: 70 }}
//       >
// <div className="relative mx-auto max-w-6xl pl-3 pr-6 md:pl-4 md:pr-10 lg:pl-6 lg:pr-14 flex items-center justify-between">

//           {/* 🔹 BLUR LAYER */}
//          <div className="absolute inset-0 rounded-full backdrop-blur-lg bg-white/5" />


//           {/* CONTENT */}
//           <div className="relative  z-10 flex items-center justify-between w-full ">

//             {/* Logo + Brand grouped */}
//               <a
//     href="/"
//     className="flex items-center gap-2 -ml-6 md:-ml-10 lg:-ml-14"
//   >
//               <img
//                 src="public/favicon.ico"
//                 alt="logo"
//                 className="h-8 w-auto"
//               />
//               <span className="text-xl font-bold">SimpliLearn</span>
//             </a>

//             {/* Desktop Menu */}
//             <div className="hidden md:flex items-center gap-8">
//               {navlinks.map((link) => (
//                 <NavLink
//                   key={link.name}
//                   to={link.href}
//                   className="hover:text-pink-500 transition"
//                 >
//                   {link.name}
//                 </NavLink>
//               ))}
//             </div>

//             {/* CTA */}
//             <ul>
  
//               <li className="absolute bottom-4 w-full">
//               <div className="flex items-center justify-center gap-4 mr-6">
//                 {!isLoggedIn ? (
//                   <>
//                     <Link to="/login" className="btn btn-primary flex-1">
//                       Login
//                     </Link>
//                     <Link
//                       to="/signup"
//                       className="btn btn-secondary flex-1  hidden md:block px-6 py-2.5 bg-pink-600 hover:bg-pink-700 rounded-full"
//                     >
//                       Signup
//                     </Link>
//                   </>
//                 ) : (
//                   <>
//                     <Link to="/user/profile" className="btn btn-primary flex-1">
//                       Profile
//                     </Link>
//                     <button
//                       onClick={handleLogout}
//                       className="btn btn-secondary flex-1"
//                     >
//                       Logout
//                     </button>
//                   </>
//                 )}
//               </div>
//             </li>
//      </ul>

//             {/* Mobile Menu Button */}
//             <button onClick={() => setIsOpen(true)} className="md:hidden">
//               <MenuIcon size={26} />
//             </button>
//           </div>
//         </div>
//       </motion.nav>

//       {/* Mobile Menu */}
//       <div
//         className={`fixed inset-0 z-100 bg-black/40 backdrop-blur flex flex-col items-center justify-center text-lg gap-8 md:hidden transition-transform duration-400 ${
//           isOpen ? "translate-x-0" : "-translate-x-full"
//         }`}
//       >
//         {navlinks.map((link) => (
//           <NavLink
//             key={link.name}
//             to={link.href}
//             onClick={() => setIsOpen(false)}
//           >
//             {link.name}
//           </NavLink>
//         ))}

//         {/* Close Button */}
//         <button
//           onClick={() => setIsOpen(false)}
//           className="active:ring-3 active:ring-white aspect-square size-10 p-1 items-center justify-center bg-pink-600 hover:bg-pink-700 transition text-white rounded-md flex"
//         >
//           <XIcon />
//         </button>
//       </div>
//     </>
//   );
// }
